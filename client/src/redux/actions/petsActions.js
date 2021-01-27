import Cookie from "universal-cookie";
import { API_URL } from "../../helpers/config";
import { CLEAR_MATCHES, SET_CURRRENT_PET, SET_MATCHES } from "../actionTypes";

export const setPetMatches = (petId) => async (dispatch) => {
  const cookies = new Cookie();
  const token = cookies.get("authToken");
  const res = await fetch(`${API_URL}/pets/${petId}/match`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
  dispatch({ type: SET_MATCHES, payload: jsonRes });
};

export const clearPetMatches = () => ({ type: CLEAR_MATCHES });

export const setCurrentPet = (petId) => ({
  type: SET_CURRRENT_PET,
  payload: { petId },
});
