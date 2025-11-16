import { Request, Response } from "express";
import noteService from "../services/note.service";
import { errorResponse, successResponse } from "../helper/response.helper";

const getAllNotes = async (request: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = request.userId
    const notes = await noteService.getAllNotes(userId);
    successResponse(res, "Notes Fetched Successfully!", notes, 200)
  } catch (error: any) {
    console.log('Error In Fetched Notes', error)
    errorResponse(res, error?.message || "Failed To Fetched All Notes")
  }
}

const updateNote = async (request: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = request.userId
    const note = await noteService.updateNote(request.body.noteId, request.body.data, userId);
    successResponse(res, "Note Updated Successfully!", note, 200);
  } catch (error: any) {
    console.log('Error In Update Note', error)
    errorResponse(res, error?.message || "Failed To Update Note")
  }
}

const deleteNote = async (request: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = request.userId
    console.log('Request Body',request.params.id)
    await noteService.deleteNote(request.params.id,userId);
    successResponse(res, "Note Deleted Successfully!",{});
  } catch (error: any) {
    console.log('Error In Delete Note', error)
    errorResponse(res, error?.message || "Failed To Delete Note")
  }
}

const translateNote = async (request: Request, res: Response) => {
  try {
    console.log('Payload for translate',request.body)
    // @ts-ignore
    const userId = request.userId
    const note = await noteService.translateNote(request.body,userId);
    successResponse(res, "Note Translate Successfully!", note, 200);
  } catch (error: any) {
    console.log('Error In Translate Note', error)
    errorResponse(res, error?.message || "Failed To Translate Note")
  }
}

const convertOldNoteToNew = async (request: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = request.userId
    const note = await noteService.convertOldNoteToNew(request.body.noteId,userId);
    successResponse(res, "Note Updated Successfully!", note, 200);
  } catch (error: any) {
    console.log('Error In Convert Old Note To New', error)
    errorResponse(res, error?.message || "Failed To Convert Old Note To New")
  }
}

export default { getAllNotes,updateNote,deleteNote,translateNote,convertOldNoteToNew }