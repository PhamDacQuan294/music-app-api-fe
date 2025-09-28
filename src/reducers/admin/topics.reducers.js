const initialState = {
  list: [],
  filter: null, 
  keyword: "",
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_TOPICS":
      return { ...state, list: action.payload };

    case "ACTIVE":
      return { ...state, filter: "active" };

    case "INACTIVE":
      return { ...state, filter: "inactive" };

    case "RESET_STATUS":
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
