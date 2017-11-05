import { PHOTO_NUM, ProfileMap } from '../constants/common';
import { AsyncStorage, CameraRoll } from 'react-native';
import { PROFILE_ACTIONS } from '../constants/actionTypes';
import { NavigationActions } from 'react-navigation';

export const fetchProfile = () => {
	return (dispatch, getState) => {
		let profileP = loadItems();
		profileP.then((profile) => {
			dispatch(updateProfile(profile));
			if (isProfileCompleted(getState().profile)) {
				dispatch({
					type: PROFILE_ACTIONS.UPDATE_PROFILE_FLAG			
				})
			}			
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
		try {
			setItem('profilePicture', imageURL);
			dispatch(updateProfile({
				profilePicture: imageURL
			}));
		} catch (error) {
			console.log('error storing image');
		}
	}
}

const isProfileCompleted =(state) => {
	return Object.keys(ProfileMap).map(key => state[key]).filter(attr => attr != undefined).length == Object.keys(ProfileMap).length;
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
