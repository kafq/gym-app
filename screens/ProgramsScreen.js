import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
const ProgramItem2 = require('../components/ProgramItem2');
const styles = require('../constants/styles.js');

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: []
    };
    this.programsRef = this.getRef().child('programs');
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
        dataSource: this.state.dataSource.cloneWithRows(programs)
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
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }

  _renderItem(item) {


    return (
      <ProgramItem2 item={item}/>
    );
  }
}