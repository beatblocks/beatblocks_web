import {
  SELECT_TRACK
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
  selectedTrack: '',
};

export const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TRACK:
      return {
        ...state,
        selectedTrack: state.tracks[action.payload]
      };
    default:
      return state;
  }
};
