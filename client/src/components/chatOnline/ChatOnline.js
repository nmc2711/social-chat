import React from "react";
import "./chatOnline.css";

function ChatOnline() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src={PF + "person/noavata.png"}
            alt="채팅친구프로필"
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">산다라박</div>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src={PF + "person/noavata.png"}
            alt="채팅친구프로필"
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">산다라박</div>
      </div>
    </div>
  );
}

export default ChatOnline;
