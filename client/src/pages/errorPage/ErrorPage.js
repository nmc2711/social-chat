import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
function ErrorPage() {
  return (
    <div className="errorWrap">
      <h2 className="errh2">일시적인 오류가 발생했습니다.</h2>
      <Link to="/">
        <button className="errbtn">돌아가기</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
