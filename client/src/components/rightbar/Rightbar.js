import React, { useEffect, useLayoutEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import axios from "axios";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + user._id);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user && user._id) getFriends();
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + `gift.png`} alt="" />
          <span className="birthdayText">
            <b> 3명의 친구가 생일이에요 스타벅스 쿠폰으로 혼내줄까요?</b>
          </span>
        </div>
        <img className="rightbarAd" src={PF + `iu.jpeg`} alt="" />
        <h4 className="rightbarTitle">접속중인 친구들</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">나의 정보</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">
              {user.city ?? "아직 미입력 !"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">
              {user.from ?? "아직 미입력 !"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "애인이 필요해 ㅠ"
                : user.relationship === 2
                ? "연애중"
                : user.relationship === 3
                ? "결혼했어요"
                : "비공개"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">관련된 사람들</h4>
        <div className="rightbarFollowings">
          {friends.map((friend, idx) => {
            return (
              <div className="rightbarFollowing" key={idx + "friend"}>
                <img
                  src={friend.profilePicture || PF + "person/noavata.png"}
                  alt="친구 프로필 사진"
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
