const notificationController = require("../../controller/notificationController");

const router = require("express").Router();

router.post("/send", notificationController.sendMessage);

router.post("/", notificationController.getMessage);

module.exports = router;
