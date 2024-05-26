import {
  upload,
  getListFiles,
  download,
  downloadStream,
} from "@/storage/google_cloud/controller";

import { Router } from "express";

const router = Router();

router.post("/upload", upload);

router.get("/files", getListFiles);

router.get("/files/:name", download);

router.get("/files/stream/:name", downloadStream);

export default router;
