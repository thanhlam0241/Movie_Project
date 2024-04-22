import express from "express";

const router = express.Router();

import movieRouter from "./movie";
import peopleRouter from "./people";

router.use("/movies", movieRouter);
router.use("/people", peopleRouter);

export default router;
