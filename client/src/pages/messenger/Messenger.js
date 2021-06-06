import React, { useRef } from "react";

import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

import "./messenger.css";

import useMessenger from "./useMessenger";

function Messenger() {
  const socket = useRef();
  const scrollRef = useRef();

  // useMessenger 커스텀훅을 통한 index 상태관리
  const {
    user,
    conversations,
    currentChat,
    messages,
    newMessage,
    onlineUsers,
    setNewMessage,
    setCurrentChat,
    handleSubmit,
  } = useMessenger({ socket, scrollRef });

  return (
    <React.Fragment>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c, idx) => (
              <div onClick={() => setCurrentChat(c)} key={idx}>
                <Conversation
                  conversation={c}
                  currentUser={user}
                  own={c.senderIds === user._id}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, idx) => (
                    <div ref={scrollRef} key={`ss` + idx}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="채팅내용을 입력해주세요..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    보내기
                  </button>
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
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Messenger;
