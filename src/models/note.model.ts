import mongoose, { Schema, model } from "mongoose";
import { INote } from "../types/note.type";
import { IMessage } from "../types/llm.type";


const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    summary: {
      type: String,
      required: true
    },
    sources: {
      type: Schema.Types.Mixed,
      default: [],
    },
    // data: {
    //   type: Schema.Types.Mixed,
    //   required: true
    // },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    // @ts-ignore
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transcript: { type: Schema.Types.Mixed },
    metaData: { type: Schema.Types.Mixed, default: {} },
    messages: {
      type: Schema.Types.Mixed,
      default: [],
    },
    suggestionQuery: {
      type: Schema.Types.Mixed,
      default: [],
    }
  },
  { timestamps: true }
);

export const NoteModel = model<INote>("Note", NoteSchema);
