import { useContext, useRef } from "react";
import { AuthContext } from "../../context/authC/AuthContext";
import { useHistory } from "react-router-dom";
import { loginCall } from "../../util/apiCalls";

import { CircularProgress } from "@material-ui/core";
import "./login.css";

export default function Login() {
  const history = useHistory();

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "로그인"
              )}
            </button>
            <span className="loginForgot">비밀번호를 잊어버리셨나요 ?</span>
            <button
              className="loginRegisterButton"
              onClick={() => history.push("/register")}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "회원가입"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
