import {
  uploadVideo,
  uploadImage,
  getListFiles,
  download,
  downloadStream,
} from "@/storage/google_cloud/controller";

import { Router } from "express";

const router = Router();

router.post("/upload/video", uploadVideo);

router.post("/upload/image", uploadImage);

router.get("/files", getListFiles);

router.get("/files/:name", download);

router.get("/files/stream/:name", downloadStream);

export default router;
