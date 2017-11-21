# RNInformationBroadcaster
The front end for Information Broadcaster, based on React Native (https://facebook.github.io/react-native/). Currently only Android devises are supported. Additioanl configuration of Bluetooth needs to be done to make it compatible with IOS.

# Setting up app
Install React Native according to https://facebook.github.io/react-native/docs/getting-started.html.

Install yarn package controll tool https://yarnpkg.com/

Install the node modules by running:
```yarn install```

Start Android App:
```react-native run-android```

Make sure the debugging mode of the Android device is on.

# Generate .apk file
Follow the instructions on https://facebook.github.io/react-native/docs/signed-apk-android.html

# Prerequisites for the project
You need to be familiar with React (https://reactjs.org/), Redux (https://redux.js.org/), ES6 and all the libraries listed in the package.json.

# Code Structure
actions: actions directory will contain all the action creators that are wrapped in a Redux-thunk form, please refer to Redux-thunk (https://github.com/gaearon/redux-thunk) for more information

reducers: reducers directory includes all the reducers that will handle the actions emitted by the actions. Refer to redux documentation to learn more.

screens: the UI that will be displayed to the user. All the components are React native components (with a few exceptions of react-native-elements components, refer to https://github.com/react-native-training/react-native-elements to learn more). Each screen is linked to the redux store by the connect method that will link the state and actions to a screens props.

components: where custom components are defiend and stored.

constants: where constants, actionTypes and some commonly used elements are stored.

lib: where useful customized methods are stored.

index.js: where redux store is implemented and middlewares such as redux-thunk, redux-logger and redux-persist are applied.

App.js: the routing class, refer to react navigation (https://github.com/react-community/react-navigation) to learn more
