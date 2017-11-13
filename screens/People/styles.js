import { Dimensions, StyleSheet } from 'react-native';
import { CHECKIN_COLOR } from '../../constants/common';

const {width, height} = Dimensions.get('window');

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
  	width: width
  },
  imageStyle: {
  	height: 400
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    color: 'grey',
    fontWeight: "bold"
  },
  nonClickableAttr: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: 'black',
  },
  clickableAttr: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: 'cornflowerblue',
  },
  scrollPanel: {
    flex: 0.9
  }
});
