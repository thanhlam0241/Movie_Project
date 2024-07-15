const notificationSchema = require("../models/notification");

const sendMessage = async (req, res) => {
  try {
    const message = new notificationSchema({
      sender: req.body.text,
      text: req.body.text,
      type_to: req.body.type_to,
      username: req.body.username,
    });
    const savedMessage = await message.save();
    if (savedMessage) {
      return res.json(savedMessage);
    } else {
      return res.status(400).send("Can't send message");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Error. Try after few minutes or check again your input");
  }
};

const getMessage = async (req, res) => {
  try {
    const accountUsername = req.body.username;
    const page = parseInt(req.query.page);
    const filter = {
      $or: [
        {
          type_to: "ALL",
        },
        {
          username: accountUsername,
        },
      ],
    };
    const totalNotification = await notificationSchema.countDocuments(filter);
    const result = await notificationSchema
      .find(filter)
      .sort({ create_at: -1 })
      .skip((page - 1) * 10)
      .limit(10);
    return res.status(200).json({
      results: result,
      total: totalNotification,
      page,
      pageMax: Math.ceil(totalNotification / 10),
    });
  } catch (err) {
    return res.status(500).send("Error from server. Try after few minutes");
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
