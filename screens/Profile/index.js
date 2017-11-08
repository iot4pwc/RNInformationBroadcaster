import actions from '../../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from './styles';
import { BackHandler } from "react-native";
import { bindActionCreators } from 'redux';
import { CHECKIN_COLOR } from '../../constants/common';
import { connect } from 'react-redux';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import ProfileForm from '../../components/form';
import { ProfileAttributesList, DBProfileAttrMap } from '../../constants/common';
import PropTypes from 'prop-types';

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

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    const { fetchProfile } = this.props;
    fetchProfile();    
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  _handleSelectPhoto = (uri) => {
    return () => {
      const { selectPhoto, toggleModal } = this.props;
      selectPhoto(uri);
      toggleModal();
    }
  }

  _handleProfileChange = (key, newContent) => {
    const { updateOneProfileAttr } = this.props;
    updateOneProfileAttr(key, newContent);
  }

  formRefs = {};

  render() {
    const {
        isModalVisible,
        photos,
        profile,
        selectPhoto,
        toggleModal
    } = this.props;

    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight onPress={toggleModal}>
          <Image
            resizeMode="cover"
            style={styles.avartar}
            source={profile.profilePicture === './profile_holder.png' ? require('./profile_holder.png') : {uri: profile.profilePicture}}
          />
        </TouchableHighlight>
        <View>
          {
            ProfileAttributesList.map((key, idx) => {
              return (
                <ProfileForm
                  key={idx}
                  refFunc={(ref) => {this.formRefs[idx] = ref}}
                  header={DBProfileAttrMap[key]}
                  content={profile[key]}
                  onChangeText={(newContent) => this._handleProfileChange(key, newContent)}
                  onSubmitEditing={() => idx < ProfileAttributesList.length - 1 && this.formRefs[idx + 1].focus()}
                />
              );
            })
          }
        </View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => toggleModal()}
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
                        style={styles.scrollImage}
                        source={{uri: photo.node.image.uri}}
                      />        
                    </TouchableHighlight>              
                  );
                })
              }
            </ScrollView>            
          </View>
        </Modal>

      </ScrollView>
    );
  }
}

Profile.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool,
  isProfileCompleted: PropTypes.bool,
  photos: PropTypes.array,
  profile: PropTypes.object,
  selectPhoto: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  updateOneProfileAttr: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  ...state.profile
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
