export const getListTopicsAction = (topics) => {
  return {
    type: "GET_LIST_TOPICS",
    payload: topics,
  }
}

export const createTopicAction = (topic) => {
  return {
    type: "CREATE_TOPIC",
    payload: topic
  }
}

export const updateTopicStatusAction = (topic) => {
  return {
    type: "UPDATE_TOPIC_STATUS",
    payload: topic
  }
}