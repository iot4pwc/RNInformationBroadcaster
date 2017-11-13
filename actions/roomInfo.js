import { ROOMINFO_ACTIONS } from '../constants/actionTypes';
import { asyncGetWithJson } from '../lib/wrappedAjaxCalls';
import { Alert } from 'react-native';

export const fetchRoomInfo = () => {
	return (dispatch, getState) => {
		const { roomId } = getState().room;
		const endpoint = `${roomId}/getRoomInformation`;
		asyncGetWithJson(endpoint, {}, () => {
			Alert.alert(
				'No room instructions found',
				'Contact room keeper to find instructions',
				[{
					text: 'Ok'
				}]
			);				
		}).then(roomInfo => {
			dispatch({
				type: ROOMINFO_ACTIONS.UPDATE_ROOMINFO,
				roomInfo
			});			
		})
	}
}
