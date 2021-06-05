import axios from "axios";
import React, { useState, useEffect } from "react";
import "./conversations.css";

function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          conversation?.profilePicture
            ? conversation.profilePicture
            : PF + "person/noavata.png"
        }
        alt="대화상대리스트 프로필 이미지"
      />
      <span className="conversationName">{conversation?.username}</span>
    </div>
  );
}

export default Conversation;
