import { PEOPLE_ACTIONS } from '../constants/actionTypes';

const initialState = {
	participants: []
}

export const people = (state = initialState, action) => {
	switch (action.type) {	
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
