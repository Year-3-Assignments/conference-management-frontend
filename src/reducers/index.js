import { combineReducers } from 'redux';
import userReducer from './userReducer';
import resourceReducer from './resourceReducer';
import conferenceReducer from './conferenceReducer';
import workshopReducer from './workshopReducer';
import paymentReducer from './paymentReducer';

const allReducers = combineReducers({
  userReducer,
  resourceReducer,
  conferenceReducer,
  workshopReducer,
  paymentReducer
});

export default allReducers;