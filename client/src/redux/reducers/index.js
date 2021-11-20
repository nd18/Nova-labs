import { combineReducers } from 'redux';
import user from './user';
import availableSlots from './availableSlots';
import appointment from './appointment';

export default combineReducers({
  user,
  availableSlots,
  appointment
});
