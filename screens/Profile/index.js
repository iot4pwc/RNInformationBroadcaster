import Ionicons from 'react-native-vector-icons/Ionicons';
import { CHECKIN_COLOR } from '../../constants/common';
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import styles from './styles';
import { BackHandler } from "react-native";

class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'PROFILE',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  componentWillMount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  onBackPress = () => {
    const { toggleModal, isModalVisible } = this.props;
    if (isModalVisible) {
      console.log('off');
      toggleModal();
    }
  }

  _handleSelectPhoto = (uri) => {
    return () => {
      const { selectPhoto, toggleModal } = this.props;
      selectPhoto(uri);
      toggleModal();
    }
  }

  render() {
    const {
        isModalVisible,
        photos,
        profilePicture,
        selectPhoto,
        toggleModal
    } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={toggleModal}>
          <Image
            resizeMode="cover"
            style={{
              width: width,
              height: width
            }}
            source={profilePicture === './profile_holder.png' ? require('./profile_holder.png') : {uri: profilePicture}}
          />
        </TouchableHighlight>    
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>          
            <Button
              title='Close'
              onPress={toggleModal}
              color={CHECKIN_COLOR}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
              {
                photos.map((photo, idx) => {
                  return (
                    <TouchableHighlight
                      onPress={this._handleSelectPhoto(photo.node.image.uri)}
                      key={idx}
                    >
                      <Image
                        style={{
                          width: width/3,
                          height: width/3
                        }}
                        source={{uri: photo.node.image.uri}}
                      />        
                    </TouchableHighlight>              
                  );
                })
              }
            </ScrollView>            
          </View>
        </Modal>

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.profile
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
