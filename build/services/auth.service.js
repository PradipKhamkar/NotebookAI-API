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
const axios_1 = __importDefault(require("axios"));
const user_model_1 = require("../models/user.model");
const jwt_helper_1 = require("../helper/jwt.helper");
const googleLogin = (authCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('AuthCode::', authCode)
        const { ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config_1.default.GOOGLE;
        const headers = { "Content-Type": "application/x-www-form-urlencoded" };
        const response = yield axios_1.default.post(ENDPOINT.TOKEN, new URLSearchParams({
            code: authCode,
            client_id: CLIENT_ID || "",
            client_secret: CLIENT_SECRET || "",
            redirect_uri: REDIRECT_URI || "",
            grant_type: 'authorization_code',
        }), { headers: headers });
        const { access_token } = response.data;
        if (!access_token)
            throw new Error('Access token is missing');
        const userInfo = yield axios_1.default.get(ENDPOINT.USERINFO.replace('{{access_token}}', access_token));
        const { name, email, picture } = userInfo.data;
        if (!email)
            throw new Error('Email is missing');
        let user = null;
        user = yield user_model_1.UserModel.findOne({ email });
        if (!user)
            user = yield user_model_1.UserModel.create({ loginProvider: "google", email, name, freeNoteQuota: config_1.default.FREE_NOTE_QUOTA });
        const accessToken = (0, jwt_helper_1.generateAccessToken)({ userId: user._id });
        const refreshToken = (0, jwt_helper_1.generateRefreshToken)({ userId: user._id });
        return {
            accessToken,
            refreshToken,
            user: {
                name,
                email,
                freeQuotaExceed: user.freeQuotaExceed
            }
        };
    }
    catch (error) {
        console.log('Error Inside Google Login::', error);
        throw error;
    }
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = (0, jwt_helper_1.verifyRefreshAndAccessToken)(refreshToken, "REFRESH");
        if (!decodedToken)
            throw new Error("Invalid Token!");
        const isUserExit = yield user_model_1.UserModel.findOne({ _id: decodedToken.userId });
        if (!isUserExit)
            throw new Error("User not found!");
        const newAccessToken = (0, jwt_helper_1.generateAccessToken)({ userId: decodedToken.userId });
        // console.log('newAccessToken', newAccessToken)
        return {
            accessToken: newAccessToken
        };
    }
    catch (error) {
        throw error;
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield user_model_1.UserModel.findOne({ _id: userId });
        if (!userInfo)
            throw new Error('User Not Found!');
        return {
            user: {
                name: userInfo.name,
                email: userInfo.email,
                freeQuotaExceed: userInfo.freeQuotaExceed
            }
        };
    }
    catch (error) {
        throw error;
    }
});
const deleteAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.UserModel.findByIdAndDelete(userId);
        return {
            messages: "user deleted successfully!"
        };
    }
    catch (error) {
        throw error;
    }
});
exports.default = { googleLogin, getNewAccessToken, getUserById, deleteAccount };
