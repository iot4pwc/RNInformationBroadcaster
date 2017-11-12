import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import actions from '../../actions';
import { ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import { Card, Divider, ListItem } from 'react-native-elements';
import { DBProfileAttrMap, ProfileAttributesList } from '../../constants/common';

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

  componentDidMount = () => {
    const { fetchParticipants } = this.props;
    fetchParticipants();
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.props.isThisTabOn && nextProps.isThisTabOn) {
      const { fetchParticipants } = this.props;
      fetchParticipants();
    }
  }

  _renderHeader = (participant) => {
    return (
      <View>
        <ListItem
          roundAvatar
          avatar={{uri: participant.profilePicture}}
          title={`${participant.firstName} ${participant.lastName}`}
        />
      </View>
    );
  }

  _handleAttrPress = (attr, attrVal) => {
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

  _renderContent = (participant) => {
    return (
      <View style={styles.container}>
        <Card
          containerStyle={styles.card}
          title={`${participant.firstName} ${participant.lastName}`}
          imageProps={{
            resizeMode: "cover",
            style: styles.imageStyle
          }}
          image={{uri: participant.profilePicture}}
        >
          {
            ProfileAttributesList.slice(2).map(attr => {
              if (attr === 'resumeLink' || attr === 'user_email') {
                return (
                  <TouchableOpacity onPress={this._handleAttrPress(attr, participant[attr])}>
                    <Text style={styles.title}>{DBProfileAttrMap[attr]}</Text>
                    <Text style={styles.clickableAttr}>{participant[attr]}</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View>
                    <Text style={styles.title}>{DBProfileAttrMap[attr]}</Text>
                    <Text style={styles.nonClickableAttr}>{participant[attr]}</Text>
                  </View>
                );
              }
            })
          }
        </Card>

      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Accordion 
          sections={this.props.participants}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </ScrollView>
    );
  }
}

People.propTypes = {
  isThisTabOn: PropTypes.bool.isRequired,
  fetchParticipants: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({  
  isThisTabOn: state.nav.routes[2].index === 0,
  ...state.people
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
