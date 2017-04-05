import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../constants/styles.js')
const { StyleSheet, Text, View} = ReactNative;

class Divider extends Component {
  render() {
    return (
      <View style={styles.divider}/>
    );
  }
}
module.exports = Divider;