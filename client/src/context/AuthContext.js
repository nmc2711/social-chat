import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "60abaa834c15ee4b0f77f2c0",
    username: "운영자황상한",
    email: "nmc27111@gmail.com",
    profilePicture:
      "https://cdn.womaneconomy.kr/news/photo/202104/102378_315046_5414.jpg",
    coverPicture:
      "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMDZfMTM3/MDAxNTUxODE0NTI0NDkz.RvXlYv6p5xPwXrOIPfABgFuiknuTn0iFZNuUguVYc_og.ii04J6D96C6FKQSXQzy9DABBNk7vNuU343nmAquhmZgg.JPEG.mong728/%EC%B4%88%EA%B3%A0%ED%99%94%EC%A7%88_%EC%BB%B4%ED%93%A8%ED%84%B0_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_(7).jpg?type=w800",
    isAdmin: true,
    followers: ["60a9f99e3724d601307c42fa"],
    followings: ["60a9f99e3724d601307c42fa"],
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
