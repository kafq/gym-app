import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Tag extends Component {
  render() {
    return (
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{this.props.title}</Text>
        <Text style={styles.text}>{this.props.content}</Text>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
    tag: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  tagContainer: {
    marginBottom: 5
  },
  text: {
    color: '#fff'
  },
})
export default Tag;