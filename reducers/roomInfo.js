import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
	stateHolder: ''
}

export const roomInfo = (state = initialState, action) => {
	switch (action.type) {	
		default: {
			return {
				...state
			};
		}
	}
};
