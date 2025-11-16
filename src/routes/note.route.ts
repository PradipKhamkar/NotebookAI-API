import express from "express";
import noteController from "../controller/note.controller";
const route = express.Router();

route.get('/', noteController.getAllNotes);
route.put('/', noteController.updateNote);
route.delete('/:id', noteController.deleteNote);
route.post('/translate', noteController.translateNote);
route.post('/convert-old-to-new', noteController.convertOldNoteToNew);

export default route