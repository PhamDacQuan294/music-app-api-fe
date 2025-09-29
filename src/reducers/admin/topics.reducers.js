const initialState = {
  listTopics: [],
  filter: null, 
  keyword: "",
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_TOPICS":
      return { ...state, listTopics: action.payload };

    case "ACTIVE_TOPICS":
      return { ...state, filter: "active" };

    case "INACTIVE_TOPICS":
      return { ...state, filter: "inactive" };

    case "RESET_STATUS_TOPICS":
      return { ...state, filter: null };

    case "SEARCH_TOPICS":
      return { ...state, keyword: action.keyword };
    
    case "RESET_SEARCH_TOPICS":
      return { ...state, keyword: "" };
      
    default:
      return state;
  }
};

export default topicsReducer;
