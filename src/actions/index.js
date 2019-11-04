import randomIndex from '../components/randomIndex';
import request from 'superagent';

export const GAME_URL = 'GAME_URL';
export const gameUrl = payload => ({
  type: GAME_URL,
  payload
});

export const GAME_ONE_OPTIONS = 'GAME_ONE_OPTIONS';
export const addGameOneOptions = () => (dispatch, getState) => {
  const state = getState();

  let arrayOfDogs = [];

  const length = state.difficulty * 3;

  while (length > arrayOfDogs.length) {
    const index = randomIndex(state.breeds.length),
      dog = state.breeds[index];

    if (!arrayOfDogs.includes(dog)) arrayOfDogs.push(dog);
  }

  dispatch({
    type: GAME_ONE_OPTIONS,
    payload: arrayOfDogs
  });
};

export const addAdditionBreeds = () => (dispatch, getState) => {
  const state = getState();

  let arrayOfDogs = state.game.option;

  const length = state.difficulty * 3;
  if (arrayOfDogs.length < 70) {
    while (length > arrayOfDogs.length) {
      const index = randomIndex(state.breeds.length),
        dog = state.breeds[index];

      if (!arrayOfDogs.includes(dog)) arrayOfDogs.push(dog);
    }

    dispatch({
      type: GAME_ONE_OPTIONS,
      payload: arrayOfDogs
    });
  }
};

export const setBreedState = () => {
  return function(dispatch, getState) {
    if (getState().breeds.length === 0) {
      return request
        .get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          dispatch({
            type: 'SET_BREED_STATE',
            payload: Object.keys(response.body.message)
          });
        })
        .catch(console.error);
    }
  };
};
