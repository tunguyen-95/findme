export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_BREED_STATE':
      return payload;

    default:
      return state;
  }
};
