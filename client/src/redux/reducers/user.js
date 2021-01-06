import { ADD_PET, ADD_PET_RESET, SETUP_PROFILE } from "../actionTypes";

const initialState = {
  pets: null,
  events: null,
  adoptedPets: null,
  fetched: false,
  petAdded: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUP_PROFILE: {
      const { pets, events, adoptedPets } = action.payload;
      return {
        ...state,
        fetched: true,
        pets,
        events,
        adoptedPets,
      };
    }
    case ADD_PET: {
      const { pet } = action.payload;
      return {
        ...state,
        pets: state.pets ? state.pets.concat(pet) : [pet],
        petAdded: true,
      };
    }
    case ADD_PET_RESET: {
      return {
        ...state,
        petAdded: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
