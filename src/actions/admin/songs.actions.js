export const getListSongsAction = (songs) => {
  return {
    type: "GET_LIST_SONGS",
    payload: songs,
  }
}
