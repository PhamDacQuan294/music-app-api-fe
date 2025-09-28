export const searchAction = (keyword, type) => {
  const typeUpper = type.toUpperCase(); // chuyển type sang in hoa
  return {
    type: `SEARCH_${typeUpper}`,
    keyword: keyword,
  };
};

export const resetSearchAction = (type) => {
  const typeUpper = type.toUpperCase();
  return {
    type: `RESET_SEARCH_${typeUpper}`,
  };
};
