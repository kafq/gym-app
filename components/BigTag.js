import React, { Component } from "react";
import { View, Text } from "react-native";
import Common from '../constants/common';

export default class BigTag extends Component {
  render() {
    return (
      <View style={[Common.marginBottom]}>
        <Text style={this.props.color === '#000' ? Common.darkTagTitle : Common.lightTagTitle}>{this.props.title}</Text>
        <Text style={this.props.color === '#000' ? Common.darkTagTitleDisplay : Common.lightTagTitleDisplay}>{this.props.content || ''}<Text style={this.props.color === '#000' ? Common.darkTitleH2: Common.lightTagTitle}>{this.props.label || ''}</Text></Text>
      </View>
    );
  }
  
}