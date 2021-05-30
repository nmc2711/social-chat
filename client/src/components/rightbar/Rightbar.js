import React from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user);
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
          <div className="rightbarFollowing">
            <img
              src={PF + `person/1.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">신태수</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/2.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">홍순명</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/3.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">김현수</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/4.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">임보람</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/5.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">이은비</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/6.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">황진영</span>
          </div>
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
