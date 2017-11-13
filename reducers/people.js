import { PEOPLE_ACTIONS } from '../constants/actionTypes';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
	participants: []
}

export const people = (state = initialState, action) => {
	switch (action.type) {	
        case REHYDRATE: {
            var incoming = action.payload.profile;
            if (incoming) return {...state, ...incoming};
            return state;
        }        		
		case PEOPLE_ACTIONS.UPDATE_PARTICIPANTS: {
            return {
            	participants: action.participants
            };
		}
		default: {
			return {
				...state
			};
		}
	}
};
