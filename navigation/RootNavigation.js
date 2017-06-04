import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="home" navigatorUID="main">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('dashboard', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="exercises"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute="exercises" />
        </TabNavigationItem>
       
        {/*<TabNavigationItem
          id="diary2"
          renderIcon={isSelected=> this._renderIcon('book')}>
          <View style={{position: 'absolute', top: 100, left: 30}}> 
          <View style={{ backgroundColor: 'red', width: 50, height: 50, zIndex: 1000, borderRadius: 100}}>
            <TouchableOpacity onPress={() => {console.log(228)}}><Text>1234</Text></TouchableOpacity>
          </View>
          </View>
        </TabNavigationItem>*/}

        <TabNavigationItem
          id="diary"
          renderIcon={isSelected => this._renderIcon('calendar-check-o', isSelected)}>
          <StackNavigation initialRoute="diary" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('user-o', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});