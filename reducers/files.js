import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
	stateHolder: ''
}

export const files = (state = initialState, action) => {
	switch (action.type) {	
        case REHYDRATE: {
            var incoming = action.payload.profile;
            if (incoming) return {...state, ...incoming};
            return state;
        }        		
		default: {
			return {
				...state
			};
		}
	}
};
