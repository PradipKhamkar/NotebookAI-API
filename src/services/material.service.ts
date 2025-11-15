import { createUserContent } from "@google/genai";
import structureConstant from "../constants/structure.constant";
import geminiHelper from "../helper/gemini.helper";
import { NoteModel } from "../models/note.model";
import { MaterialType } from "../types/material.type";
import MaterialModel from "../models/material.model";

const add = async (noteId: string, userId: string, type: MaterialType) => {
   try {
      const noteInfo = await NoteModel.findById(noteId);
      if (!noteInfo) throw new Error("note not found!");
      const { summary } = noteInfo;
      let systemPrompt = `generate ${type} this is summary of note ${summary}`;
      const message = createUserContent(`generate ${type} based on my note summary`);
      const data = await geminiHelper.getNotesResponse(systemPrompt, [message], structureConstant.quiz);
      console.log('data::',JSON.stringify(data));
      const res = await MaterialModel.create({data,noteId,createdBy:userId,type});
      return {_id:res._id}
   } catch (error) {
      throw error
   }
}
const get = async(materialId:string,userId:string)=>{
   try {
      const material = await MaterialModel.findOne({_id:materialId,createdBy:userId}).select('type data _id');
      return material
   } catch (error) {
      throw error
   }
}
const remove = async(materialId:string,userId:string)=>{
   try {
     await MaterialModel.findOneAndDelete({_id:materialId,createdBy:userId})
     return 
   } catch (error) {
      throw error
   }
}

export default { add,get,remove }