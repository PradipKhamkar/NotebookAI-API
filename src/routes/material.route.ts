import express from "express";
import materialController from "../controller/material.controller";
const route = express.Router();

route.post('/',materialController.add);
route.get('/:_id',materialController.get);
route.delete('/:_id',materialController.remove); 

export default route