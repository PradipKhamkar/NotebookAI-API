import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helper/response.helper";
import materialService from "../services/material.service";

const add = async (req: Request, res: Response) => {
   try {
      // @ts-ignore
      const userId = req.userId;
      const { noteId, type,userInstruction } = req.body || {};
      console.log("userInstruction",userInstruction);
      const results = await materialService.add(noteId, userId, type,userInstruction);
      successResponse(res, "created successfully!", results)
   } catch (error: any) {
      errorResponse(res, error?.message)
   }
}

const get = async (req: Request, res: Response) => {
   try {
      // @ts-ignore
      const userId = req.userId;
      const results = await materialService.get(req.params._id, userId);
      successResponse(res, "fetched successfully!", results)
   } catch (error: any) {
      errorResponse(res, error?.message)
   }
}

const remove = async (req: Request, res: Response) => {
   try {
      // @ts-ignore
      const userId = req.userId;
      const results = await materialService.remove(req.params._id, userId);
      successResponse(res, "deleted successfully!", results)
   } catch (error: any) {
      errorResponse(res, error?.message)
   }
}
export default { add,get,remove }