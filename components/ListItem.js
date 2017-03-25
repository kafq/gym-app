import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';

const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.props.onPress}>
        <View style={styles.exerciseContainer}>
          <View style={styles.imageContainer}></View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.item.name}</Text>
            <Text>{this.props.item.muscles}</Text>
            <Text>{this.props.item.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    width: 107,
    height: 73,
    backgroundColor: '#CFCFCF',
    margin: 12,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    borderRadius: 6
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500'
  },
  tag: {
    fontSize: 14,
    marginVertical: 1
  }
})
module.exports = ListItem;