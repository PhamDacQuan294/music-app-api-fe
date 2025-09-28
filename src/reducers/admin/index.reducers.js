// reducers/index.js
import { combineReducers } from "redux";
import topicsReducer from "./topics.reducers";
import songsReducer from "./songs.reducers";

const allReducersAdmin = combineReducers({
  topics: topicsReducer, 
  songs: songsReducer
});

export default allReducersAdmin;