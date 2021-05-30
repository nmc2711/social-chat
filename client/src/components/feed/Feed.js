import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  const [post, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(async () => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(res.data);
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
