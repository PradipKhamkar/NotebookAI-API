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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const response_helper_1 = require("../helper/response.helper");
const responseCode_constant_1 = __importDefault(require("../constants/responseCode.constant"));
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield auth_service_1.default.googleLogin(req.body.authCode);
        (0, response_helper_1.successResponse)(res, "Login Successfully", results, responseCode_constant_1.default.OK);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
const getNewAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newToken = yield auth_service_1.default.getNewAccessToken(req.body.token);
        (0, response_helper_1.successResponse)(res, "success", newToken, responseCode_constant_1.default.OK);
    }
    catch (error) {
        console.log('Error::', error);
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.messages);
    }
});
const getLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newToken = yield auth_service_1.default.getUserById(req.userId);
        (0, response_helper_1.successResponse)(res, "success", newToken, responseCode_constant_1.default.OK);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.messages);
    }
});
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.default.deleteAccount(req.userId);
        (0, response_helper_1.successResponse)(res, "success", result, responseCode_constant_1.default.OK);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.messages);
    }
});
exports.default = { googleAuth, getNewAccessToken, getLoggedUser, deleteAccount };
