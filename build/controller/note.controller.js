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
const note_service_1 = __importDefault(require("../services/note.service"));
const response_helper_1 = require("../helper/response.helper");
const getAllNotes = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = request.userId;
        const notes = yield note_service_1.default.getAllNotes(userId);
        (0, response_helper_1.successResponse)(res, "Notes Fetched Successfully!", notes, 200);
    }
    catch (error) {
        console.log('Error In Fetched Notes', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Fetched All Notes");
    }
});
const updateNote = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = request.userId;
        const note = yield note_service_1.default.updateNote(request.body.noteId, request.body.data, userId);
        (0, response_helper_1.successResponse)(res, "Note Updated Successfully!", note, 200);
    }
    catch (error) {
        console.log('Error In Update Note', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Update Note");
    }
});
const deleteNote = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = request.userId;
        console.log('Request Body', request.params.id);
        yield note_service_1.default.deleteNote(request.params.id, userId);
        (0, response_helper_1.successResponse)(res, "Note Deleted Successfully!", {});
    }
    catch (error) {
        console.log('Error In Delete Note', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Delete Note");
    }
});
const translateNote = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Payload for translate', request.body);
        // @ts-ignore
        const userId = request.userId;
        const note = yield note_service_1.default.translateNote(request.body, userId);
        (0, response_helper_1.successResponse)(res, "Note Translate Successfully!", note, 200);
    }
    catch (error) {
        console.log('Error In Translate Note', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Translate Note");
    }
});
const convertOldNoteToNew = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = request.userId;
        const note = yield note_service_1.default.convertOldNoteToNew(request.body.noteId, userId);
        (0, response_helper_1.successResponse)(res, "Note Updated Successfully!", note, 200);
    }
    catch (error) {
        console.log('Error In Convert Old Note To New', error);
        (0, response_helper_1.errorResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || "Failed To Convert Old Note To New");
    }
});
exports.default = { getAllNotes, updateNote, deleteNote, translateNote, convertOldNoteToNew };
