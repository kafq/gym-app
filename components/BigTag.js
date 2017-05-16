import React, { Component } from "react";
import { View, Text } from "react-native";

export default class BigTag extends Component {
  render() {
    return (
      <View style={{marginBottom: 0, marginRight: 35}}>
        <Text style={{color: '#FFFFFF', opacity: 0.7, fontSize: 12, fontWeight: 'bold'}}>{this.props.title}</Text>
        <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>{this.props.content}</Text>
      </View>
    );
  }
  
}