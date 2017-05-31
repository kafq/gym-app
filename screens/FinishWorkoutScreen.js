import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Tag from '../components/Tag';
import {Grid, Row, Col} from 'react-native-elements';
import Database from '../api/database';
import Colors from '../constants/Colors';
import Common from '../constants/common'
export default class FinishWorkoutScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        ownProgram: {},
        exercises: {},
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Congratulations!`
      }
    },
  };
 async finishWorkout() {
      
      await AsyncStorage.getItem("ownProgram").then((json) => {
        try {
            const ownProgram = JSON.parse(json);
            this.setState({ownProgram})
        } catch(e) {
            console.log(e)
        }
      })
      //Database.finishWorkout();
      this.props.navigator.pop(2);
  }
  calculateWorkoutTime(){
    let workoutTime = (this.props.route.params.workoutFinished - this.props.route.params.workoutStarted)/60/60;
    console.log('Time is ' + workoutTime);
    return workoutTime;
  }
  render() {
    return (

        <Grid>
          <Row containerStyle={styles.centered}><Text>Workout is completed</Text></Row>
          <Row containerStyle={styles.centered}>
            <Col>
            <Text>6 exercises finished</Text>
            </Col>
            <Col>
            <Text>{this.calculateWorkoutTime()} time spent</Text>
            </Col>
          </Row>
          <Row><View><Text style={Common.darkTitleText}>Please, rate workout difficulty, so that we make it more suitable for you</Text></View></Row>
          <Row>
            <Col>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(1); Database.rateWorkout(1)}}><Text style={styles.colorBlack}>Bad</Text></TouchableOpacity>
            </Col>
            <Col containerStyle={styles.centered}>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(2); Database.rateWorkout(2)}}><Text style={styles.colorBlack}>Fine</Text></TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(3); Database.rateWorkout(3)}}><Text style={styles.colorBlack}>Very nice</Text></TouchableOpacity>
            </Col>
          </Row>
        </Grid>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  colorBlack: {
    color: Colors.darkBodyTextColor
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});
