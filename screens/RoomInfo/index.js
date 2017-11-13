import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View, Text, WebView, Linking } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import AnchorButton from '../../components/anchorButton';
import Accordion from 'react-native-collapsible/Accordion';
import { Divider, ListItem } from 'react-native-elements';

class RoomInfo extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'ROOM',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  _handleCheckout = () => {
    const { checkout } = this.props;
    checkout();
  } 

  componentWillMount = () => {
    const { fetchRoomInfo } = this.props;
    fetchRoomInfo();
  }

  _handleUrlPress = (instruction) => {
    return () => {
      let url = instruction[1]['url'];
      if (!url.includes('http')) {
        url = `http://${url}`
      }
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));     
    }
  }

  _renderHeader = (instruction) => {
    icon = instruction[1]['url'] ? 'web' : 'insert-drive-file';
    onPress = icon === 'web' ? this._handleUrlPress : () => {};

    return (
      <View>
        <ListItem
          title={instruction[0]}
          leftIcon={{name: icon}}
          onPress={onPress(instruction)}
        />
      </View>
    );
  }

  _renderContent = (instruction) => {
    if (!instruction[1]['url']) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{instruction[1]['text']}</Text>
          <Divider style={styles.divider}/>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollPanel}>
          <Accordion 
            sections={Object.entries(this.props.roomInfo)}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />          
        </ScrollView>
        <AnchorButton
          onPress={this._handleCheckout}
          text={'CHECK OUT'}
        />
      </View>
    );
  }
}

RoomInfo.propTypes = {
  checkout: PropTypes.func.isRequired,
  roomInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ...state.roomInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);
