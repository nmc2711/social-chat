const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
// add
router.post("/", async (req, res) => {
  const info = await User.findById(req.body.sender);
  const infoData = {
    ...req.body,
    username: info.username,
    profilePicture: info.profilePicture,
  };
  const newMessage = new Message(infoData);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
