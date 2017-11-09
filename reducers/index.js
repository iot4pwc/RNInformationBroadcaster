import * as files from './files';
import * as nav from './nav';
import * as people from './people';
import * as profile from './profile';
import * as room from './room';
import * as roomInfo from './roomInfo';
import * as welcome from './welcome';
import { combineReducers } from 'redux';

export default combineReducers(Object.assign(
	files,
	nav,
	people,
	profile,
	room,
	roomInfo,
	welcome
));
