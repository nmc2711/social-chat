const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // 1*
const helmet = require("helmet"); // 2*
const morgan = require("morgan"); // 3* express 콘솔로거
const multer = require("multer"); // 4*
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");

dotenv.config();

//몽고 디비연결
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// middleware 연결
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// 이미지 업로드 path 설정 : multer를 통한 저장소 위치 및 파일명 정의
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

// api route location 지정
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("파일업로드 성공했습니다.");
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("예스쳇 백엔드 서버 온");
});
// 서버연결
app.listen(8800, () => {
  console.log("백엔드 연결 성공");
});
