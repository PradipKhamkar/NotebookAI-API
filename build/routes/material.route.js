"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const material_controller_1 = __importDefault(require("../controller/material.controller"));
const route = express_1.default.Router();
route.post('/', material_controller_1.default.add);
route.get('/:_id', material_controller_1.default.get);
route.delete('/:_id', material_controller_1.default.remove);
exports.default = route;
