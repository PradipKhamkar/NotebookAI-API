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
const material_service_1 = __importDefault(require("../services/material.service"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        const { noteId, type, userInstruction } = req.body || {};
        console.log("userInstruction", userInstruction);
        const results = yield material_service_1.default.add(noteId, userId, type, userInstruction);
        (0, response_helper_1.successResponse)(res, "created successfully!", results);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        const results = yield material_service_1.default.get(req.params._id, userId);
        (0, response_helper_1.successResponse)(res, "fetched successfully!", results);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        const results = yield material_service_1.default.remove(req.params._id, userId);
        (0, response_helper_1.successResponse)(res, "deleted successfully!", results);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.default = { add, get, remove };
