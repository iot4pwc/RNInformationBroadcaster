import { TabNavigator } from 'react-navigation';
import Welcome from '../../screens/Welcome';
import Profile from '../../screens/Profile';

export const RootTabNavigator = TabNavigator({
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
