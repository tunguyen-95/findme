import { combineReducers } from 'redux';
import breeds from './breeds';
import imagesDetails from './imagesDetails';
import userAnswers from './userAnswers';
import imagesObjects from './imagesObjects';
import difficulty from './difficulty';
import game from './gameOne';
import breedsAlreadySeen from './breedsOrderGame';

export default combineReducers({
  breeds,
  imagesDetails,
  userAnswers,
  imagesObjects,
  game,
  breedsAlreadySeen,
  difficulty
});
