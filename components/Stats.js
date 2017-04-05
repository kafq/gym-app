import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from "victory-native";
import Layout from '../constants/Layout';


const data = [
    {day: 1, exercises: 5},
    {day: 2, exercises: 6},
    {day: 3, exercises: 4},
    {day: 4, exercises: 0},
    {day: 5, exercises: 7},
    {day: 6, exercises: 5},
    {day: 7, exercises: 3}
  ];

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
      tickValues={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
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
      data={data}
      x="day"
      y="exercises"
    />
  </VictoryChart>
  </View>
    <View style={styles.TextContainer}>
    <Text>Total Exercises</Text>
    <Text style={styles.number}>30</Text>
    <Text>Total Weight</Text>
    <Text style={styles.number}>1000</Text>
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
      tickValues={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      offsetX={0}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (Math.round(x))}
    />
    <VictoryLine
      style={{data: {stroke: "#CE0606", strokeWidth: 2}}}
      data={LineData}
      x="day"
      y="weight"
    />
  </VictoryChart>
  </View>
    <View style={styles.TextContainer}>
    <Text>Workouts Done:</Text>
    <Text style={styles.number}>3</Text>
    <Text>Time Spent</Text>
    <Text style={styles.number}>4h</Text>
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