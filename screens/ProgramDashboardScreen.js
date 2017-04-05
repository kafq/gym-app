import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class ExerciseScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.programName}`
      }
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text>{this.props.route.params.programName}</Text>
            </Image>
        </View>
        <Text>Program Program Program</Text>
        <Text>You have passed: {this.props.route.params.exerciseType}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5
  }
});