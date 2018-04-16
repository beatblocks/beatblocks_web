import {
  SELECT_TRACK,
  NEXT_TRACK,
  SELECT_ALBUM
} from '../actions';
import album from '../assests/albumexample.jpeg';
import around from '../assests/sounds/around.mp3';
import chance from '../assests/sounds/chance.mp3';
import dawn from '../assests/sounds/dawn.mp3';

const tracks = [
  {
    title: 'around',
    mp3: around,
    metadata: {
      duration: '12:00'
    }
  },
  {
    title: 'chance',
    mp3: chance,
    metadata: {
      duration: '12:00'
    }
  },
  {
    title: 'dawn',
    mp3: dawn,
    metadata: {
      duration: '12:00'
    }
  },
];

const initialState = {
  title: 'We are the Best',
  artist: 'The Bois',
  img: album,
  releaseYear: '2018',
  tracks,
  playQueue: [],
  selectedTrack: '',
  subscribed: true
};

export const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ALBUM:
      return {
        ...state,
        title: action.payload.title,
        artist: action.payload.img,
        releaseYear: action.payload.releaseYear,
        tracks: action.payload.tracks,
      };
    case SELECT_TRACK:
      return {
        ...state,
        selectedTrack: state.tracks[action.payload],
        playQueue: state.tracks.slice(action.payload + 1, state.tracks.length)
      };
    case NEXT_TRACK:
      return {
        ...state,
        selectedTrack: state.playQueue[0],
        playQueue: state.playQueue.slice(1, state.playQueue.length)
      };
    default:
      return state;
  }
};
