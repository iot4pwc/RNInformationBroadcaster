import { asyncDeleteWithJson } from '../lib/wrappedAjaxCalls';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';

export const checkout = () => {
	return (dispatch, getState) => {
		const payload = {
			user_email: getState().profile.profile.user_email,
			token: getState().room.tokenInfo.host_Token
		}
		const roomId = getState().room.roomId;
		const endpoint = `${roomId}/checkout`;

		asyncDeleteWithJson(endpoint, payload, () => {
			Alert.alert(
				'Unable to checkout',
				'Please try again.',
				[{
					text: 'Ok'
				}]
			);				
		}).then(response => {
			console.log(response);
			dispatch(NavigationActions.navigate({ routeName: 'Main' }));
		});
	}
}