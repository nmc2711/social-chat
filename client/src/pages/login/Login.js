import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Yes Talk</h3>
          <span className="loginDesc">
            나만의 피드를 공유하고 소통해볼까요?
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">로그인</button>
            <span className="loginForgot">비밀번호를 잊어버리셨나요 ?</span>
            <button className="loginRegisterButton">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
