import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { Button, ScrollView, Text, TouchableOpacity, View, Linking } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import AnchorButton from '../../components/anchorButton';
import Accordion from 'react-native-collapsible/Accordion';
import { Divider, FormInput, ListItem } from 'react-native-elements';

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
      text: ''
    };
  }

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
      deleteFile(fileKey);
    }
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

  render() {
    const { accessCode, files, isHost } = this.props;

    return (
      <View style={styles.container}>
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
          onPress={this._handleGetFiles}
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
  files: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  accessCode: state.room.tokenInfo.host_token,
  isHost: state.welcome.isHost,
  ...state.files
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Files);
