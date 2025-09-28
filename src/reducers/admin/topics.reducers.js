const topicsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_LIST_TOPICS":
      return action.payload;

    default:
      return state;
  }
}

export default topicsReducer;