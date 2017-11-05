import { combineReducers } from 'redux';
import * as profile from './profile';
import * as nav from './nav';
import * as welcome from './welcome';

export default combineReducers(Object.assign(
	profile,
	nav,
	welcome
));
