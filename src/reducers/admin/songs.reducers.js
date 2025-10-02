const initialState = {
  listSongs: [],  
  filter: null,
  keyword: "",
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_SONGS":
      return { ...state, listSongs: action.payload }; 

    case "ACTIVE_SONGS":
      return { ...state, filter: "active" };

    case "INACTIVE_SONGS":
      return { ...state, filter: "inactive" };

    case "RESET_STATUS_SONGS":
      return { ...state, filter: null };

    case "SEARCH_SONGS":
      return { ...state, keyword: action.keyword };

    case "RESET_SEARCH_SONGS":
      return { ...state, keyword: "" };

    default:
      return state;
  }
};


export default songsReducer;
