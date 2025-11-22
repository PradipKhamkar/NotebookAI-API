"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_helper_1 = require("../helper/jwt.helper");
const response_helper_1 = require("../helper/response.helper");
const Authenticate = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer")[1].trim();
        if (!token)
            throw new Error("Token Not Found");
        const decoded = (0, jwt_helper_1.verifyRefreshAndAccessToken)(token, "ACCESS");
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log("Error::", error);
        if ((error === null || error === void 0 ? void 0 : error.message) === "jwt expired")
            (0, response_helper_1.errorResponse)(res, "Unauthorized", {}, 401);
        else
            (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.default = Authenticate;
