import React, { useEffect } from "react";
import "./toast.css";

function Toast(props) {
  const { destory, content, title, duration = 3000, id } = props;

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      destory();
    }, duration);

    return () => clearTimeout(timer);
  }, [destory, duration]);

  return (
    <div>
      <div className="toastHeader">
        <div>
          {title}
          {/*  {id} */}
        </div>
        <button onClick={destory} className="toastBtn">
          X
        </button>
      </div>
      <div className="toastBody">{content}</div>
    </div>
  );
}

// memo
const shouldReRender = (prev, next) => {
  return prev.id === next.id;
};

// 외부스테이트에 따른 불필요한 재랜더링 방지
export default React.memo(Toast, shouldReRender);
