import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import AnchorButton from '../../components/anchorButton';

class Files extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'FILES',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-filing' : 'ios-filing-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  _handleCheckout = () => {
    const { checkout } = this.props;
    checkout();
  } 

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollPanel}>
          <Text>Files</Text>
        </ScrollView>
        <AnchorButton
          onPress={this._handleCheckout}
          text={'CHECK OUT'}
        />
      </View>
    );
  }
}

Files.propTypes = {
}

const mapStateToProps = (state) => ({
  isThisTabOn: state.nav.routes[2].index === 1,
  ...state.files
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Files);
