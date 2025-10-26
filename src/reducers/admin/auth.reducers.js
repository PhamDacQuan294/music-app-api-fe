const initialState = {
  login: false,
  user: null, 
  role: null,  
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return {
        ...state,
        login: action.status,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        login: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    case "UPDATE_ROLE":
      return {
        ...state,
        role: {
          ...state.role,
          ...action.payload, 
        },
      };
    default:
      return state;
  }
}

export default authReducer;