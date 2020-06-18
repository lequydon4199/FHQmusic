function player(state = null, action) {
  if (action.type === 'SET_SONG'){
    return {
      ...state,
      currentSong: action.currentSong,
      position: action.position,
      playlist: action.playlist
    }
  }
  return state;
}

const defaultStatus = {
  loopingType: 0,
  muted: false,
  playbackInstancePosition: 0,
  playbackInstanceDuration: 0,
  shouldPlay: false,
  isPlaying: false,
  isBuffering: false,
  isLoading: true,
  shouldCorrectPitch: true,
  volume: 1.0,
  rate: 1.0,
  throughEarpiece: false,
  didJustFinish: false
}

function updateSong(state = defaultStatus, action) {
  if (action.type === 'UPDATE_SONG_STATUS'){
    if (action.status){
      return {
        ...state,
        didJustFinish: action.status.didJustFinish,
        playbackInstancePosition: action.status.positionMillis,
        playbackInstanceDuration: action.status.durationMillis,
        shouldPlay: action.status.shouldPlay,
        isPlaying: action.status.isPlaying,
        isBuffering: action.status.isBuffering,
        isLoading: action.status.positionMillis === 0,
        rate: action.status.rate,
        muted: action.status.isMuted,
        volume: action.status.volume,
        loopingType: action.status.isLooping ? 1 : 0,
        shouldCorrectPitch: action.status.shouldCorrectPitch
      }
    }
  }
  return state;
}

import { defaultUser } from '../data/data';

function user(state = defaultUser, action) {
  if (action.type === 'SET_USER'){
    return {
      ...state,
      ...action.user
    };
  } 
  return state;
}

export {player, updateSong, user}
