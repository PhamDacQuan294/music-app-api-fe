export const getListSongsAction = (songs) => {
  return {
    type: "GET_LIST_SONGS",
    payload: songs,
  }
}

export const updateSongStatusAction = (song) => {
  return {
    type: "UPDATE_SONG_STATUS",
    payload: song
  }
}

export const deleteSongAction = (song) => {
  return {
    type: "DELETE_SONG",
    payload: song
  }
}