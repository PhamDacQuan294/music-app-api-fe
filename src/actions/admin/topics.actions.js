export const getListTopicsAction = (topics) => {
  return {
    type: "GET_LIST_TOPICS",
    payload: topics,
  }
}

export const createTopic = (topic) => {
  return {
    type: "CREATE_TOPIC",
    payload: topic
  }
}