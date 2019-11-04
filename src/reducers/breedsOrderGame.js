import { BREED_ORDER } from '../actions/BreedOrder';

export default (state = [], { type, payload }) => {
  switch (type) {
    case BREED_ORDER:
      return [...state, payload];

    default:
      return state;
  }
};
