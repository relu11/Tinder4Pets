import Cookie from "universal-cookie";
import { ADD_EVENT, GET_ALL_EVENTS,ADD_EVENT_RESET, DELETE_EVENT } from "../actionTypes";

export const addEvent = (eventData) => async (dispatch) => {
    console.log(eventData);
    const cookies = new Cookie();
    const token = cookies.get("authToken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEvent: eventData }),
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: ADD_EVENT, payload: jsonRes });
  };
  export const deleteEvent = (eventID) => async (dispatch) => {
    console.log(eventID);
    const cookies = new Cookie();
    const token = cookies.get("authToken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: DELETE_EVENT, payload: eventID });
  };
  export const getAllEvents = () => async (dispatch) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
      method: "GET",
      headers: {
        
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
    dispatch({ type: GET_ALL_EVENTS, payload: {...jsonRes} });
  };

  export const resetAddEventState = () => ({ type: ADD_EVENT_RESET });