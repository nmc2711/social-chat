const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");

// 채팅방 개설
router.post("/", async (req, res) => {
  const sendUser = await User.findById(req.body.senderId);
  const receiveUser = await User.findById(req.body.receiverId);
  const ADDINFO = {
    sendUsername: sendUser.username,
    sendprofilePicture: sendUser.profilePicture,
    senderIds: sendUser._id,
    recUsername: receiveUser.username,
    recprofilePicture: receiveUser.profilePicture,
    receiverIds: receiveUser._id,
  };
  const newConversation = new Conversation({
    ...ADDINFO,
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 특정 유저 채팅방 조회
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 특정 채팅방 연결
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
