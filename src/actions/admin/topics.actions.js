export const getListTopicsAction = (topics) => {
  return {
    type: "GET_LIST_TOPICS",
    payload: topics,
  }
}
