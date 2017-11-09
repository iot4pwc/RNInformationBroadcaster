import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View } from 'react-native';
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
    return () => {
      const { checkin } = this.props;
      checkin(roomId);
    }
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
                onPress={this._handleOnPress(room[MeetingRoomAttrDBMap.roomId])}
              />
            ))
          }    
        </List>
      </ScrollView>
    );
  }
}

Rooms.propTypes = {
  meetingRoomsList: PropTypes.array.isRequired,
  checkin: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  tokenInfo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  meetingRoomsList: state.welcome.meetingRoomsList,
  ...state.room
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
