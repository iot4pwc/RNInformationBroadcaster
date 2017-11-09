import { Dimensions, StyleSheet } from 'react-native';
import { HOST_CHECKIN_COLOR } from '../../constants/common';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0
  },
  card: {
  	marginTop: 0,
  	width: Dimensions.get('window').width
  },
  imageStyle: {
  	height: 400
  },
  divider: {
  	backgroundColor: HOST_CHECKIN_COLOR,
  	height: 7
  }
});
