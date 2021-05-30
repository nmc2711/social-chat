import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user.profilePicture._id,
      desc: desc.current.value,
    };

    try {
      await axios.post("/posts", newPost);
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture || PF + "person/noavata.png"}
            alt="프로필이미지"
          />
          <input
            placeholder={`${user.username}님 지금 하고싶은 말은?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">사진/비디오</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              {file && <span className="imgTag">파일명: {file["name"]}</span>}
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">태그</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">위치</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">감정표현</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            공유하기
          </button>
        </form>
      </div>
    </div>
  );
}
