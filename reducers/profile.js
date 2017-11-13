import { PROFILE_ACTIONS } from '../constants/actionTypes';
import { ProfileMap } from '../constants/common';
import profileHolder from '../constants/profileHolder';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
    isModalVisible: false,
    isProfileCompleted: false,
    photos: [],
    profile: {}
}

const isProfileCompleted =(state) => {
    return Object.keys(ProfileMap).map(key => state.profile[key]).filter(attr => attr).length == Object.keys(ProfileMap).length;
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            var incoming = action.payload.profile;
            if (incoming) return {...state, ...incoming};
            return state;
        }           
        case PROFILE_ACTIONS.TOGGLE_MODAL: {
        	const { isModalVisible } = state;

            return {
            	...state,
            	isModalVisible: !isModalVisible
            }
        }
        case PROFILE_ACTIONS.UPDATE_PROFILE: {
            if (action.profile.profilePicture === null) {
                action.profile.profilePicture = profileHolder;
            }

            let nextState = {
            	...state,
            	profile: { ...action.profile }
            };

            return {
                ...nextState,
                isProfileCompleted :isProfileCompleted(nextState)
            };
        }
        case PROFILE_ACTIONS.UPDATE_PHOTOS: {
            return {
            	...state,
            	photos: action.photos
            };
        }        
        default:
            return {
            	...state
            };
    }
}
