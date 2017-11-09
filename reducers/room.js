import { ROOM_ACTIONS } from '../constants/actionTypes';

const initialState = {
    roomId: '',
    tokenInfo: {}
}

export const room = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_ACTIONS.UPDATE_ROOM_ID: {
            return {
            	...state,
                roomId: action.roomId
            }
        }
        case ROOM_ACTIONS.UPDATE_TOKEN: {
            return {
                ...state,
                tokenInfo: action.tokenInfo
            }
        }
        default:
            return {
            	...state
            };
    }
}
