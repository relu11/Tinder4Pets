import Cookie from "universal-cookie";
import { ADD_PET, ADD_PET_RESET, SETUP_PROFILE } from "../actionTypes";

export const setUpProfile = () => async (dispatch) => {
  const cookies = new Cookie();
  const token = cookies.get("authToken");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonRes = await res.json();
  dispatch({ type: SETUP_PROFILE, payload: { ...jsonRes } });
};

export const addPet = (petData) => async (dispatch) => {
  const cookies = new Cookie();
  const token = cookies.get("authToken");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/me/pets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPet: petData }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
  dispatch({ type: ADD_PET, payload: jsonRes });
};

export const resetAddPetState = () => ({ type: ADD_PET_RESET });
