import React from 'react';
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { RootNavigator } from './components/nav';

class App extends React.Component {
  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }	

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0 || nav.index === 2 && nav.routes[2].index === 0) {
      return true;
    }    
    dispatch(NavigationActions.back());
    return true;
  };  

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });

    return (
      <RootNavigator navigation={navigation} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
