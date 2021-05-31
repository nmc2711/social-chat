import React, { useContext, useCallback } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/authC/AuthContext";
import { PostContext } from "../../context/postC/PostContext";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
function Feed({ username }) {
  const location = useLocation().pathname;
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const { user } = useContext(AuthContext);
  const { postCallState } = useContext(PostContext);

  useEffect(async () => {
    const fetchPost = async () => {
      setLoading(true);
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
    };
    if (username || location === "/") {
      fetchPost();
    }
  }, [username, user._id, postCallState]);

  const RenderCOM = useCallback(() => {
    if (loading) {
      return (
        <div className="loadingWrap">
          <CircularProgress color="primary" size="100px" />;
        </div>
      );
    } else if (loading === false && post.length === 0) {
      return <h1 className="noResult">텅 !</h1>;
    } else if (loading === false && post.length !== 0) {
      return post.map((p) => <Post key={p._id} post={p} />);
    }
  }, [post, loading]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {RenderCOM()}
      </div>
    </div>
  );
}

export default Feed;
