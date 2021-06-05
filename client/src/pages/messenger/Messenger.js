import React, { useContext, useEffect, useState } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/authC/AuthContext";
import axios from "axios";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c, idx) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} key={idx} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="채팅내용을 입력해주세요..."
                    className="chatMessageInput"
                  ></textarea>
                  <button className="chatSubmitButton">보내기</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                메신저 기능을 사용하기전에 <br />
                <b className="warn">친구의 프로필 사진</b>을 눌러서 채팅
                활성화를 해볼까요?
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
