export const ADD_DIFFICULTY = 'ADD_DIFFICULTY';

export const addDifficulty = payload => {
  return {
    type: ADD_DIFFICULTY,
    payload
  };
};
