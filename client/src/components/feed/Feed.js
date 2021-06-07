import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authC/AuthContext";
import { PostContext } from "../../context/postC/PostContext";
import { LIST_TYPE } from "./types";
import axios from "axios";

import Post from "../post/Post";
import Share from "../share/Share";

import { CircularProgress } from "@material-ui/core";
import "./feed.css";

function Feed({ username }) {
  const location = useLocation().pathname;
  const { user } = useContext(AuthContext);
  const { postCallState } = useContext(PostContext); //--- postCallState 클라이언트에서 피드 재조회를 위한 플래그
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  const shareShow = useMemo(() => {
    if (!username || username === user.username) {
      return false;
    } else {
      return true;
    }
  }, [username, user.username]);

  useEffect(async () => {
    const fetchPost = async () => {
      setLoading(true);
      // 프로필 페이지 와 메인페이지의 피드가 다르기 떄문에 rest path 분기 (프로필 페이지는 내가 쓴것만)
      const res = username
        ? await axios.get(
            "https://yeschathhsh.herokuapp.com/api/posts/profile/" + username
          )
        : await axios.get(
            "https://yeschathhsh.herokuapp.com/api/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        // 사실 서버에서 소팅 하는게 더 바람직 최신순 정리
      );
      setLoading(false);
    };
    if (username || location === "/") {
      fetchPost();
    }
  }, [username, user._id, postCallState]);

  const RenderFeeds = useCallback(() => {
    if (LIST_TYPE(loading) === "데이터로딩중") {
      return (
        <div className="loadingWrap">
          <CircularProgress color="primary" size="100px" />;
        </div>
      );
    } else if (LIST_TYPE(loading, post.length) === "데이터없음") {
      return <h1 className="noResult">텅 !</h1>;
    } else if (LIST_TYPE(loading, post.length) === "조회성공") {
      return post.map((p) => <Post key={p._id} post={p} />);
    }
  }, [post, loading]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!shareShow && <Share />}
        {RenderFeeds()}
      </div>
    </div>
  );
}

export default Feed;
