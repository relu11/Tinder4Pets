import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import pets from "./pets";
import events from "./events";
import adoptionPets from "./adoptionPets";

export default combineReducers({ auth, user, pets, events, adoptionPets });
