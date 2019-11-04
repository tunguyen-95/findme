export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

export const addUserAnswer = payload => {
  return {
    type: ADD_USER_ANSWER,
    payload
  };
};
