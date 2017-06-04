import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from "victory-native";
import Layout from '../constants/Layout';
import moment from 'moment';
import Database from '../api/database';
var _ = require('lodash');

const LineData = [
    {day: 1, weight: 150},
    {day: 2, weight: 340},
    {day: 3, weight: 500},
    {day: 4, weight: 670},
    {day: 5, weight: 840},
    {day: 6, weight: 1000},
    {day: 7, weight: 1100}
  ];



class Stats extends Component {

 componentDidMount() {
  this.filterByWeek();
 }

  constructor(props){
    super(props);
    this.filterByWeek = this.filterByWeek.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
    this.state = {
    dateLog: '',
    currWeek: moment().format("W"),
  }
}

  filterByWeek() {
    Database.listeningForStats((log) => {
    var filtered = log.filter((item) => {
       return( moment(item.workoutCompleted).format('W') == this.state.currWeek )
     });
     if ( filtered.length < 1 ) {
       alert('You Do not Have data for previous Weeks');
       this.setState({
          currWeek: this.state.currWeek + 1
      })
      let timeout = setTimeout( () => {
      this.filterByWeek();
      }, 100);
     }
    this.setState({
          allLogs: log,
          weekLogs: filtered,
          totalExercises: _.sumBy(filtered, 'amountOfExercisesCompleted'),
          totalWeight: _.sumBy(filtered, 'totalWeight'),
          workoutsDone: filtered.length,
          loading: false,
      });
      this.props.loadingOFF();
    });
  }

 changeWeek = () => {
      this.setState({
          currWeek: this.state.currWeek - 1
      })
      let timeout = setTimeout( () => {
      this.filterByWeek();
      }, 100);
    };



  render() {
    return (
      <View>
      <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Exercises Done:</Text>
        <VictoryChart
        width={300}
        height={200}
        domainPadding={20}
        width={0.8 * Layout.window.width}
  >

    <VictoryAxis
      tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
      tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      offsetX={0}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (Math.round(x))}
    />
    <VictoryBar
      style={{
        data: {fill: "#CE0606", width: 20}
      }}
      data={this.state.weekLogs}
      x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
      y={(d) => d.amountOfExercisesCompleted}
    />
  </VictoryChart>
  <TouchableOpacity onPress={this.changeWeek}><Text>Prev Week</Text></TouchableOpacity>
  </View>
    <View style={styles.TextContainer}>
    <Text>Total Exercises</Text>
    <Text style={styles.number}>{this.state.totalExercises}</Text>
    <Text>Total Weight</Text>
    <Text style={styles.number}>{this.state.totalWeight}</Text>
    </View>
    </View>

    <View style={styles.container}>
    <View style={styles.chartContainer}>
        <Text style={styles.title}>Lifted Weight:</Text>
        <VictoryChart
        width={300}
        height={200}
        domainPadding={20}
        width={0.8 * Layout.window.width}
  >
    <VictoryAxis
      tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
      tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      offsetX={0}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (Math.round(x))}
    />
    <VictoryLine
      style={{data: {stroke: "#CE0606", strokeWidth: 2}}}
      data={this.state.weekLogs}
      x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
      y={(d) => d.totalWeight}
    />
  </VictoryChart>
  </View>
    <View style={styles.TextContainer}>
    <Text>Workouts Done:</Text>
    <Text style={styles.number}>{this.state.workoutsDone}</Text>
    <Text>Time Spent</Text>
    <Text style={styles.number}>1h</Text>
    </View>
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  chartContainer: {
      flex: 3,
  },
  TextContainer: {
      flex: 2,
      alignItems: 'flex-end',
      marginRight: 30,
      marginTop: 20,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: -20,
  }
});

export default Stats;