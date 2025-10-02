export const getListSongsAction = (songs) => {
  return {
    type: "GET_LIST_SONGS",
    payload: songs,
  }
}

export const updateSongStatus = (song) => {
  return {
    type: "UPDATE_SONG_STATUS",
    payload: song
  }
}