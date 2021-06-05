export const LIST_TYPE = (loading, length) => {
  if (loading) {
    return "데이터로딩중";
  } else if (loading === false && length === 0) {
    return "데이터없음";
  } else if (loading === false && length !== 0) {
    return "조회성공";
  }
};
