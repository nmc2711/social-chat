import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={PF + user.profilePicture}
        alt="관계있는 친구들 프로필사진"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
