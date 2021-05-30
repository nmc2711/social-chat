import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Yes Talk</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            placeholder="사용자 또는 게시물을 검색해주세요."
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">홈페이지</span>
          <span className="topbarLink">타임라인</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        {/* 프로필사진 */}
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || PF + "person/noavata.png"}
            alt="임시프로필이미지"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
