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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_helper_1 = require("../helper/jwt.helper");
const user_model_1 = require("../models/user.model");
const AuthenticateSocket = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = socket.handshake.auth.accessToken;
        console.log('accessToken', accessToken);
        const decodedToken = (0, jwt_helper_1.verifyRefreshAndAccessToken)(accessToken, "ACCESS");
        if (!decodedToken)
            throw new Error("Invalid Token");
        // @ts-ignore
        const userInfo = yield user_model_1.UserModel.findById(decodedToken.userId);
        if (!userInfo)
            throw new Error("User Not Found");
        // @ts-ignore
        socket.user = userInfo;
        next();
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "jwt expired")
            return next(new Error("unauthorized"));
        return next(new Error((error === null || error === void 0 ? void 0 : error.message) || "Authentication Failed!"));
    }
});
exports.default = AuthenticateSocket;
