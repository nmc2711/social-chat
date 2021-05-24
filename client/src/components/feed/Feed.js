import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";


function Feed() {
  const [post,setPosts] = useState([]);

  useEffect(async() => {
    const res = await axios.get("posts/timeline/60a9f99e3724d601307c42fa");
    console.log(res)
  }, [])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}

export default Feed;
