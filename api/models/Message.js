const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    sendUsername: {
      type: String,
    },
    sendprofilePicture: {
      type: String,
      default: "",
    },
    senderIds: {
      type: String,
    },
    recUsername: {
      type: String,
    },
    recprofilePicture: {
      type: String,
      default: "",
    },
    receiverIds: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
