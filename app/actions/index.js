
export const setSong = (currentSong, position, playlist) => ({type: 'SET_SONG', currentSong: currentSong, position: position, playlist: playlist});
export const updateSongStatus = status => ({type: 'UPDATE_SONG_STATUS', status: status});
export const setUser = user => ({type: 'SET_USER', user: user});