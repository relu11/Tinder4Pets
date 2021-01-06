import { ADD_EVENT, GET_ALL_EVENTS,ADD_EVENT_RESET, DELETE_EVENT } from "../actionTypes";
const initialState = {
    events: null,
    fetched: false,
    eventAdded: false,
  };

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case ADD_EVENT: {
        const { event } = action.payload;
        console.log(event);
        return {
          ...state,
          events: state.events ? state.events.concat(event) : [event],
          eventAdded: true,
        };
      }
      case DELETE_EVENT: {
        const  id  = action.payload;
        return {
          ...state,
          events:state.events.filter(e => e._id != id)
        };
      }
      case GET_ALL_EVENTS: {
        const { events} = action.payload;
        return {
          ...state,
          events,
          fetched: true
        };
      }
      case ADD_EVENT_RESET: {
        return {
          ...state,
          eventAdded: false,
        };
      }
      default: {
        return state;
      }
    }
  };

export default eventsReducer;