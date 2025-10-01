export const getListSingersAction = (singers) => {
  return {
    type: "GET_LIST_SINGERS",
    payload: singers,
  }
}
