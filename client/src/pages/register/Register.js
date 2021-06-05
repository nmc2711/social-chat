import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import axios from "axios";

import "./register.css";

export default function Register() {
  const history = useHistory();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity(
        "입력하신 패스워드가 일치하지 않습니다."
      );
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="이름"
              className="loginInput"
              ref={username}
              type="text"
              required
              minLength="2"
            />
            <input
              placeholder="이메일"
              className="loginInput"
              ref={email}
              type="email"
              required
            />
            <input
              placeholder="비밀번호"
              className="loginInput"
              ref={password}
              type="password"
              required
              minLength="6"
            />
            <input
              placeholder="비밀번호 확인"
              className="loginInput"
              ref={passwordAgain}
              type="password"
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              회원가입
            </button>
            <Link to={"/login"}>
              <button className="loginRegisterButton">
                다른계정으로 로그인
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
