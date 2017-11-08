import { StackNavigator, TabNavigator } from 'react-navigation';
import Welcome from '../../screens/Welcome';
import Profile from '../../screens/Profile';
import Rooms from '../../screens/Rooms';

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

export const RootNavigator = StackNavigator({
  Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
  },
  Rooms: {
      screen: Rooms
  }
}, {
    headerMode: 'screen',
});
