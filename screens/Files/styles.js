import { Dimensions, StyleSheet } from 'react-native';
import { CHECKIN_COLOR, HOST_CHECKIN_COLOR } from '../../constants/common';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  scrollPanel: {
    flex: 0.9
  },
  accessCodeInput: {
  	marginTop: 10,
  	marginBottom: 10,
  	marginLeft: 10,
  	marginRight: 10,
  	height: 60,
  	width: width - 100,
  	borderColor: 'gray',
  	borderWidth: 2
  },
  accessCode: {
  	marginTop: 10,
  	marginBottom: 10,
  	marginLeft: 10,
  	marginRight: 10,	
  	fontSize: 24,
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	textAlign: 'center'  	
  },
  input: {
  	fontSize: 24,
  	fontWeight: 'bold',
  	color: 'black',
  	paddingBottom: 12,
  	alignSelf: 'center',
  	textAlign: 'center'
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 14,
    color: 'black'
  },
  title: {
    paddingLeft: 15,    
    marginTop: 10,
    fontSize: 18,
    color: 'grey',
    fontWeight: "bold"
  },
  clickableAttr: {
    paddingLeft: 15,    
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    color: 'cornflowerblue',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    height: 0.08 * height
  },
  uploadHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center'
  },
});
