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
const response_helper_1 = require("../helper/response.helper");
const purchase_service_1 = __importDefault(require("../services/purchase.service"));
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        // console.log('PAYLOAD DATA FOR CREATE PURCHASE::',req.body)
        const purchaseRes = yield purchase_service_1.default.createPurchase(userId, req.body.purchaseToken, req.body.orderId, req.body.productId, req.body.planType);
        (0, response_helper_1.successResponse)(res, 'purchase created successfully!', purchaseRes);
    }
    catch (error) {
        console.log('Failed Purchase', error);
        (0, response_helper_1.errorResponse)(res);
    }
});
const verifyPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        // console.log('PAYLOAD DATA FOR VERIFY PURCHASE::',req.body)
        const purchaseRes = yield purchase_service_1.default.verifyPurchase(userId);
        (0, response_helper_1.successResponse)(res, 'purchase verified successfully!', purchaseRes);
    }
    catch (error) {
        console.log('Failed Verify Purchase', error);
        (0, response_helper_1.errorResponse)(res);
    }
});
exports.default = { createPurchase, verifyPurchase };
