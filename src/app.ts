import express from "express";
import { app, httpServer } from "./socket/server";
import fileUpload = require("express-fileupload");
import cors from "cors";

app.use(express.json());
app.use(fileUpload());
app.use(cors());

import noteRoute from "./routes/note.route";
import authRoute from "./routes/auth.route";
import Authenticate from "./middleware/Authenticate";
import fileRoute from "./routes/file.route";
import folderRoute from "./routes/folder.route";
import purchaseRoute from "./routes/purchase.route";
import materialRoute from "./routes/material.route";

app.use('/note', Authenticate, noteRoute);
app.use('/auth', authRoute);
app.use('/file', Authenticate, fileRoute);
app.use('/folder', Authenticate, folderRoute);
app.use('/purchase', Authenticate, purchaseRoute);
app.use('/material', Authenticate, materialRoute);

export default httpServer;
