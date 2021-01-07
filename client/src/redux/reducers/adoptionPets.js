import { ADD_ADOPTION_PET, GET_ADOPTION_PETS,ADD_ADOPTION_PET_RESET,ADOPT_PET } from "../actionTypes";
const initialState = {
    adoptionPets: null,
    fetched: false,
    adoptionPetAdded: false,
  };

const adoptionPetsReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case ADD_ADOPTION_PET: {
        const { pet } = action.payload;
        
        return {
          ...state,
          adoptionPets: state.adoptionPets ? state.adoptionPets.concat(pet) : [pet],
          adoptionPetAdded: true,
        };
      }
      case ADOPT_PET: {
        const { pet } = action.payload;
        
        
        return {
          ...state,
          fetched: true
          
        };
      }
      case GET_ADOPTION_PETS: {
        const { adoptionPets} = action.payload;
        return {
          ...state,
          adoptionPets,
          fetched: true
        };
      }
      case ADD_ADOPTION_PET_RESET: {
        return {
          ...state,
          adoptionPetAdded: false,
        };
      }
      default: {
        return state;
      }
    }
  };

export default adoptionPetsReducer;