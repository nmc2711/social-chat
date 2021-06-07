import { useEffect, useLayoutEffect, useState } from "react";
import { postConversation } from "../../util/apiCalls";
import axios from "axios";

import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useLayoutEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "https://yeschathhsh.herokuapp.com/api/users/friends/" + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `https://yeschathhsh.herokuapp.com/api/conversations/find/${currentId}/${user._id}`
      );
      // 기존 채팅방 개설유무에 따른 채팅방 신개설 있다면 기존
      if (res.data) {
        setCurrentChat(res.data);
      } else {
        const messagesData = postConversation(currentId, user._id);
        setCurrentChat(messagesData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture ? o.profilePicture : PF + "person/noavata.png"
              }
              alt="온라인 유저 프로필 이미지"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
