"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controller/note.controller"));
const route = express_1.default.Router();
route.get('/', note_controller_1.default.getAllNotes);
route.put('/', note_controller_1.default.updateNote);
route.delete('/:id', note_controller_1.default.deleteNote);
route.post('/translate', note_controller_1.default.translateNote);
route.post('/convert-old-to-new', note_controller_1.default.convertOldNoteToNew);
exports.default = route;
