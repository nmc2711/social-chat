import axios from "axios";
import { toast } from "../common/toast/ToastManager";

// 로그인
export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_START", payload: err });
    toast.show({
      title: "로그인 실패",
      content: err,
      duration: 3000,
    });
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
