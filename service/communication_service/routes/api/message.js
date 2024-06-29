const messageController = require("../../controller/messageController");

const router = require("express").Router();

router.post("/:movie_id", messageController.sendMessage);

router.get("/:movie_id", messageController.getCommentInMovie);

module.exports = router;
