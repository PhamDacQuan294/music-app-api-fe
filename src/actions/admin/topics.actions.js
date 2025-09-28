export const getListTopics = (topics) => {
  return {
    type: "GET_LIST_TOPICS",
    payload: topics,
  }
}