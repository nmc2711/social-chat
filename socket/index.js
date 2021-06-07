const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8900;

app.use(cors());

const io = require("socket.io")(port, {
  cors: {
    origin: "https://wonderful-lalande-730b8e.netlify.app/",
  },
});

app.get("/", (req, res) => {
  res.send("예스 챗 소켓 서버 오픈");
});

// 소켓서버 접속 유저리스트
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // 연결
  console.log("유저가 연결되었습니다.");
  // 요쳥 유저 리스트 추가
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // 유저 리스트 응답
    io.emit("getUsers", users);
  });
  // 메세지 전송 요청시
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text, profilePicture, username }) => {
      const user = getUser(receiverId);
      // 메세지 데이터 반환
      user.socketId &&
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          profilePicture,
          username,
        });
    }
  );
  // 소켓 디스커넥
  socket.on("disconnect", () => {
    console.log("유저가 소켓 연결을 해제 했습니다.");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
