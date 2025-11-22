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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = config_1.default.DB;
        const connectionInstance = yield mongoose_1.default.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@qa-notesai.zojp6ar.mongodb.net/${DATABASE_NAME}`);
        console.log('MongoDB Connected Successfully 🤩');
    }
    catch (error) {
        console.log('Failed To Connect MongoDB ☹️', error);
        throw error;
    }
});
exports.default = connectDB;
