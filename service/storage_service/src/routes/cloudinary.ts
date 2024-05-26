import { GetFileChunk } from "@/storage/cloudinary/controller";

import e, { Router } from "express";

const router = Router();

router.get("/file", GetFileChunk);

export default router;
