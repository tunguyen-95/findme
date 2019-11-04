import { SET_DIFFICULTY } from '../actions/setDifficulty';
import { ADD_DIFFICULTY } from '../actions/addDifficulty';

export default (state = 1, { type, payload }) => {
  switch (type) {
    case SET_DIFFICULTY:
      return payload;
    case ADD_DIFFICULTY:
      return parseInt(state) + parseInt(payload);
    default:
      return state;
  }
};
