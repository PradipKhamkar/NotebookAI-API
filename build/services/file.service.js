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
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const { CLOUD_NAME, API_KEY, API_SECRET, FOLDER_NAME } = config_1.default.CLOUDINARY;
const gemini_helper_1 = __importDefault(require("../helper/gemini.helper"));
const note_helper_1 = __importDefault(require("../helper/note.helper"));
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});
const uploadFileOnCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resourceType = file.mimetype.includes("video") || file.mimetype.includes("audio") ? "video" : "auto";
        const result = yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ folder: FOLDER_NAME, resource_type: resourceType }, (error, result) => {
                if (error)
                    reject(error);
                // @ts-ignore
                resolve(result);
            })
                .end(file.data);
        });
        return {
            uploadId: result.public_id,
            url: result.secure_url,
            type: file.mimetype,
            name: file.name,
        };
    }
    catch (error) {
        console.log("error::", error);
        throw error;
    }
});
const uploadFile = (file, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield note_helper_1.default.checkUserQuota(userId);
        // const cloudinaryResponse = await uploadFileOnCloudinary(file);
        // const { type, url, uploadId } = cloudinaryResponse;
        // console.log('file::',file.data)
        const geminiFileResponse = yield gemini_helper_1.default.uploadFile(file, file.mimetype);
        // await FileModel.create({
        //   createdBy: userId,
        //   // path: url,
        //   // uploadId: uploadId,
        //   size: file.size,
        //   name: file.name,
        //   type: file.mimetype,
        // });
        return {
            tempFileId: geminiFileResponse.fileName,
            tempPath: geminiFileResponse.uri,
            // originalPath:cloudinaryResponse.url,
            // uploadId:cloudinaryResponse.uploadId
        };
    }
    catch (error) {
        console.log('Error In File Uploading::', JSON.stringify(error));
        throw error;
    }
});
exports.default = { uploadFile };
