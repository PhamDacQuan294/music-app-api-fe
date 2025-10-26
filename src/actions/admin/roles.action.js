export const getListRolesAction = (roles) => {
  return {
    type: "GET_LIST_ROLES",
    payload: roles
  }
}

export const deleteRoleAction = (role) => {
  return {
    type: "DELETE_ROLE",
    payload: role
  }
}