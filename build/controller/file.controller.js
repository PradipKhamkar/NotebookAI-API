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
const file_service_1 = __importDefault(require("../services/file.service"));
const uploadFile = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // @ts-ignore
        const userId = request.userId;
        const file = (_a = request === null || request === void 0 ? void 0 : request.files) === null || _a === void 0 ? void 0 : _a.file;
        if (!file)
            throw new Error('File Not Found For Upload!');
        const newFile = yield file_service_1.default.uploadFile(file, userId);
        (0, response_helper_1.successResponse)(res, "File Uploaded Successfully!", newFile, 200);
    }
    catch (error) {
        console.log('Error In Upload File', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Upload Files");
    }
});
exports.default = { uploadFile };
