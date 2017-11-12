import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';
import Loading from '../../components/loading';
import PropTypes from 'prop-types';

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
    const { preCheckin } = this.props;
    return () => preCheckin(isHost);
  }

  render() {
    const { isLoading } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={this._handleOnPress(false)}
          style={styles.checkin}
        >
          <Text style={styles.checkinText}>CHECKIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._handleOnPress(false)}
          style={styles.hostCheckin}
        >
          <Text style={styles.checkinText}>HOST CHECKIN</Text>
        </TouchableOpacity>        
        <View>
          <Loading isLoading={isLoading}/>
        </View>         
      </ScrollView>
    );
  }
}

Welcome.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  preCheckin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  ...state.welcome
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
