import { createUserContent } from "@google/genai";
import structureConstant from "../constants/structure.constant";
import geminiHelper from "../helper/gemini.helper";
import { NoteModel } from "../models/note.model";
import { IMaterialUserInstruction, MaterialType } from "../types/material.type";
import MaterialModel from "../models/material.model";

const add = async (noteId: string, userId: string, type: MaterialType,userInstruction: IMaterialUserInstruction) => {
   try {
      const noteInfo = await NoteModel.findById(noteId);
      if (!noteInfo) throw new Error("note not found!");
      const { summary } = noteInfo;

      // system prompt and user message
      let systemPrompt = `generate ${type} this is summary of note ${summary}`;
      const message = createUserContent(`generate ${type} based on my note summary and user instruction: ${userInstruction.instruction} level of difficulty: ${userInstruction.difficultyLevel} number of content: ${userInstruction.numberOfContain}`);
      
      // structure json based on type
      let structureJSON:any = structureConstant.quiz;
      if(type === "flash-card") structureJSON = structureConstant.flashCard;
      else if(type === "mind-map") structureJSON = structureConstant.mindMap;
   
      const data = await geminiHelper.getNotesResponse(systemPrompt, [message],structureJSON);
      const res = await MaterialModel.create({data,noteId,createdBy:userId,type});
      return {_id:res._id,type:res.type,data:{title:res.data.title}}
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