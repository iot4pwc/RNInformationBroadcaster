import { Dimensions, StyleSheet } from 'react-native';
import { CHECKIN_COLOR } from '../constants/common';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class AnchorButton extends React.Component {
  render() {
    const { text, onPress } = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>      
    );
  }
}

AnchorButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  button: {
    height: 0.08 * height,
    width: width,
    backgroundColor: CHECKIN_COLOR,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 26,
    fontWeight: '500',
    color: 'white'
  }  
});
