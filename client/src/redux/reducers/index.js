import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import events from "./events";
import adoptionPets from "./adoptionPets";

export default combineReducers({ auth, user, events, adoptionPets });
