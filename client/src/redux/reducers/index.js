import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import events from "./events";

export default combineReducers({ auth, user, events });
