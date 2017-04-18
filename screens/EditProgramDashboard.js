import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import Database from '../api/database';

export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chest: false,
      shoulders: false,
      back: true,
      biceps: false,
      triceps: false,
      legs: false,
      calves: false,
      glutes: false,
      abs: false
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Edit ${params.program._key}`
      }
    },
  };

  goToRoute = (day) => {
      this.props.navigator.push('editProgram', {
      program: this.props.route.params.program,
      uid: this.props.route.params.uid,
      day: this.props.route.params.program[day]
    })
}

  renderDaysFields() {
    
let rows=[];
    for (i=1; i<= this.props.route.params.program.days; i++) {
        let day = 'day' + i;
        rows.push(<TouchableOpacity onPress={this.goToRoute.bind(day)}><Text>Edit {i} day exercises</Text></TouchableOpacity>)
    }
    return(
            <View>
                {rows}
            </View>
        );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderDaysFields()}
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },

});
