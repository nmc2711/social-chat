import axios from "axios";
import { toast } from "../common/toast/ToastManager";

// 로그인
export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    alert("등록되지않은 아이디이거나 비밀번호가 다릅니다.");
  }
};

// 게시물 좋아요 토글
export const putLikeToggle = async (postId, currentUserId) => {
  try {
    axios.put("/posts/" + postId + "/like", { userId: currentUserId });
  } catch (err) {
    toast.show({
      title: "좋아요 실패",
      content: err,
      duration: 3000,
    });
  }
};

// 대화조인
export const postConversation = async (senderId, receiverId) => {
  let resultData;
  try {
    const res = await axios.post(`/conversations/`, {
      senderId,
      receiverId,
    });
    resultData = res.data;
  } catch (err) {
    resultData = false;
    toast.show({
      title: "대화방연결 실패",
      content: err,
      duration: 3000,
    });
  }
  return resultData;
};
