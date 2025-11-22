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
const folder_service_1 = __importDefault(require("../services/folder.service"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // @ts-ignore
        const results = yield folder_service_1.default.create(req.userId, req.body.name, (_a = req.body) === null || _a === void 0 ? void 0 : _a.icon);
        (0, response_helper_1.successResponse)(res, "folder created successfully", results, 201);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || 'failed to create folder!');
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const results = yield folder_service_1.default.remove(req.params.id, req.userId);
        (0, response_helper_1.successResponse)(res, "folder deleted successfully", results, 200);
    }
    catch (error) {
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || 'failed to deleted folder!');
    }
});
const update = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('update folder payload::', request.body);
        // @ts-ignore
        const userId = request.userId;
        const folder = yield folder_service_1.default.update(request.body.folderId, request.body.data, userId);
        (0, response_helper_1.successResponse)(res, "Folder Updated Successfully!", folder, 200);
    }
    catch (error) {
        console.log('Error In Update Folder', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Folder");
    }
});
const updateSequences = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('updateSequences payload::', request.body);
        // @ts-ignore
        const userId = request.userId;
        const folder = yield folder_service_1.default.updateSequence(request.body.data, userId);
        (0, response_helper_1.successResponse)(res, "Folder Sequences Updated Successfully!", folder, 200);
    }
    catch (error) {
        console.log('Error In Update Folder Sequences', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Update Folder Sequences");
    }
});
exports.default = { create, remove, update, updateSequences };
