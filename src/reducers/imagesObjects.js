export default (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD_IMAGES_OBJECTS':
      return [...state, payload];
    default:
      return state;
  }
};
