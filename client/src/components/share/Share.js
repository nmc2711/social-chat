import { useContext, useRef, useState, useCallback } from "react";
import axios from "axios";

import { AuthContext } from "../../context/authC/AuthContext";
import { PostContext } from "../../context/postC/PostContext";

import { toast } from "../../common/toast/ToastManager";

import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { Cancel } from "@material-ui/icons";

import "./share.css";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const { postCallState, dispatch } = useContext(PostContext);

  const [file, setFile] = useState(null);

  const desc = useRef();

  const initializeShareInputs = useCallback(() => {
    desc.current.value = "";
    setFile(null);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (desc.current.value.length === 0 && file === null) {
      alert("한글자이상 입력해주세요 !");
      return null;
    }
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        toast.show({
          title: "실패",
          content: err,
          duration: 3000,
        });
      }
    }
    try {
      await axios.post("/posts", newPost);
      dispatch({ type: "POST_UPLOAD", payload: !postCallState });
      toast.show({
        title: "성공",
        content: "피드를 등록했어요 !",
        duration: 3000,
      });
    } catch (err) {
      toast.show({
        title: "실패",
        content: "피드 등록에 실패하였습니다.",
        duration: 3000,
      });
    }
    initializeShareInputs();
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
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              src="shareImg"
              src={URL.createObjectURL(file)}
              alt="업로드이미지 미리보기"
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            <span className="imgTag">파일명: {file["name"]}</span>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
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
