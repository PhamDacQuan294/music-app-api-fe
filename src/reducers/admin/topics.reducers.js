const initialState = {
  listTopics: { topics: [], filterStatus: [], pagination: {} },
  filter: null,
  keyword: "",
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_TOPICS":
      return { ...state, listTopics: action.payload };

    case "CREATE_TOPIC":
      return {
        ...state,
        listTopics: {
          ...state.listTopics,
          topics: [action.payload, ...state.listTopics.topics],
        }
      }

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

    case "CHANGE_MULTI_STATUS_TOPICS":
      const { newType, status } = action.payload;

      if (status === "delete-all") {
        return {
          ...state,
          listTopics: {
            ...state.listTopics,
            topics: newType
          },
        };
      }

      return {
        ...state,
        listTopics: {
          ...state.listTopics,
          topics: state.listTopics.topics.map((topic) => {
            const found = newType.find((t) => t._id === topic._id);

            return found ? { ...topic, ...found } : topic;
          })
        },
      };

    case "PAGINATION_TOPICS":
      return {
        ...state,
        listTopics: {
          ...state.listTopics,
          topics: action.payload.topics,
          pagination: action.payload.pagination
        }
      }
    default:
      return state;
  }
};

export default topicsReducer;
