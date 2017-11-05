import { WELCOME_ACTIONS } from '../constants/actionTypes';

const initialState = {
	isHost: false,
	fetchedUuidList: [],
	scannedUuidList: []
};

export const welcome = (state = initialState, action) => {
	switch (action.type) {
		case WELCOME_ACTIONS.UPDATE_UUIDS: {
			return {
				...state,
				fetchedUuidList: action.fetchedUuidList
			}
		}
		case WELCOME_ACTIONS.UPDATE_BEACONS: {
			return {
				...state,
				scannedUuidList: action.scannedUuidList
			}
		}
		case WELCOME_ACTIONS.UPDATE_HOST: {
			return {
				...state,
				isHost: action.isHost
			}
		}
		default: {
			return {
				...state
			};
		}
	}
};
