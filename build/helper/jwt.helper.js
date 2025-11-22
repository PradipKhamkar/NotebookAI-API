"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshAndAccessToken = exports.generateAccessToken = exports.generateRefreshToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.TOKENS.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.TOKENS.ACCESS_TOKEN_SECRET);
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.generateAccessToken = generateAccessToken;
const verifyRefreshAndAccessToken = (token, tokenType) => {
    try {
        const key = tokenType === "ACCESS" ? config_1.default.TOKENS.ACCESS_TOKEN_SECRET : config_1.default.TOKENS.REFRESH_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, key);
        return decoded;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyRefreshAndAccessToken = verifyRefreshAndAccessToken;
