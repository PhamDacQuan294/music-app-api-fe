export const getListSongsAction = (songs) => {
  return {
    type: "GET_LIST_SONGS",
    payload: songs,
  }
}

export const createSongAction = (song) => {
  return {
    type: "CREATE_SONG_SUCCESS",
    payload: song
  }
}