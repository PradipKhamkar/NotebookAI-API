"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message = "success", results, statusCode = 200) => {
    res.status(statusCode)
        .json({
        success: true,
        message,
        results,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = "failed", results, statusCode = 400) => {
    res.status(statusCode)
        .json({
        success: false,
        message,
        results,
    });
};
exports.errorResponse = errorResponse;
