const ratingController = require("../../controller/ratingController");

const router = require("express").Router();

router.get("/:movie_id", ratingController.getRatingMovie);

router.post("/:movie_id", ratingController.ratingMovie);

module.exports = router;
