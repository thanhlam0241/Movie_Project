const commentController = require("../../controller/commentController");

const router = require("express").Router();

router.post("/:movie_id", commentController.createCommentInMovie);

router.get("/:movie_id", commentController.getCommentInMovie);

module.exports = router;
