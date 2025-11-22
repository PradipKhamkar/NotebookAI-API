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
exports.httpServer = exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_constant_1 = __importDefault(require("../constants/socket.constant"));
const note_service_1 = __importDefault(require("../services/note.service"));
const AuthenticateSocket_1 = __importDefault(require("../middleware/AuthenticateSocket"));
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer, {});
exports.io = io;
io.use(AuthenticateSocket_1.default);
io.on("connect", (socket) => {
    // @ts-ignore
    const user = socket.user;
    const { noteJob, translate, askNote } = socket_constant_1.default.events;
    socket.on(noteJob.job_added, (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('new note event catch');
            socket.emit(noteJob.job_started);
            const newNote = yield note_service_1.default.newNote(user._id, payload);
            socket.emit(noteJob.job_done, newNote);
        }
        catch (error) {
            socket.emit(noteJob.job_failed, error === null || error === void 0 ? void 0 : error.message);
        }
    }));
    socket.on(translate.job_added, (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket.emit(translate.job_started);
            console.log('new translate event catch');
            const translatedNote = yield note_service_1.default.translateNote(payload, user._id);
            socket.emit(translate.job_added, translatedNote);
        }
        catch (error) {
            socket.emit(translate.job_failed, error);
        }
    }));
    socket.on(askNote.query, (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield note_service_1.default.askNote(socket, user._id, payload.noteId, payload.query);
        }
        catch (error) {
            socket.emit(askNote.message, { content: { message: error.message || "error occurred" }, type: "error" });
            console.log('Error inside ask note::', error);
        }
    }));
});
