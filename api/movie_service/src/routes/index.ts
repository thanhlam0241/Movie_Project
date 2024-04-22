import express from "express";

const router = express.Router();

import movieRouter from "./movie";

router.use("/movies", movieRouter);

export default router;
