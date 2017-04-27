import Expo from 'expo';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import  LoginScreen  from './screens/LoginScreen';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from "./api/firebase";
import Database from "./api/database";
import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {

  state = {
    appIsReady: false,
    isLoggedIn: false
  };
  
  constructor(props) {
    super(props);

    Firebase.initialise();

    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null,
      appIsReady: false,
      isLoggedIn: false
    };

    this.getInitialView = this.getInitialView.bind(this);

  }

  getInitialView() {

    firebase.auth().onAuthStateChanged((user) => {

      let initialView = user ? "HomeScreen" : "LoginScreen";

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });


  }

   componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png'),
                 require('./assets/images/login_background.png'),
                 require('./assets/images/CTA.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      let timeout = setTimeout(() => {
          this.setState({ appIsReady: true });
      }, 5000)
      
    }
  }

  render() {
    if (this.state.initialView === 'LoginScreen')
    return(
    <LoginScreen/>
    );
    else {
      return(
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('rootNavigation')}
            />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
        </View>
      );
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
