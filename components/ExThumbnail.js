import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class ExThumbnail extends Component {
  render() {
    return (
      <Image source={require('../assets/images/thumbnail.png')} 
        style={styles.thumbnail}>
    </Image>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    resizeMode: 'cover',
    width: 120,
    height: 90,
    marginTop: -60,
    marginLeft: 240,
    borderRadius: 6,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
  },

});

export default ExThumbnail;