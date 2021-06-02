import "./message.css";
import { format } from "timeago.js";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">
          메세지 텍스트 체크메세지 텍스트 체크메세지 텍스트 체크메세지 텍스트
          체크메세지 텍스트 체크
        </p>
      </div>
      <div className="messageBottom">1분전</div>
    </div>
  );
}
