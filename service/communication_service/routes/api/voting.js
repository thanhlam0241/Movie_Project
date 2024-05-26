const votingController = require("../../controller/votingController");

const router = require("express").Router();

router.get("/:movie_id", votingController.getVotingMovie);

router.post("/:movie_id", votingController.changeVotingMovie);

module.exports = router;
