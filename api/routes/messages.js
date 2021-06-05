const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
// add
router.post("/", async (req, res) => {
  const sendUser = await User.findById(req.body.sender);
  const receiveUser = await User.findById(req.body.recver);
  const ADDINFO = {
    sendUsername: sendUser.username,
    sendprofilePicture: sendUser.profilePicture,
    senderIds: sendUser._id,
    recUsername: receiveUser.username,
    recprofilePicture: receiveUser.profilePicture,
    receiverIds: receiveUser._id,
  };
  const infoData = {
    ...req.body,
    ...ADDINFO,
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
