import { asyncPostWithJson } from '../lib/wrappedAjaxCalls';
import { NavigationActions } from 'react-navigation';
import { ROOM_ACTIONS } from '../constants/actionTypes';

export const checkin = (roomId) => {
	return (dispatch, getState) => {
		dispatch({
			type: ROOM_ACTIONS.UPDATE_ROOM_ID,
			roomId: roomId
		});

		const { welcome, profile } = getState();

		payload = {
			...profile.profile,
			host_flag: welcome.isHost
		}

		const endpoint = `${roomId}/checkin`;
		asyncPostWithJson(endpoint, payload, () => {
			Alert.alert(
				'Unable to connect to the service',
				'Please try again.',
				[{
					text: 'Ok'
				}]
			);				
		}).then(responseJSON => {
			if (Object.keys(responseJSON).length === 0) {
				responseJSON['hostToken'] = '';
				responseJSON['hashedHostToken'] = '';
			}
			dispatch({
				type: ROOM_ACTIONS.UPDATE_TOKEN,
				tokenInfo: responseJSON
			})
			// TODO: navigate to new page
		})
	}
}
