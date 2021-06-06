import { format } from "timeago.js";
import "./message.css";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            message.profilePicture ||
            message.sendprofilePicture ||
            PF + "person/noavata.png"
          }
          alt="채팅 프로필 사진"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
