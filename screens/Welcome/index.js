import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

class Welcome extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'HOME',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  _handleOnPress = (isHost) => {
    const { checkin } = this.props;
    return () => checkin(isHost);
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight onPress={this._handleOnPress(false)}>
            <Image
              resizeMode="stretch"
              style={styles.buttonView}
              source={require('./checkin.jpeg')}
            />        
          </TouchableHighlight>
          <TouchableHighlight onPress={this._handleOnPress(true)}>
            <Image
              resizeMode="stretch"
              style={styles.buttonView}
              source={require('./hostCheckin.jpeg')}
            />        
          </TouchableHighlight>         
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.welcome
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
