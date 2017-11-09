import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class People extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'PEOPLE',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-people' : 'ios-people-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>people</Text>
      </ScrollView>
    );
  }
}

People.propTypes = {
}

const mapStateToProps = (state) => ({
  ...state.people
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
