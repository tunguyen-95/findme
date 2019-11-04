export default (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD_USER_ANSWER':
      return [...state, payload];
    default:
      return state;
  }
};
