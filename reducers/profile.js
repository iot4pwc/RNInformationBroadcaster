import { PROFILE_ACTIONS } from '../constants/actionTypes';

const initialState = {
    company: '',
    dateOfBirth: '',
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
            if (!action.profile.profilePicture) {
                action.profile.profilePicture = './profile_holder.png';
            }

            return {
            	...state,
            	...action.profile
            }
        }
        case PROFILE_ACTIONS.UPDATE_PROFILE_FLAG: {
            return {
            	...state,
            	isProfileCompleted: true
            }
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
