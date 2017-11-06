import { WELCOME_ACTIONS } from '../constants/actionTypes';
import { BleManager } from 'react-native-ble-plx';
import { NavigationActions } from 'react-navigation';
import { Alert, AsyncStorage, CameraRoll } from 'react-native';

export const checkin = (isHost) => {
	return (dispatch, getState) => {
		if (getState().profile.isProfileCompleted) {
			const { fetchedUuidList } = getState().welcome;
			const beaconList = scanBeacons(fetchedUuidList);
			dispatch(updateBeacons(beaconList));
			dispatch(updateHost(isHost));
			// navigate to room selection
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
	}
}

const scanBeacons = (fetchedUuidList) => {
	const bleManager = new BleManager();
	const beaconSet = new Set();
	let stop = false;
    bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            return [];
        }
        
        // TODO: figure out when to stop
        stop = true
        if (fetchedUuidList.includes(device.id)) {
          beaconSet.add(device.id);
          // TODO: stop scanning when done
          if (stop) {
          	bleManager.stopDeviceScan();	
          }
        }
    });	
    return Array.from(beaconSet);
}

const updateBeacons = (scannedUuidList) => {
	return {
		type: WELCOME_ACTIONS.UPDATE_BEACONS,
		scannedUuidList
	}
}

const updateHost = (isHost) => {
	return {
		type: WELCOME_ACTIONS.UPDATE_HOST,
		isHost
	}
}
