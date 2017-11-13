import { FILES_ACTIONS } from '../constants/actionTypes';
import { asyncGetWithJson, asyncDeleteWithJson, asyncPost } from '../lib/wrappedAjaxCalls';
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

export const uploadFile = (header, type, link, token) => {
	return (dispatch, getState) => {
		const payload = {
			accessCode: token,
			file_header: header,
			file_type: type,
			file_link: link
		}
		const { roomId } = getState().room;
		const endpoint = `${roomId}/postFile`;
		asyncPost(endpoint, payload, () => {
			Alert.alert(
				'Error uploading file',
				'Please check you access code',
				[{
					text: 'Ok'
				}]
			);				
		}).then(response => {console.log(response)});		
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
			const files = Object.assign({}, getState().files.files);
			delete files[fileKey];
			dispatch({
				type: FILES_ACTIONS.UPDATE_FILES,
				files
			});	
		});
	}
}
