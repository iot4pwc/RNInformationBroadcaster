import { WELCOME_ACTIONS } from '../constants/actionTypes';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
	isLoading: false,
	isHost: false,
	meetingRoomsList: []
};

export const welcome = (state = initialState, action) => {
	switch (action.type) {
		case REHYDRATE: {
			var incoming = action.payload.welcome;
			if (incoming) return {...state, ...incoming};
	        return state;
		}		
		case WELCOME_ACTIONS.UPDATE_MEETING_ROOMS: {
			return {
				...state,
				meetingRoomsList: action.meetingRoomsList
			}
		}
		case WELCOME_ACTIONS.UPDATE_HOST: {
			return {
				...state,
				isHost: action.isHost
			}
		}
		case WELCOME_ACTIONS.TOGGLE_LOADING: {
			const isLoading = !state.isLoading;
			return {
				...state,
				isLoading: isLoading
			}
		}		
		default: {
			return {
				...state
			};
		}
	}
};
