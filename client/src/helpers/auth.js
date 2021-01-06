import Cookie from "universal-cookie";
import jwt from "jsonwebtoken";
import { initLoggedInState, setUser } from "../redux/actions/authActions";
import store from "../redux/store";

export const initAuth = () => {
  const cookies = new Cookie();
  const token = cookies.get("authToken");
  if (token) {
    const user = jwt.decode(token);
    if (user) {
      store.dispatch(setUser(user));
    } else {
      store.dispatch(initLoggedInState());
    }
  } else {
    store.dispatch(initLoggedInState());
  }
};
