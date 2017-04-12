import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Tag extends Component {
  render() {
    return (
      <View style={{marginBottom: 5}}>
        <Text style={{color: this.props.color, opacity: 0.7, fontSize: 12, fontWeight: 'bold'}}>{this.props.title}</Text>
        <Text style={{color: this.props.color}}>{this.props.content}</Text>
      </View>
    );
  }
  
}