export default (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD_BREED_IMAGES':
      return payload;
    default:
      return state;
  }
};
