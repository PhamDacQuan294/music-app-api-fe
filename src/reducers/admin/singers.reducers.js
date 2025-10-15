const initialState = {
  listSingers: { singers: [], filterStatus: [], pagination: {} },  
  filter: null,
  keyword: "",
};

const singersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_SINGERS":
      return { ...state, listSingers: action.payload }; 

    case "ACTIVE_SINGERS":
      return { ...state, filter: "active" };

    case "INACTIVE_SINGERS":
      return { ...state, filter: "inactive" };

    case "RESET_STATUS_SINGERS":
      return { ...state, filter: null };

    case "SEARCH_SINGERS":
      return { ...state, keyword: action.keyword };

    case "RESET_SEARCH_SINGERS":
      return { ...state, keyword: "" };

    default:
      return state;
  }
};


export default singersReducer;
