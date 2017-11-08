import { PHOTO_NUM, ProfileMap } from '../constants/common';
import { AsyncStorage, CameraRoll } from 'react-native';
import { PROFILE_ACTIONS } from '../constants/actionTypes';
import { NavigationActions } from 'react-navigation';

export const fetchProfile = () => {
	return (dispatch, getState) => {
		let profileP = loadItems();
		profileP.then(profile => {
			dispatch(updateProfile(profile));		
		})

	}
}

export const toggleModal = () => {
	return (dispatch, getState) => {
		const { isModalVisible } = getState().profile;

		if (!isModalVisible) {
			getPhotos().then(r => {
				dispatch({
					type: PROFILE_ACTIONS.UPDATE_PHOTOS,
					photos: r.edges
				});
    		})
		}
		dispatch({
			type: PROFILE_ACTIONS.TOGGLE_MODAL
		});
	}
}

export const selectPhoto = (imageURL) => {
	return (dispatch, getState) => {		
		setItem(ProfileMap['profilePicture'], imageURL);
		dispatch(updateProfile({
			profilePicture: imageURL
		}));
	}
}

export const updateOneProfileAttr = (key, value) => {
	return (dispatch, getState) => {
		setItem(ProfileMap[key], value);
		const profile = {};
		profile[key] = value;
		dispatch(updateProfile(profile));
	}
}

const updateProfile = (profile) => {
	return {
		type: PROFILE_ACTIONS.UPDATE_PROFILE,
		profile
	}
}

const getPhotos = () => {
    return CameraRoll.getPhotos({
		first: PHOTO_NUM,
		assetType: 'Photos'
    });
}

const loadItems = async () => {
	let profile = {};

	for (let entry of Object.entries(ProfileMap)) {
		const propsKey = entry[0];
		const storageKey = entry[1];
		profile[propsKey] = await loadItem(storageKey);
	}

	return profile;
}

const loadItem = async (key) => {
	try {
		return await AsyncStorage.getItem(key);
	} catch (error) {
		console.log("error retrieving key");
		return undefined;
	}
}

const setItem = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		console.log('error reading data');
	}
}
