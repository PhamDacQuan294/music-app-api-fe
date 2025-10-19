export const getListRolesAction = (roles) => {
  return {
    type: "GET_LIST_ROLES",
    payload: roles
  }
}