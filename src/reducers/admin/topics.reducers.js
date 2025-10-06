const initialState = {
  listTopics: { topics: [], filterStatus: [], pagination: {} },
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
    
    case "SORT_TOPICS":
      return {
        ...state,
        listTopics: {
          ...state.listTopics,
          topics: action.payload.topics
        }
      }
    
    case "CHANGE_MULTI_STATUS_TOPICS": {
      const { ids, status } = action.payload;

      if (status === "delete-all") {
        return {
          ...state,
          listTopics: {
            ...state.listTopics,
            topics: state.listTopics.topics.filter(
              (topic) => !ids.includes(String(topic._id))
            )
          }
        };
      }

      if (status === "change-position") {
        return {
          ...state,
          listTopics: {
            ...state.listTopics,
            topics: state.listTopics.topics.map((topic) => {
              const found = ids.find((item) => item.split("-")[0] === topic._id);
              if (found) {
                const newPos = parseInt(found.split("-")[1], 10);
                return { ...topic, position: newPos }
              }
              return topic
            })
          }
        }
      }

      return {
        ...state,
        listTopics: {
          ...state.listTopics,
          topics: state.listTopics.topics.map((topic) => (
            ids.includes(String(topic._id)) ? { ...topic, status: status } : topic
          ))
        }
      }

    }

    default:
      return state;
  }
};

export default topicsReducer;
