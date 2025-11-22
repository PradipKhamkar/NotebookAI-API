"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const googleapis_1 = require("googleapis");
const purchase_model_1 = __importDefault(require("../models/purchase.model"));
const androidpublisher = googleapis_1.google.androidpublisher("v3");
const packageName = "com.pradip.notebookai";
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: JSON.parse(config_1.default.GOOGLE.SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/androidpublisher"],
});
const verifyPurchaseWithGoogle = (subscriptionId, purchaseToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield auth.getClient();
        const result = yield androidpublisher.purchases.subscriptions.get({
            auth: auth,
            packageName: packageName,
            subscriptionId: subscriptionId,
            token: purchaseToken,
        });
        return result.data;
    }
    catch (error) {
        console.log("Error Inside Verify Purchase", error);
        throw error;
    }
});
const createPurchase = (userId, purchaseToken, orderId, productId, planType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifiedInfo = yield verifyPurchaseWithGoogle(productId, purchaseToken);
        if (!verifiedInfo || !verifiedInfo.expiryTimeMillis)
            throw new Error("failed to verify purchase!");
        const { autoRenewing, expiryTimeMillis, startTimeMillis, priceAmountMicros, priceCurrencyCode, } = verifiedInfo;
        if (parseInt(expiryTimeMillis) <= Date.now())
            throw new Error('Purchase Token Expired!');
        const userPurchase = yield purchase_model_1.default.findOne({ createdBy: userId, status: "active" });
        if (userPurchase) {
            userPurchase.status = "expired";
            yield userPurchase.save();
        }
        const newPurchase = yield purchase_model_1.default.create({
            orderId,
            packageName,
            purchaseToken,
            productId,
            planType,
            autoRenewing,
            expiryDate: expiryTimeMillis,
            startDate: startTimeMillis,
            price: {
                amount: parseInt(priceAmountMicros) / 1000000,
                currency: priceCurrencyCode,
            },
            createdBy: userId,
            status: "active",
        });
        return newPurchase;
    }
    catch (error) {
        console.log("Error Create In Purchase::", JSON.stringify(error));
        throw error;
    }
});
const verifyPurchase = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastPurchase = yield purchase_model_1.default.findOne({ createdBy: userId }).sort({ createdAt: -1 }).select('-packageName');
        if (!lastPurchase)
            return null;
        // verify with google
        const isValidToken = yield verifyPurchaseWithGoogle(lastPurchase.productId, lastPurchase.purchaseToken);
        if (!isValidToken || !isValidToken.expiryTimeMillis)
            throw new Error("failed to verify purchase!");
        if (parseInt(isValidToken.expiryTimeMillis) <= Date.now())
            lastPurchase.status = "expired";
        else {
            lastPurchase.expiryDate = isValidToken.expiryTimeMillis;
            lastPurchase.status = "active";
        }
        yield lastPurchase.save();
        return lastPurchase;
    }
    catch (error) {
        console.log('Error In Verify Purchase', JSON.stringify(error));
        throw error;
    }
});
exports.default = { verifyPurchase, createPurchase };
