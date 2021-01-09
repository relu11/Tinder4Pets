import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import pets from "./pets";

export default combineReducers({ auth, user, pets });
