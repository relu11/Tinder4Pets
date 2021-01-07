import Cookie from "universal-cookie";
import { ADD_ADOPTION_PET, GET_ADOPTION_PETS,ADD_ADOPTION_PET_RESET,ADOPT_PET } from "../actionTypes";

export const addAdoptionPet = (adoptionPetData) => async (dispatch) => {
    console.log(adoptionPetData);
    const cookies = new Cookie();
    const token = cookies.get("authToken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/pets/adoption`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pet: adoptionPetData }),
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: ADD_ADOPTION_PET, payload: jsonRes });
  };
  export const adoptPet = (petID) => async (dispatch) => {
    console.log(petID);
    const cookies = new Cookie();
    const token = cookies.get("authToken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/pets/adoption/${petID}/adopt`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: ADOPT_PET, payload: jsonRes });
  };
  export const getAdoptionPets = () => async (dispatch) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/pets/adoption`, {
      method: "GET",
      headers: {
        
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: GET_ADOPTION_PETS, payload: {...jsonRes} });
  };

  export const resetAddAdoptionPetState = () => ({ type: ADD_ADOPTION_PET_RESET });