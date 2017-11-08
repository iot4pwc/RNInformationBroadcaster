import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Modal,
  View
} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  render() {
    const { isLoading } = this.props;

    return (    
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={isLoading}
        onRequestClose={() => console.log('')}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            style={{width: 300, height: 300 }}
            resizeMode="cover"
            source={require('./loading.gif')}
          />
        </View>
      </Modal>
    );
  }
}

Loading.propTypes = { isLoading: PropTypes.bool };
