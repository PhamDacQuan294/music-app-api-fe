export const searchTopics = (keyword) => {
  return {
    type: "SEARCH_TOPICS",
    keyword: keyword,
  }
}

export const resetSearchTopics = () => {
  return {
    type: "RESET_SEARCH_TOPICS",
  };
};