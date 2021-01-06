import Cookies from "universal-cookie";
import {
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_USER,
  NOT_LOGGED_IN,
  SET_USER,
} from "../actionTypes";

export const login = (userData) => async (dispatch) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.headers.get("authToken"));
  const jsonRes = await res.json();
  console.log(jsonRes);
  if (jsonRes.success) {
    const cookies = new Cookies();
    cookies.set("authToken", jsonRes.token, {
      maxAge: 1000 * 60 * 60 * 30,
      httpOnly: false,
    });
    dispatch({ type: SET_USER, payload: { user: jsonRes.user } });
  } else if (res.status >= 400 && res.status < 500 && jsonRes.message) {
    dispatch({ type: AUTH_ERROR, payload: { error: jsonRes.message } });
  } else {
    dispatch({ type: AUTH_ERROR, payload: { error: "unexpected" } });
  }
};

export const signup = (userData) => async (dispatch) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonRes = await res.json();
  if (jsonRes.success) {
    const cookies = new Cookies();
    cookies.set("authToken", jsonRes.token);
    dispatch({ type: SET_USER, payload: { user: jsonRes.user } });
  } else if (res.status >= 400 && res.status < 500 && jsonRes.message) {
    dispatch({ type: AUTH_ERROR, payload: { error: jsonRes.message } });
  } else {
    dispatch({ type: AUTH_ERROR, payload: { error: "unexpected" } });
  }
};

export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });

export const setUser = (user) => ({ type: SET_USER, payload: { user } });

export const initLoggedInState = () => ({ type: NOT_LOGGED_IN });

export const logout = () => ({ type: CLEAR_USER });
