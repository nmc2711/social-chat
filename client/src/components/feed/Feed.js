import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/authC/AuthContext";
import { PostContext } from "../../context/postC/PostContext";
import { useLocation } from "react-router-dom";
function Feed({ username }) {
  const location = useLocation().pathname;
  const [post, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { postCallState } = useContext(PostContext);

  useEffect(async () => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    if (username || location === "/") fetchPost();
  }, [username, user._id, postCallState]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
