import React from "react";
import "./conversations.css";

function Conversation() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="conversation">
      <img className="conversationImg" src={PF + "person/noavata.png"} alt="" />
      <span className="conversationName">황상한</span>
    </div>
  );
}

export default Conversation;
