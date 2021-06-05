import { useState, useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authC/AuthContext";

import { format } from "timeago.js";
import { putLikeToggle } from "../../util/apiCalls";

import { MoreVert } from "@material-ui/icons";
import "./post.css";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useLayoutEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const likeHandler = () => {
    // 좋아요 view 토글
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    // 좋아요 api 토글
    putLikeToggle(post._id, currentUser._id);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${post.username}`}>
              <img
                className="postProfileImg"
                src={post.profilePicture || PF + "person/noavata.png"}
                alt="피드 프로필이미지"
              />
            </Link>
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && (
            <img className="postImg" src={PF + post.img} alt="피드이미지" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + `like.png`}
              onClick={likeHandler}
              alt="좋아요하이콘"
            />
            <img
              className="likeIcon"
              src={PF + `heart.png`}
              onClick={likeHandler}
              alt="하트하이콘"
            />
            <span className="postLikeCounter">{like}명의 친구들이 좋아요</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} 답글</span>
          </div>
        </div>
      </div>
    </div>
  );
}
