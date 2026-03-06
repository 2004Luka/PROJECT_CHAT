import express from "express";
import { upload, uploadImage } from "../controllers/image.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/upload", protectRoute, upload.single('image'), uploadImage);

export default router;

