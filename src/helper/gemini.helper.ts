import { GoogleGenAI, createUserContent, createModelContent } from "@google/genai";
import config from "../config";
import { UploadedFile } from "express-fileupload";
import { IMessage, IRetryConfig } from "../types/llm.type";

const geminiClient = new GoogleGenAI({ apiKey: config.GOOGLE.GEMINI_API_KEY });

const getNotesResponse = async (
  system: string,
  messages: any[],
  structureOutput: any,
  modelName: string = "gemini-2.5-flash-lite",
  retryConfig: IRetryConfig = {
    jsonRetries: 2,
    apiRetryDelays: [30_000, 60_000],
    fallbackModel: "gemini-2.5-flash",
  }
) => {
  let apiAttempt = 0;
  let jsonAttempt = 0;
  let currentModel = modelName;

  while (true) {
    try {
      
      const res = await geminiClient.models.generateContent({
        model: currentModel,
        config: {
          systemInstruction: { parts: [{ text: system }] },
          responseJsonSchema: structureOutput,
          responseMimeType: "application/json",
        },
        contents: messages,
      });
      return JSON.parse(res.text as string);
    } catch (error: any) {
      console.log('ERROR INSIDE GEMINI NOTE RESPONSE', JSON.stringify(error))
      if (error instanceof SyntaxError) {
        jsonAttempt++;
        if (jsonAttempt > retryConfig.jsonRetries) { throw new Error(`JSON parse failed after ${retryConfig.jsonRetries} retries`); }
        console.warn(`JSON parse failed (attempt ${jsonAttempt}). Retrying with same model...`);
        continue; // quick retry, no wait
      }
      if (error?.status === 503 || error?.statusCode === 503) {
        if (apiAttempt < retryConfig.apiRetryDelays.length) {
          const waitTime = retryConfig.apiRetryDelays[apiAttempt];
          console.warn(`503 error. Waiting ${waitTime / 1000}s before retry (attempt ${apiAttempt + 1})...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          apiAttempt++;
          continue;
        }
      }
      if (currentModel !== retryConfig.fallbackModel && (error?.status === 503 || error?.statusCode === 503)) {
        console.warn(`503 persists. Switching model from ${currentModel} to ${retryConfig.fallbackModel}`);
        currentModel = retryConfig.fallbackModel;
        apiAttempt = 0;
        continue;
      }
      throw error
    }
  }
};

const getFileURLMessage = (fileUrl: string) => {
  return {
    fileData: {
      fileUri: fileUrl,
    },
  };
};

const uploadFile = async (file: UploadedFile, type: string) => {
  const timeout = 10 * 60 * 1000; // 10 minutes
  const pollInterval = 10 * 1000; // 10 seconds
  const uploadRetryDelays = [5_000, 15_000, 30_000, 60_000]; // retry delays for upload (5s → 15s → 30s)

  // Helper: wait function
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // ========== 1. Upload with retry ==========
    let uploadRes;
    for (let attempt = 0; attempt <= uploadRetryDelays.length; attempt++) {
      try {
        // @ts-ignore
        const fileBlob = new Blob([file.data], { type });
        uploadRes = await geminiClient.files.upload({
          file: fileBlob,
          config: { mimeType: type },
        });
        break; // success ✅
      } catch (err: any) {
        if (err?.status === 503 || err?.statusCode === 503) {
          if (attempt < uploadRetryDelays.length) {
            console.warn(
              `503 on upload. Retrying in ${uploadRetryDelays[attempt] / 1000}s...`
            );
            await wait(uploadRetryDelays[attempt]);
            continue;
          }
        }
        throw err; // non-503 or max retries exceeded
      }
    }
    console.log('After Uplaod::', uploadRes)
    if (!uploadRes) throw new Error("Upload failed after retries.");

    // ========== 2. Poll status ==========
    const fileId = uploadRes.name;
    const start = Date.now();
    let fileStatus = uploadRes;

    while (Date.now() - start < timeout) {
      try {
        fileStatus = await geminiClient.files.get({ name: fileId as string });
        if (fileStatus.state === "ACTIVE") {
          console.log("✅ File is ACTIVE", fileStatus);
          break;
        }
        console.log("⏳ File still processing... state:", fileStatus.state);
      } catch (err: any) {
        if (err?.status === 503 || err?.statusCode === 503) {
          console.warn("503 while polling. Retrying in 10s...");
          await wait(pollInterval);
          continue; // keep polling
        }
        throw err; // non-503 error
      }
      await wait(pollInterval);
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
  } catch (error) {
    console.error("❌ uploadFile failed:", error);
    throw error;
  }
};

const deleteFile = async (fileName: string) => {
  try {
    const deleteRes = await geminiClient.files.delete({ name: fileName });
    const allFiles = await geminiClient.files.list();
    // console.log("DELETE response", deleteRes);
    // console.log("allFiles", allFiles);
    return deleteFile;
  } catch (error) {
    console.log("Error In Delete File::", error);
    // throw error;
  }
};

const streamResponse = async (messages: IMessage[], systemInstruction: string, model: string = "gemini-2.0-flash-lite") => {
  try {
    // @ts-ignore
    messages = messages.map((m) => {
      if (m.role === "user") return createUserContent(m.content);
      return createModelContent(m.content)
    });
    const stream = await geminiClient.models.generateContentStream({
      contents: messages,
      model: model,
      config: { systemInstruction: { parts: [{ text: systemInstruction }] } },
    });
    return stream
  } catch (error) {
    throw error
  }
};

export default {
  getNotesResponse,
  getFileURLMessage,
  geminiClient,
  uploadFile,
  deleteFile,
  streamResponse
};
