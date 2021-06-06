import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/authC/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { postConversation } from "../../util/apiCalls";

function Rightbar({ user }) {
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);

  const friendId = user && user._id;

  // 초기 팔로우 세팅
  useLayoutEffect(() => {
    if (user && user._id)
      setFollowed(currentUser.followings.includes(user?._id));
  }, [user]);

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

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const handleLinkMessenger = async () => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUser._id}/${friendId}`
      );
      // 기존 채팅방 개설유무에 따른 채팅방 신개설 있다면 기존
      if (res.data) {
        dispatch({ type: "SEND_CHATINFO", payload: res.data });
      } else {
        const messagesData = postConversation(currentUser._id, friendId);
        dispatch({ type: "SEND_CHATINFO", payload: messagesData });
      }
      setTimeout(() => {
        history.push("/messenger");
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

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
        {user.username !== currentUser.username && (
          <div className="rightbarController">
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "친구안해" : "친구해요"}
              {followed ? <Remove /> : <Add />}
            </button>
            <button
              className="rightbarFollowButton fd"
              onClick={handleLinkMessenger}
            >
              대화하기
            </button>
          </div>
        )}
        <h4 className="rightbarTitle">유저 정보</h4>
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
              <div
                className="rightbarFollowing"
                key={idx + "friend"}
                onClick={() => history.push(`/profile/${friend.username}`)}
              >
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
