import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View, Text, WebView } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import AnchorButton from '../../components/anchorButton';
import Accordion from 'react-native-collapsible/Accordion';
import { ListItem } from 'react-native-elements';

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollPanel}>

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
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  ...state.roomInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);
