const initialState = {
  listRoles: { roles: [] }
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_ROLES":
      return { ...state, listRoles: action.payload };
    default:
      return state;
  }
}

export default rolesReducer;