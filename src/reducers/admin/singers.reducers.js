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

    case "SORT_SINGERS":
      return {
        ...state,
        listSingers: {
          ...state.listSingers,
          singers: action.payload.singers
        }
      }
    
    case "CHANGE_MULTI_STATUS_SINGERS":
      const { newType, status } = action.payload;

      if (status === "delete-all") {
        return {
          ...state,
          listSingers: {
            ...state.listSingers,
            singers: newType
          },
        };
      }

      return {
        ...state,
        listSingers: {
          ...state.listSingers,
          singers: state.listSingers.singers.map((singer) => {
            const found = newType.find((t) => t._id === singer._id);

            return found ? { ...singer, ...found } : singer;
          })
        },
      };
    default:
      return state;
  }
};


export default singersReducer;
