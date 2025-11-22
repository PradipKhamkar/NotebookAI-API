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
const note_model_1 = require("../models/note.model");
const user_model_1 = require("../models/user.model");
const purchase_service_1 = __importDefault(require("../services/purchase.service"));
const checkUserQuota = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield user_model_1.UserModel.findById(userId).select("freeQuotaExceed");
        if (!userInfo)
            throw new Error("user not found");
        if (userInfo.freeQuotaExceed) {
            const purchase = yield purchase_service_1.default.verifyPurchase(userId);
            if ((purchase === null || purchase === void 0 ? void 0 : purchase.status) !== "active")
                throw new Error("subscription_need");
        }
        else {
            const noteCount = yield note_model_1.NoteModel.countDocuments({ createdBy: userId });
            if (noteCount >= config_1.default.FREE_NOTE_QUOTA) {
                userInfo.freeQuotaExceed = true;
                yield userInfo.save();
                throw new Error("free_quota_exceed");
            }
        }
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.default = { checkUserQuota };
