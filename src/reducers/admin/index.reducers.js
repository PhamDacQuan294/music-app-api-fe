// reducers/index.js
import { combineReducers } from "redux";
import topicsReducer from "./topics.reducers";
import songsReducer from "./songs.reducers";
import singersReducer from "./singers.reducers";
import rolesReducer from "./roles.reducers";
import accountsReducer from "./accounts.reducers";

const allReducersAdmin = combineReducers({
  topics: topicsReducer, 
  songs: songsReducer,
  singers: singersReducer,
  roles: rolesReducer,
  accounts: accountsReducer
});

export default allReducersAdmin;