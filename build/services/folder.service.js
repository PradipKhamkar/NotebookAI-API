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
const folder_model_1 = __importDefault(require("../models/folder.model"));
const create = (userId, name, icon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFolder = yield folder_model_1.default.create({ name, icon, createdBy: userId });
        return {
            name: newFolder.name,
            icon: newFolder.icon,
            _id: newFolder._id,
            createdAt: newFolder.createdBy,
            updatedAt: newFolder.updatedAt
        };
    }
    catch (error) {
        console.log('Error In Create Folder::', error);
        throw error;
    }
});
const remove = (folderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isFolder = yield folder_model_1.default.findOneAndDelete({ _id: folderId, createdBy: userId });
        return;
    }
    catch (error) {
        throw error;
    }
});
const update = (folderId, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        delete payload["_id"];
        const updatedFolder = yield folder_model_1.default.findOneAndUpdate({ _id: folderId, createdBy: userId }, payload, { returnDocument: "after" });
        if (!updatedFolder)
            throw new Error('Folder Not Found!');
        return updatedFolder;
    }
    catch (error) {
        throw error;
    }
});
const updateSequence = (folders, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bulkOps = folders.map(f => ({
            updateOne: {
                filter: { _id: f._id, createdBy: userId },
                update: { $set: { order: f.order } },
            },
        }));
        yield folder_model_1.default.bulkWrite(bulkOps);
        return { message: "sequences update successfully!" };
    }
    catch (error) {
        throw error;
    }
});
exports.default = { create, remove, update, updateSequence };
