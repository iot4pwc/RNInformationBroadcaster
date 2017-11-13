import {REHYDRATE} from 'redux-persist/constants';
import { FILES_ACTIONS } from '../constants/actionTypes';

const initialState = {
	files: {}
}

export const files = (state = initialState, action) => {
	switch (action.type) {	
        case REHYDRATE: {
            var incoming = action.payload.profile;
            if (incoming) return {...state, ...incoming};
            return state;
        }       
		case FILES_ACTIONS.UPDATE_FILES: {
			let files;
			if (!action.files) {
				files = {};
			} else {
				files = action.files;
			}
			return {
				...state,
				files
			}
		}         		
		default: {
			return {
				...state
			};
		}
	}
};
