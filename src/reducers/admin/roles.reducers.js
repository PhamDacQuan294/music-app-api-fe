const initialState = {
  listRoles: { records: [] },
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_ROLES":
      return { ...state, listRoles: action.payload };
    case "DELETE_ROLE":
      return {
        ...state,
        listRoles: {
          ...state.listRoles,
          records: state.listRoles.records.filter((role) => role._id !== action.payload.id),
        }
      }
    default:
      return state;
  }
}

export default rolesReducer;