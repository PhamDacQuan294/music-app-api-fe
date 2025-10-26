export const checkLogin = (status) => {
  return {
    type: "CHECK_LOGIN",
    status: status
  };
}

export const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: payload
  }
}

export const updateRoleAction = (newRole) => ({
  type: "UPDATE_ROLE",
  payload: newRole,
});