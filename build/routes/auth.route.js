"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authenticate_1 = __importDefault(require("../middleware/Authenticate"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const router = (0, express_1.Router)();
router.post('/google', auth_controller_1.default.googleAuth);
router.post('/new-accessToken', auth_controller_1.default.getNewAccessToken);
router.get('/logged-user', Authenticate_1.default, auth_controller_1.default.getLoggedUser);
router.delete('/', Authenticate_1.default, auth_controller_1.default.deleteAccount);
exports.default = router;
