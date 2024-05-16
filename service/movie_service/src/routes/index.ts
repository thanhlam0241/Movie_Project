import express from "express";

const router = express.Router();

import movieRouter from "./movie";
import peopleRouter from "./people";
import reviewRouter from "./review";
import companyRouter from "./company";
import creditRouter from "./credit";
import genreRouter from "./genre";
import favoriteRouter from "./favorite";
import historyRouter from "./history";

router.use("/movies", movieRouter);
router.use("/people", peopleRouter);
router.use("/reviews", reviewRouter);
router.use("/companies", companyRouter);
router.use("/credits", creditRouter);
router.use("/genres", genreRouter);
router.use("/favorites", favoriteRouter);
router.use("/histories", historyRouter);

export default router;
