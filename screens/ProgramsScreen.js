import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import ProgramCard from '../components/ProgramCard';
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
      exercises: [],
      programs: [],
      uid: 'Wait for it'
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
  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.setState({
      uid: user.uid
    })
  }
  getRef() {
    return firebase.database().ref();
  }
  listenForExercises(exercisesRef) {
    exercisesRef.on('value', (snap) => {
      // get children as an array
      var exercises = [];
      
      snap.forEach((child) => {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type,
          photo: child.val().photo,
          _key: child.key,
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
          day1: child.val().day1,
          day2: child.val().day2,
          day3: child.val().day3,
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
<View><Text>Welcome to programs, {this.state.uid}</Text></View>
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
      <ProgramCard item={item} userid={this.state.uid} exercises={this.state.exercises}/>
    );
  }
}