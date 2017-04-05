import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
const ProgramItem2 = require('../components/ProgramItem2');
const styles = require('../constants/styles.js');

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      programsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: []
    };
    this.programsRef = this.getRef().child('programs');
    this.exercisesRef = this.getRef().child('exercises');
  }

  static route = {
    navigationBar: {
      title: 'Programs',
    },
  };
/**
 * Component Life Cycles
 */
  componentWillMount() {
    this.listenForPrograms(this.programsRef);
    this.listenForExercises(this.exercisesRef);
  }
  
  getRef() {
    return firebase.database().ref();
  }
  listenForExercises(exercisesRef) {
    exercisesRef.on('value', (snap) => {
      // get children as an array
      var exercises = [];
      
      snap.forEach((child) => {
        //if (this.props.item.day1muscles.arms && child.val().arms) {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type,
          photo: child.val().photo,
          checked: child.val().checked,
          _key: child.key
        });
      });
      this.setState({
        exercises,
        exercisesDataSource: this.state.exercisesDataSource.cloneWithRows(exercises)
      });
    });
    
  }

  listenForPrograms(programsRef) {
    programsRef.on('value', (snap) => {
      // get children as an array
      var programs = [];
      snap.forEach((child) => {
        programs.push({
          days: child.val().days,
          day1muscles: child.val().day1muscles,
          day2muscles: child.val().day2muscles,
          day3muscles: child.val().day3muscles,
          arms: child.val().arms,
          _key: child.key
        });
      });
      console.log(programs);
      this.setState({
        programs,
        programsDataSource: this.state.programsDataSource.cloneWithRows(programs)
      });
    });
  }

  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
<View><Text>Welcome to programs</Text></View>
        <ListView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.programsDataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.programsContainer}/>
      </View>
    );
  }

  _renderItem(item) {


    return (
      <ProgramItem2 item={item} exercises={this.state.exercises}/>
    );
  }
}