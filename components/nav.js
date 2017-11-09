import Files from '../screens/Files';
import People from '../screens/People';
import Profile from '../screens/Profile';
import RoomInfo from '../screens/RoomInfo';
import Rooms from '../screens/Rooms';
import Welcome from '../screens/Welcome';
import { StackNavigator, TabNavigator } from 'react-navigation';

MainTabNavigator = TabNavigator({
  Home: {
    screen: Welcome,
  },
  Profile: {
    screen: Profile,
  },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    showIcon: true,
    style: {
        backgroundColor: 'white',
    }
  },
});

SecondaryTabNavigator = TabNavigator({
  People: {
    screen: People,
  },
  Files: {
    screen: Files,
  },    
  Room: {
    screen: RoomInfo,
  }
}, {
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    showIcon: true,
    style: {
        backgroundColor: 'white',
    }
  },
});

export const RootNavigator = StackNavigator({
  Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
  },
  Rooms: {
      screen: Rooms
  },
  Meeting: {
      screen: SecondaryTabNavigator,
      navigationOptions: {
        header: null
      }      
  }  
}, {
    headerMode: 'screen',
});
