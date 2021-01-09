import { SET_MATCHES, SET_CURRRENT_PET, CLEAR_MATCHES } from "../actionTypes";

const initialState = {
  currentPet: null,
  matches: [],
};

const petsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MATCHES: {
      const { pets } = action.payload;
      return {
        ...state,
        matches: pets,
      };
    }
    case SET_CURRRENT_PET: {
      const { petId } = action.payload;
      return {
        ...state,
        currentPet: petId,
      };
    }
    case CLEAR_MATCHES: {
      return {
        ...state,
        currentPet: null,
        matches: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default petsReducer;
