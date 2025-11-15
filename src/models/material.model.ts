import mongoose, { model, Schema } from "mongoose";
import { IMaterial } from "../types/material.type";

const materialSchema = new Schema<IMaterial>({
   type: {
      type: String,
      required: true
   },
   noteId: {
      type: mongoose.Types.ObjectId,
      ref: "notes",
      required: true
   },
   data: {
      type: Schema.Types.Mixed,
      required: true
   },
   // @ts-ignore
   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
   }
}, { timestamps: true });

const MaterialModel = model("material", materialSchema);
export default MaterialModel