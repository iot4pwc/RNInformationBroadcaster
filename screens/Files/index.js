import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import AnchorButton from '../../components/anchorButton';
import Accordion from 'react-native-collapsible/Accordion';
import { CheckBox, Divider, FormInput, ListItem } from 'react-native-elements';
import ProfileForm from '../../components/form';
import {
  FilesAttributesList,
  DBFilesAttrMap,
  FilesPlaceholderMap,
  CHECKIN_COLOR,
  HOST_CHECKIN_COLOR
} from '../../constants/common';

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

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isModalVisible: false,
      file_header: '',
      file_type: '',
      file_link: '',
      uploadChecked: false
    };
  }

  formRefs = {};

  _handleGetFiles = () => {
    const { accessCode, isHost, fetchFiles } = this.props;
    let code;
    if (isHost) {
      code = accessCode;
    } else {
      code = this.state.text;
    }
    fetchFiles(code);
  }

  _renderHeader = (file) => {
    return (
      <View>
        <ListItem
          title={file[0]}
          leftIcon={{name: 'web'}}
        />
      </View>
    );
  }

  _handlePress = (attrVal) => {
    return () => {
      let url = attrVal;
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

  _handleDelete = (fileKey) => {
    return () => {
      const { deleteFile } = this.props;
      Alert.alert(
        'Removing file',
        `Are you sure to remove ${fileKey}?`,
        [
          {text: 'Yes', onPress: () => deleteFile(fileKey)},
          {text: 'No', onPress: () => console.log('Cancel Pressed')},
        ]
      );
      
    }
  }

  _handleUpload = () => {
    const { accessCode, isHost, uploadFile } = this.props;
    const {
      file_header,
      file_link,
      file_type,
    } = this.state;    

    let code;
    if (isHost) {
      code = accessCode;
    } else {
      code = this.state.text;
    }

    uploadFile(file_header, file_type, file_link, code);
    this.setState({
      ...this.state,
      isModalVisible: false,
      uploadChecked: false,
      file_link: '',
      file_type: '',
      file_header: '',
    });
  }

  _renderContent = (file) => {
    const fileInfos = Object.entries(file[1]);
    const { isHost } = this.props;

    return (
      <View style={styles.container}>
        {
          fileInfos.map(fileInfo => {
            if (isHost) {
              return (
                <View key={fileInfo[0]}>
                  <TouchableOpacity onPress={this._handlePress(fileInfo[1])}>
                    <Text style={styles.title}>{fileInfo[0]}</Text>
                    <Text style={styles.clickableAttr}>{fileInfo[1]}</Text>
                  </TouchableOpacity>
                  <Button
                    onPress={this._handleDelete(file[0])}
                    title="REMOVE FILE"
                    color="grey"
                  />      
                </View>          
              );              
            } else {
              return (
                <TouchableOpacity onPress={this._handlePress(fileInfo[1])}>
                  <Text style={styles.title}>{fileInfo[0]}</Text>
                  <Text style={styles.clickableAttr}>{fileInfo[1]}</Text>
                </TouchableOpacity>
              );                
            }
          })
        }
      </View>
    );
  }

  _toggleModal = () => {
    this.setState({
      ...this.state,
      isModalVisible: !this.state.isModalVisible
    })
  }

  _handleUploadFileChange = (key, newContent) => {
    const obj = {};
    obj[key] = newContent;
    this.setState({
      ...this.state,
      ...obj
    });
  }

  _handleUploadFileCheck = () => {
    this.setState({
      ...this.state,
      uploadChecked: !this.state.uploadChecked
    })
  }

  _checkUploadDisabled = () => {
    const {
      uploadChecked,
      file_header,
      file_type,
      file_link
    } = this.state;

    if (file_header && file_type && file_link && uploadChecked) {
      return false;
    }
    return true;
  }

  _handleUploadCancel = () => {
    this.setState({
      ...this.state,
      isModalVisible: false,
      uploadChecked: false,
      file_link: '',
      file_type: '',
      file_header: '',
    });
  }

  render() {
    const { accessCode, files, isHost } = this.props;
    const { isModalVisible } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          style={{flex: 1}}
          animationType={"slide"}
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => this._toggleModal()}
        >
          <View style={{flex: 0.8}}>
            <Text style={styles.uploadHeader}>UPLOAD FILE</Text>
            {
              FilesAttributesList.map((key, idx) => (
                <ProfileForm
                  key={idx}
                  refFunc={(ref) => {this.formRefs[idx] = ref}}
                  header={DBFilesAttrMap[key]}
                  content={this.state[key]}
                  placeholder={FilesPlaceholderMap[key]}
                  onChangeText={(newContent) => this._handleUploadFileChange(key, newContent)}
                  onSubmitEditing={() => idx < FilesAttributesList.length - 1 && this.formRefs[idx + 1].focus()}
                />              
              ))
            }
          </View>
          <View style={{flex: 0.2}}>
            <CheckBox
              title='I UNDERSTAND THE RISKS.'
              checked={this.state.uploadChecked}
              onPress={this._handleUploadFileCheck}
            />

            <Button
              onPress={this._handleUpload}
              title="Upload"
              color={CHECKIN_COLOR}
              disabled={this._checkUploadDisabled()}
            />          

            <Button
              onPress={this._handleUploadCancel}
              title="Cancel"
              color={HOST_CHECKIN_COLOR}
            />          
          </View>
        </Modal>
        <ScrollView style={styles.scrollPanel}>
          <Accordion 
            sections={Object.entries(files)}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          /> 
        </ScrollView>
        {
          isHost ? (
            <Text style={styles.accessCode}>
              {`SHARE CODE: ${accessCode}`}
            </Text>
          ) : (
            <FormInput
              style={styles.accessCodeInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              placeholder={'Input access code here'}
              placeholderTextColor={'grey'}
              inputStyle={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={'transparent'}
            />
          )
        }
        <AnchorButton
          onPress={this._handleGetFiles}
          text={'GET FILES'}
        />
        <Divider state={{backgroundColor: 'white', height: 2}}/>
        <AnchorButton
          onPress={this._toggleModal}
          text={'UPLOAD FILES'}
        />          
      </View>
    );
  }
}

Files.propTypes = {
  accessCode: PropTypes.string,
  isHost: PropTypes.bool.isRequired,
  deleteFile: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  files: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  accessCode: state.room.tokenInfo.host_token,
  isHost: state.welcome.isHost,
  ...state.files
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Files);
