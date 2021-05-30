import { createContext, useReducer } from "react";
import PostReducer from "./PostReducer";

const INITIAL_STATE = {
  postCallState: false,
};

export const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

  return (
    <PostContext.Provider
      value={{
        postCallState: state.postCallState,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
