import { PEOPLE_ACTIONS } from '../constants/actionTypes';
import { asyncGetWithJson } from '../lib/wrappedAjaxCalls';
import { Alert } from 'react-native';

export const fetchParticipants = () => {
	return (dispatch, getState) => {
		const { roomId } = getState().room;
		const endpoint = `${roomId}/getParticipants`;
		asyncGetWithJson(endpoint, {}, () => {
			Alert.alert(
				'Seems no one is here yet',
				'Come back in a moment and surprise yourself!',
				[{
					text: 'Ok'
				}]
			);				
		}).then(responseJson => {
			const participants = Object.values(responseJson).sort((a, b) => a.firstName - b.firstName);

			dispatch({
				type: PEOPLE_ACTIONS.UPDATE_PARTICIPANTS,
				participants
			});			
		})
	}
}
