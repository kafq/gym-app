import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ExerciseScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.exerciseName}`
      }
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi there, how are you doing?</Text>
        <Text>You have passed: {this.props.route.params.exerciseType}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
