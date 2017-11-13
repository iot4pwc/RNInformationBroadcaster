import {REHYDRATE} from 'redux-persist/constants';
import { ROOMINFO_ACTIONS } from '../constants/actionTypes';

const initialState = {
	roomInfo: {}
}

export const roomInfo = (state = initialState, action) => {
	switch (action.type) {	
        case REHYDRATE: {
            var incoming = action.payload.profile;
            if (incoming) return {...state, ...incoming};
            return state;
        }  		
		case ROOMINFO_ACTIONS.UPDATE_ROOMINFO: {
			return {
				...state,
				roomInfo: action.roomInfo
			}
		}
		default: {
			return {
				...state
			};
		}
	}
};
