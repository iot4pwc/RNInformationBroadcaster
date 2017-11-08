import { PROFILE_ACTIONS } from '../constants/actionTypes';
import { ProfileMap } from '../constants/common';

const initialState = {
    company: '',
    age: '',
    firstName: '',
    isModalVisible: false,
    isProfileCompleted: false,
    lastName: '',
    photos: [],
    position: '',
    profilePicture: './profile_holder.png',
    resumeLink: '',
    user_email: ''	
}

const isProfileCompleted =(state) => {
    return Object.keys(ProfileMap).map(key => state[key]).filter(attr => attr).length == Object.keys(ProfileMap).length;
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_ACTIONS.TOGGLE_MODAL: {
        	const { isModalVisible } = state;

            return {
            	...state,
            	isModalVisible: !isModalVisible
            }
        }
        case PROFILE_ACTIONS.UPDATE_PROFILE: {
            if (action.profile.profilePicture === null) {
                action.profile.profilePicture = './profile_holder.png';
            }

            let nextState = {
            	...state,
            	...action.profile
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
