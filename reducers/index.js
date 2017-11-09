import { combineReducers } from 'redux';
import * as profile from './profile';
import * as nav from './nav';
import * as welcome from './welcome';
import * as room from './room';

export default combineReducers(Object.assign(
	profile,
	nav,
	room,
	welcome
));
