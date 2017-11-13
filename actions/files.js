import { FILES_ACTIONS } from '../constants/actionTypes';
import { asyncGetWithJson, asyncDeleteWithJson } from '../lib/wrappedAjaxCalls';
import { Alert } from 'react-native';

export const fetchFiles = (accessCode) => {
	return (dispatch, getState) => {
		const { roomId } = getState().room;
		const endpoint = `${roomId}/getFiles`;
		const payload = {
			accessCode: accessCode
		}

		asyncGetWithJson(endpoint, payload, () => {
			Alert.alert(
				'Seems no files are found',
				'Come back in a moment and surprise yourself!',
				[{
					text: 'Ok'
				}]
			);				
		}).then(files => {
			dispatch({
				type: FILES_ACTIONS.UPDATE_FILES,
				files
			});			
		})
	}
}

export const deleteFile = (fileKey) => {
	return (dispatch, getState) => {
		const payload = {
			accessCode: getState().room.tokenInfo.host_token,
			fileKey			
		}
		console.log(payload);
		const roomId = getState().room.roomId;
		const endpoint = `${roomId}/deleteFile`;

		asyncDeleteWithJson(endpoint, payload, () => {
			Alert.alert(
				'Unable to delete file',
				'Please try again.',
				[{
					text: 'Ok'
				}]
			);				
		}).then(response => {
			// TODO: refresh file
			const files = Object.assign({}, getState().files.files);
			delete files[fileKey];
			dispatch({
				type: FILES_ACTIONS.UPDATE_FILES,
				files
			});	
		});
	}
}
