const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
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

module.exports = mongoose.model("Conversation", ConversationSchema);
