const { SET_USER, REMOVE_USER } = require("../actionTypes");

const initialState = {
  isLoggedIn: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      }
    }
    case REMOVE_USER: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    }
    default:
      return state;
  }
}

export default authReducer;