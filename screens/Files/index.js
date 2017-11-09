import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Files</Text>
      </ScrollView>
    );
  }
}

Files.propTypes = {
}

const mapStateToProps = (state) => ({
  ...state.files
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Files);
