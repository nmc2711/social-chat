const PostReducer = (state, action) => {
  switch (action.type) {
    case "POST_UPLOAD":
      return {
        postCallState: action.payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
