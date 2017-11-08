import { RootNavigator } from '../components/nav';

export const nav = (state, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
