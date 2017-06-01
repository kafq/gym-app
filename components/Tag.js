import React, { Component } from "react";
import { View, Text } from "react-native";
import Common from '../constants/common';
import Layout from '../constants/Layout';

export default class Tag extends Component {
  render() {
    return (
      <View style={{marginBottom: 5, marginRight: Layout.width.s}}>
        <Text style={this.props.color === '#000' ? Common.darkTagTitle : Common.lightTagTitle}>{this.props.title}</Text>
        <Text style={[Common.darkNameTag, {color: this.props.color}]}>{this.props.content}</Text>
      </View>
    );
  }
  
}