import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import { MeetingRoomAttrDBMap } from '../../constants/common';

class Rooms extends React.Component {
  static navigationOptions = {
    title: 'SELECT A ROOM',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center'
    },    
    headerRight: (<View></View>)
  }

  _handleOnPress = (roomId) => {
    // TODO: figure out what to do
  }

  render() {
    const { meetingRoomsList } = this.props;


    return (
      <ScrollView style={styles.container}>
        <List>
          {
            meetingRoomsList.map(room => (
              <ListItem
                key={room[MeetingRoomAttrDBMap.roomId]}
                title={room[MeetingRoomAttrDBMap.roomName]}
                leftIcon={{name: 'av-timer'}}
                titleStyle={styles.title}
              />
            ))
          }    
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.welcome
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
