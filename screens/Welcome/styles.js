import { Dimensions, StyleSheet } from 'react-native';
import { CHECKIN_COLOR, HOST_CHECKIN_COLOR } from '../../constants/common';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  hostCheckin: {
    height: (height - 50) / 2,
    width: width,
    backgroundColor: HOST_CHECKIN_COLOR,
    flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
  },
  checkin: {
    height: (height - 50) / 2,
    width: width,
    backgroundColor: CHECKIN_COLOR,
    flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
  },
  checkinText: {
  	fontSize: 26,
  	fontWeight: '500',
  	color: 'white'
  }
});
