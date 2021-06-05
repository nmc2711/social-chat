import React from "react";
import "./conversations.css";

function Conversation({ conversation, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // own을 분기로 채팅창 나와 상대 나눔
  const prImg = own
    ? conversation?.recprofilePicture
    : conversation?.sendprofilePicture;

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          conversation?.sendprofilePicture ? prImg : PF + "person/noavata.png"
        }
        alt="대화상대리스트 프로필 이미지"
      />
      <span className="conversationName">
        {own ? conversation?.recUsername : conversation?.sendUsername}
      </span>
    </div>
  );
}
export default Conversation;
