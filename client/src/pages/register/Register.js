import "./register.css";

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Yes Talk</h3>
          <span className="loginDesc">
            나만의 피드를 공유하고 친구들과 소통해볼까요?
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="이름" className="loginInput" />
            <input placeholder="이메일" className="loginInput" />
            <input placeholder="비밀번호" className="loginInput" />
            <input placeholder="비밀번호 확인" className="loginInput" />
            <button className="loginButton">회원가입</button>
            <button className="loginRegisterButton">다른계정으로 로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}
