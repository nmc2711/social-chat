import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authC/AuthContext";
import axios from "axios";

function useMessenger({ socket, scrollRef }) {
  const { user, chatInfo } = useContext(AuthContext);

  const [conversations, setConversations] = useState([]); // --- 채팅이력 상대 리스트(left)
  const [currentChat, setCurrentChat] = useState(null); // 채팅방에대한 정보 갱신
  const [messages, setMessages] = useState([]); // --- 기존 메세지 데이터
  const [newMessage, setNewMessage] = useState(""); // --- 메세지 보내기 text input state
  const [arrivalMessage, setArrivalMessage] = useState(null); // --- 소켓 도착 메세지 라수투(send, get)
  const [onlineUsers, setOnlineUsers] = useState([]); // --- 온라인친구 리스트(right)

  useLayoutEffect(() => {
    // 소켓서버 커넥트
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    // 소켓서버에 접속리스트 유저등록
    socket.current.emit("addUser", user._id);
    // 현재 소켓서버에 접속중인 친구리스트 필터
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    if (chatInfo) setCurrentChat(chatInfo);
  }, [chatInfo]);

  useEffect(() => {
    // 채팅이력 상대 리스트 조회
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

  useEffect(() => {
    // 저장된 채팅 메세지 조회 init data
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (currentChat) {
      // 1* 소켓을 통해 get message 랜더셋
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
          profilePicture: data.profilePicture,
          username: data.username,
        });
      });
    }
  }, [currentChat]);

  useEffect(() => {
    // 1* 통해 셋된 arrivalMessage를 기존 message state 및 재랜더
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // 채팅보내기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    const message = {
      sender: user._id,
      recver: receiverId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      profilePicture: user.profilePicture,
      username: user.username,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  // 스크롤 바텀 유지
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return {
    user,
    conversations,
    currentChat,
    messages,
    newMessage,
    arrivalMessage,
    onlineUsers,
    setMessages,
    setNewMessage,
    setCurrentChat,
    setConversations,
    setArrivalMessage,
    setOnlineUsers,
    handleSubmit,
  };
}
export default useMessenger;
