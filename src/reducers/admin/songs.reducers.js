const initialState = {
  listSongs: { songs: [], filterStatus: [], pagination: {} },
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

    case "UPDATE_SONG_STATUS":
      return {
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: state.listSongs.songs.map((song) =>
            song._id === action.payload.id ? { ...song, status: action.payload.status } : song
          ),
        },
      };

    case "DELETE_SONG":
      return {
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: state.listSongs.songs.filter((song) => song._id !== action.payload.id),
        }
      }
    case "EDIT_SONG":
      return {
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: state.listSongs.songs.map((song) => (
            song._id === action.payload.song._id ? { ...song, ...action.payload.song } : song
          ))
        }
      }
    case "CHANGE_MULTI_STATUS_SONGS": {
      const { ids, status } = action.payload;
      
      // Nếu xoá nhiều bản ghi -> lọc ra khỏi state
      if (status === "delete-all") {
        return {
          ...state,
          listSongs: {
            ...state.listSongs,
            songs: state.listSongs.songs.filter(
              (song) => !ids.includes(String(song._id))
            ),
          },
        };
      }

      if (status=== "change-position") {
        return {
          ...state,
          listSongs: {
            ...state.listSongs,
            songs: state.listSongs.songs.map((song) => {
              const found = ids.find((item) => item.split("-")[0] === song._id);
              if (found) {
                const newPos = parseInt(found.split("-")[1], 10);
                return { ...song, position: newPos }
              }
              return song;
            })
          }
        }
      }

      // Trường hợp mặc định: thay đổi status (active / inactive)
      return {
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: state.listSongs.songs.map((song) =>
            ids.includes(String(song._id))
              ? { ...song, status: status }
              : song
          ),
        },
      };
    }

    case "PAGINATION_SONGS": 
      return { 
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: action.payload.songs,
          pagination: action.payload.pagination
        }
      }
    
    case "SORT_SONGS":
      return {
        ...state,
        listSongs: {
          ...state.listSongs,
          songs: action.payload.songs
        }
      }
    default:
      return state;
  }
};


export default songsReducer;
