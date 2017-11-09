import { WELCOME_ACTIONS } from '../constants/actionTypes';
import { asyncGetWithJson } from '../lib/wrappedAjaxCalls';
import { BleManager } from 'react-native-ble-plx';
import { NavigationActions } from 'react-navigation';
import { Alert, AsyncStorage, CameraRoll } from 'react-native';

export const preCheckin = (isHost) => {
	return (dispatch, getState) => {
		if (getState().profile.isProfileCompleted) {
			dispatch({ type: WELCOME_ACTIONS.TOGGLE_LOADING });
			scanBeacons((sortedUuidList) => fetchMeetingRoom(sortedUuidList, dispatch).then(responseJson => {
				dispatch({
					type: WELCOME_ACTIONS.UPDATE_MEETING_ROOMS,
					meetingRoomsList: responseJson.result
				});				
				dispatch(NavigationActions.navigate({ routeName: 'Rooms' }));
				dispatch({ type: WELCOME_ACTIONS.TOGGLE_LOADING });
			}));
		} else {
			Alert.alert(
				'Incomplete Profile',
				'You must have a complete profile to check in to meetings.',
				[{
					text: 'Ok I\'ll do it now!',
					onPress: () => 	dispatch(NavigationActions.navigate({
						routeName: 'Profile'
					}))
				}]
			);
		}
		dispatch(updateHost(isHost));
	}
}

const fetchMeetingRoom = (sortedUuidList, dispatch) => {
	try {
		return asyncGetWithJson('mapUUIDs', {
			uuid: sortedUuidList.join(',')
		}, () => {
			dispatch({ type: WELCOME_ACTIONS.TOGGLE_LOADING });
			Alert.alert(
				'No meeting rooms found',
				'Please find the room beacon and try again.',
				[{
					text: 'Ok'
				}]
			);				
		});
	} catch (error) {
		console.err(error);
	}
}

const scanBeacons = (callback) => {
	const bleManager = new BleManager();
	let stop = false;
	let beaconRssiMap = {}

    bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            return [];
        }

        // stop policy is set to when a beacon is discovered twice
        stop = Object.values(beaconRssiMap).map(rssiArr => rssiArr.length).some((ele, idx, arr) => ele > 1);
		if (stop) {
			bleManager.stopDeviceScan();

			const average = arr => arr.reduce(( p, c ) => p + c, 0 ) / arr.length;
		    const ret = Object.entries(beaconRssiMap).map(([uuid, rssiArr]) => [uuid, average(rssiArr)]).sort((a, b) => b[1] - a[1]);
		    const sortedUuidList = ret.map(r => r[0]);
		    callback(sortedUuidList);
		} else {
	        if (device.name && device.name.includes('udooneo')) {
	            if (device.id in beaconRssiMap) {
	            	beaconRssiMap[device.id].push(device.rssi);
	            } else {
	            	beaconRssiMap[device.id] = [device.rssi];
	            }
	        }			
		}
    });
}



const updateMeetingRooms = (meetingRoomsList) => {
	return {
		type: WELCOME_ACTIONS.UPDATE_MEETING_ROOMS,
		meetingRoomsList
	}
}

const updateHost = (isHost) => {
	return {
		type: WELCOME_ACTIONS.UPDATE_HOST,
		isHost
	}
}
