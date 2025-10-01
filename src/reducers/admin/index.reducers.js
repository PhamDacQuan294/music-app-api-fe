// reducers/index.js
import { combineReducers } from "redux";
import topicsReducer from "./topics.reducers";
import songsReducer from "./songs.reducers";
import singersReducer from "./singers.reducers";

const allReducersAdmin = combineReducers({
  topics: topicsReducer, 
  songs: songsReducer,
  singers: singersReducer
});

export default allReducersAdmin;