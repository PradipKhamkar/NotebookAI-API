"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = __importDefault(require("../controller/folder.controller"));
const route = express_1.default.Router();
route.post('/', folder_controller_1.default.create);
route.delete('/:id', folder_controller_1.default.remove);
route.put('/', folder_controller_1.default.update);
route.put('/sequence', folder_controller_1.default.updateSequences);
exports.default = route;
