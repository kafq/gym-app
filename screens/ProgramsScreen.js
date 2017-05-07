import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
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
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({exercises});
      } catch(e) {

      }
    })
    this.listenForPrograms(this.programsRef);
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
          day4: child.val().day4,
          day5: child.val().day5,
          day6: child.val().day6,
          _key: child.key,
          gender: child.val().gender,
          level: child.val().level,
        });
      });
      this.setState({
        programs,
        programsDataSource: this.state.programsDataSource.cloneWithRows(programs)
      });
      AsyncStorage.setItem('programs', JSON.stringify(programs))
    });
  }


  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
<View><Text>Welcome to programs, </Text></View>

        <ListView
          horizontal
          initialListSize = {2}
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
      <ProgramCard item={item} uid={this.state.uid} exercises={this.state.exercises}/>
    );
  }
}