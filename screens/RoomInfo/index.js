import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class RoomInfo extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'ROOM',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Room</Text>
      </ScrollView>
    );
  }
}

RoomInfo.propTypes = {
}

const mapStateToProps = (state) => ({
  ...state.roomInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);
