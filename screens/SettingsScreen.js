import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as firebase from "firebase";
import { ExpoConfigView } from '@expo/samples';
const ActionButton = require('../components/ActionButton');
import CommonStyle from "../constants/common";

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };
  async logout() {

        try {

            await firebase.auth().signOut();

            this.props.navigator.push('login')

        } catch (error) {
            console.log(error);
        }

    }
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        {/* Go ahead and delete ExpoConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */
        }
        <ExpoConfigView />
        <View>
          <ActionButton onPress={this.logout} title="Logout" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
