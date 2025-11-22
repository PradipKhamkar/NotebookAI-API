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
const config_1 = __importDefault(require("../config"));
const geminiClient = new genai_1.GoogleGenAI({ apiKey: config_1.default.GOOGLE.GEMINI_API_KEY });
const getNotesResponse = (system_1, messages_1, structureOutput_1, ...args_1) => __awaiter(void 0, [system_1, messages_1, structureOutput_1, ...args_1], void 0, function* (system, messages, structureOutput, modelName = "gemini-2.5-flash-lite", retryConfig = {
    jsonRetries: 2,
    apiRetryDelays: [30000, 60000],
    fallbackModel: "gemini-2.5-flash",
}) {
    let apiAttempt = 0;
    let jsonAttempt = 0;
    let currentModel = modelName;
    while (true) {
        try {
            const res = yield geminiClient.models.generateContent({
                model: currentModel,
                config: {
                    systemInstruction: { parts: [{ text: system }] },
                    responseJsonSchema: structureOutput,
                    responseMimeType: "application/json",
                },
                contents: messages,
            });
            return JSON.parse(res.text);
        }
        catch (error) {
            console.log('ERROR INSIDE GEMINI NOTE RESPONSE', JSON.stringify(error));
            if (error instanceof SyntaxError) {
                jsonAttempt++;
                if (jsonAttempt > retryConfig.jsonRetries) {
                    throw new Error(`JSON parse failed after ${retryConfig.jsonRetries} retries`);
                }
                console.warn(`JSON parse failed (attempt ${jsonAttempt}). Retrying with same model...`);
                continue; // quick retry, no wait
            }
            if ((error === null || error === void 0 ? void 0 : error.status) === 503 || (error === null || error === void 0 ? void 0 : error.statusCode) === 503) {
                if (apiAttempt < retryConfig.apiRetryDelays.length) {
                    const waitTime = retryConfig.apiRetryDelays[apiAttempt];
                    console.warn(`503 error. Waiting ${waitTime / 1000}s before retry (attempt ${apiAttempt + 1})...`);
                    yield new Promise((resolve) => setTimeout(resolve, waitTime));
                    apiAttempt++;
                    continue;
                }
            }
            if (currentModel !== retryConfig.fallbackModel && ((error === null || error === void 0 ? void 0 : error.status) === 503 || (error === null || error === void 0 ? void 0 : error.statusCode) === 503)) {
                console.warn(`503 persists. Switching model from ${currentModel} to ${retryConfig.fallbackModel}`);
                currentModel = retryConfig.fallbackModel;
                apiAttempt = 0;
                continue;
            }
            throw error;
        }
    }
});
const getFileURLMessage = (fileUrl) => {
    return {
        fileData: {
            fileUri: fileUrl,
        },
    };
};
const uploadFile = (file, type) => __awaiter(void 0, void 0, void 0, function* () {
    const timeout = 10 * 60 * 1000; // 10 minutes
    const pollInterval = 10 * 1000; // 10 seconds
    const uploadRetryDelays = [5000, 15000, 30000, 60000]; // retry delays for upload (5s → 15s → 30s)
    // Helper: wait function
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
        // ========== 1. Upload with retry ==========
        let uploadRes;
        for (let attempt = 0; attempt <= uploadRetryDelays.length; attempt++) {
            try {
                // @ts-ignore
                const fileBlob = new Blob([file.data], { type });
                uploadRes = yield geminiClient.files.upload({
                    file: fileBlob,
                    config: { mimeType: type },
                });
                break; // success ✅
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.status) === 503 || (err === null || err === void 0 ? void 0 : err.statusCode) === 503) {
                    if (attempt < uploadRetryDelays.length) {
                        console.warn(`503 on upload. Retrying in ${uploadRetryDelays[attempt] / 1000}s...`);
                        yield wait(uploadRetryDelays[attempt]);
                        continue;
                    }
                }
                throw err; // non-503 or max retries exceeded
            }
        }
        console.log('After Uplaod::', uploadRes);
        if (!uploadRes)
            throw new Error("Upload failed after retries.");
        // ========== 2. Poll status ==========
        const fileId = uploadRes.name;
        const start = Date.now();
        let fileStatus = uploadRes;
        while (Date.now() - start < timeout) {
            try {
                fileStatus = yield geminiClient.files.get({ name: fileId });
                if (fileStatus.state === "ACTIVE") {
                    console.log("✅ File is ACTIVE", fileStatus);
                    break;
                }
                console.log("⏳ File still processing... state:", fileStatus.state);
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.status) === 503 || (err === null || err === void 0 ? void 0 : err.statusCode) === 503) {
                    console.warn("503 while polling. Retrying in 10s...");
                    yield wait(pollInterval);
                    continue; // keep polling
                }
                throw err; // non-503 error
            }
            yield wait(pollInterval);
        }
        if (fileStatus.state !== "ACTIVE") {
            throw new Error("File did not become ACTIVE within 10 minutes");
        }
        // ========== 3. Return final details ==========
        return {
            fileName: fileStatus.name,
            size: fileStatus.sizeBytes,
            mimType: fileStatus.mimeType,
            uri: fileStatus.uri,
        };
    }
    catch (error) {
        console.error("❌ uploadFile failed:", error);
        throw error;
    }
});
const deleteFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteRes = yield geminiClient.files.delete({ name: fileName });
        const allFiles = yield geminiClient.files.list();
        // console.log("DELETE response", deleteRes);
        // console.log("allFiles", allFiles);
        return deleteFile;
    }
    catch (error) {
        console.log("Error In Delete File::", error);
        // throw error;
    }
});
const streamResponse = (messages_1, systemInstruction_1, ...args_1) => __awaiter(void 0, [messages_1, systemInstruction_1, ...args_1], void 0, function* (messages, systemInstruction, model = "gemini-2.0-flash-lite") {
    try {
        // @ts-ignore
        messages = messages.map((m) => {
            if (m.role === "user")
                return (0, genai_1.createUserContent)(m.content);
            return (0, genai_1.createModelContent)(m.content);
        });
        const stream = yield geminiClient.models.generateContentStream({
            contents: messages,
            model: model,
            config: { systemInstruction: { parts: [{ text: systemInstruction }] } },
        });
        return stream;
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    getNotesResponse,
    getFileURLMessage,
    geminiClient,
    uploadFile,
    deleteFile,
    streamResponse
};
