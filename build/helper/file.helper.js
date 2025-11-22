"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFileMetaData = (file) => {
    return { size: file.size, name: file.name };
};
exports.default = { getFileMetaData };
