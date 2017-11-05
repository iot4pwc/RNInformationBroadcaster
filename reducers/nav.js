import { RootTabNavigator } from '../components/nav';

const initialState = RootTabNavigator.router.getStateForAction(RootTabNavigator.router.getActionForPathAndParams('Home'));

export const nav = (state = initialState, action) => {
  const nextState = RootTabNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
