export const getListAccountsAction = (acconts) => {
  return {
    type: "GET_LIST_ACCOUNTS",
    payload: acconts,
  }
}