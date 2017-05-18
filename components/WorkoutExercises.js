import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {withNavigation} from '@expo/ex-navigation';
import Layout from '../constants/Layout'
@withNavigation
class WorkoutExercises extends Component {
  constructor(props) {
    super(props);  
  }
goToAllExercises() {
    this.props.navigator.push('XDayExercises', {
        dayNumber: this.props.dayNumber,
        exercises: this.props.exercises,
        program: this.props.program
    })
}
getDayOrder() {
    switch(this.props.dayNumber) {
        case 1: return 'First'
        case 2: return 'Second'
        case 3: return 'Third'
        case 4: return 'Fourth'
        case 5: return 'Fifth'
        case 6: return 'Sixth'
    }
}
    
render() {
    const {dayNumber, exercises, program, exercisesNumber} = this.props;
    return (
        <View style={styles.dayExercisesContainer}>
            <TouchableOpacity onPress={() => {this.goToAllExercises()}}>
                <View>
                    <Text style={styles.title}>{this.getDayOrder()} day</Text>
                    <Text style={styles.subtitle}>{this.props.exercisesNumber} exercises</Text>
                </View>
                    </TouchableOpacity>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
    dayExercisesContainer: {
        height: 70,
        justifyContent: 'center',
        borderBottomColor: '#CDCDCD',
        borderBottomWidth: 0.5,
        paddingHorizontal: Layout.window.width * 0.08,
    },
   newsScroll: {
    backgroundColor: 'transparent',
  },
  title: {
      fontSize: 20
  },
  subtitle: {
      fontSize: 16
  }
  });

export default WorkoutExercises;

