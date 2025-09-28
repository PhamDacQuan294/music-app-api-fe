// reducers/index.js
import { combineReducers } from "redux";
import topicsReducer from "./topics.reducers";

const allReducersAdmin = combineReducers({
  topics: topicsReducer, 
});

export default allReducersAdmin;