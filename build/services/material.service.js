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
const genai_1 = require("@google/genai");
const structure_constant_1 = __importDefault(require("../constants/structure.constant"));
const gemini_helper_1 = __importDefault(require("../helper/gemini.helper"));
const note_model_1 = require("../models/note.model");
const material_model_1 = __importDefault(require("../models/material.model"));
const material_constant_1 = __importDefault(require("../constants/material.constant"));
const prompt_constant_1 = __importDefault(require("../constants/prompt.constant"));
const add = (noteId, userId, type, userInstruction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteInfo = yield note_model_1.NoteModel.findById(noteId);
        if (!noteInfo)
            throw new Error("note not found!");
        const { summary } = noteInfo;
        // system prompt and user message
        const message = (0, genai_1.createUserContent)(material_constant_1.default.createStudyMaterialUserMessage(type, summary, userInstruction));
        // structure json based on type
        let structureJSON = structure_constant_1.default.quiz;
        if (type === "flash-card")
            structureJSON = structure_constant_1.default.flashCard;
        else if (type === "mind-map")
            structureJSON = structure_constant_1.default.mindMap;
        const data = yield gemini_helper_1.default.getNotesResponse(prompt_constant_1.default.STUDY_MATERIAL_SYSTEM_PROMPT, [message], structureJSON);
        const res = yield material_model_1.default.create({ data, noteId, createdBy: userId, type });
        return { _id: res._id, type: res.type, data: { title: res.data.title } };
    }
    catch (error) {
        throw error;
    }
});
const get = (materialId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const material = yield material_model_1.default.findOne({ _id: materialId, createdBy: userId }).select('type data _id');
        return material;
    }
    catch (error) {
        throw error;
    }
});
const remove = (materialId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield material_model_1.default.findOneAndDelete({ _id: materialId, createdBy: userId });
        return;
    }
    catch (error) {
        throw error;
    }
});
exports.default = { add, get, remove };
