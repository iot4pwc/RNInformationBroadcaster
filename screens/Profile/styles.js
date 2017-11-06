import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  avartar: {
    width: width,
    height: width
  },
  scrollImage: {
    width: width / 3,
    height: width / 3
  }  
})
