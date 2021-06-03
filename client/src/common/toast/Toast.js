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
      <div className="toast-header">
        <div>
          {title} {id}
        </div>
        <button onClick={destory}>X</button>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  );
}

const shouldReRender = (prev, next) => {
  return prev.id === next.id;
};
// 아이디 재호출 ㄴ
export default React.memo(Toast, shouldReRender);
