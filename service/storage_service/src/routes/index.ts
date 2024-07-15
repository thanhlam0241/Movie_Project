import routerCloudinary from "./cloudinary";
import routerGoogleClod from "./google-cloud";

import { Router } from "express";

const router = Router();

router.use("/cloudinary", routerCloudinary);
router.use("/gcs", routerGoogleClod);

export default router;
