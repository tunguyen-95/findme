import { GAME_URL, GAME_ONE_OPTIONS } from '../actions';

const initialState = { url: '', correctAnswer: '', option: '' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME_URL:
      return {
        ...state,
        url: payload.url,
        correctAnswer: payload.correctAnswer
      };

    case GAME_ONE_OPTIONS:
      return { ...state, option: payload };

    default:
      return state;
  }
};
