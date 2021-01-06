import Cookie from "universal-cookie";
import {
  SET_USER,
  REMOVE_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  NOT_LOGGED_IN,
  CLEAR_USER,
} from "../actionTypes";

const initialState = {
  isLoggedIn: null,
  currentUser: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        currentUser: user,
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
      };
    }
    case AUTH_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case CLEAR_AUTH_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case NOT_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case CLEAR_USER: {
      const cookie = new Cookie();
      cookie.remove("authToken");
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
