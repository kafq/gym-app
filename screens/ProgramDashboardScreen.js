import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import ProgramBadge from '../components/ProgramBadge';
import Divider from '../components/Divider';
import ExerciseItem from '../components/ExerciseItem';
import WorkoutExercises from '../components/WorkoutExercises';
import Database from '../api/database';
import * as firebase from 'firebase';
export default class ExerciseScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
          programName: 'attempt1',
          ownProgram: false,
          sequence: [],
          sequence2: '',
          isLoading: true,
          logs: []
      }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.program._key}`
      }
    },
  };
  componentWillMount() {
      console.log('Triggered')
      AsyncStorage.getItem('logs').then(json => {
          this.setState({
              logs: JSON.parse(json) || []
          })
      })
  }
  componentDidMount() {
      let uid = this.props.route.params.uid;
      Database.getUserProgram(uid, (programName) => {
          this.setState({
              programName
          })
      })
       this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises),
      });
      this.renderExercises();
      let timeout = setTimeout( ()=> {
        this.setState({
            isLoading: false
        })
      }, 1000)
  }

  async renderExercises() {
    let ownProgramKey = '';
    console.log('Exercises triggered');
    await AsyncStorage.getItem('ownProgram').then( (program) => {
        const ownProgram = JSON.parse(program); 
        ownProgramKey = ownProgram._key;
    })
    let currentProgramKey = await this.props.route.params.program._key;
    if (currentProgramKey === ownProgramKey) {
        this._retrieveFilteredItems();
         this.setOwnPropertyTo(true);
    }
    else {
        this._retrieveFilteredItems();
        this.setOwnPropertyTo(false);
       
    }
  }
  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container}>
        {/*<View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text style={styles.textWhiteTitle}>{this.props.route.params.program._key}</Text>
            </Image>
        </View>*/}
        <ProgramBadge 
            days={this.props.route.params.program.days}
            program = {this.props.route.params.program}
            programName = {this.state.programName}
            sequence = {this.state.sequence2}
            uid = {this.props.route.params.uid}
            handleClick = {this.setOwnPropertyTo.bind(this)}
            handleContinueProgram = {this.handleContinue.bind(this)}
            style={{flex: 1}}
            />
        <Text>You have passed: {this.props.route.params.uid}</Text>
        {this._displayLeaveButton()}
        <Text>Program name: {this.state.programName}</Text>
        <Text>{this.props.route.params.program.days}</Text>
        <Text style={styles.textBlackTitle}>Workouts</Text>
        {this.displayWorkoutDays()}
        <Divider/>
      </ScrollView>
    );
  }

displayWorkoutDays() {
    if (this.state.isLoading) {
        return (<View/>)
    }
    let workoutExercises = [
        <TouchableOpacity key={0} onPress = {() => {console.log(this.state.sequence2)}}><Text>PRESS TO GET CURRENT SEQUENCE</Text></TouchableOpacity>
    ];

    for (i = 1; i <= this.props.route.params.program.days; i++) {
        let day = 'day' + i;
        let length = this.state.sequence2[day].length;
        workoutExercises.push(
            <WorkoutExercises 
                key={i} 
                dayNumber={i}
                numberOfExercises={length}
                exercises={this.state.sequence2[day]}
                program={this.props.route.params.program}/>
        );
    }
    
    return (workoutExercises)
}


setOwnPropertyTo(bool) {
    revertExercise = () => {
        Object.keys(this.state.sequence2).forEach((day) => {
            this.state.sequence2[day].forEach((exercise) => {
                exercise.own = bool;
            })
        })
    }
    revertExercise();
}

_retrieveFilteredItems(filter, exercises) {
    let exercisesSequence = {};
    let newArr = this.props.route.params.exercises.sort(this.compare('muscles'));
    for ( i=1; i<=this.props.route.params.program.days; i++ ) {
        let day = 'day' + i;
        let ref = this.props.route.params.program[day];
        let filteredByDay = this.props.route.params.exercises.filter((item) => {
            return ref.split(', ').includes(item.muscles);
        })

        let filteredByNumber = this.filterByNumber(filteredByDay, 4);
        exercisesSequence[day] = filteredByNumber;
    }
    this.setState({
            //dataSource: this.state.dataSource.cloneWithRows(filteredByNumber),
            //exercises: filteredByNumber,
            sequence2: exercisesSequence
        })
  
}

filterByNumber = (arrayToFilter, n) => {
  let muscleToCompareWith = 'brain';
  let counter = 1;
  let filtered = [];
  arrayToFilter.forEach((item) => {
    if ((item.muscles !== muscleToCompareWith)) {
      counter = 1;
      muscleToCompareWith = item.muscles;
      filtered.push(item);
    }
    else if ((item.muscles === muscleToCompareWith) && (counter < n)) {
      filtered.push(item);
      counter++;
    }
  });
  return filtered;
}

handleClick(bool) {
    this.setOwnPropertyTo(bool);
}

handleContinue() {
        let index, day, dayNumber;
        Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
        Database.getCurrentWorkoutDay( (currentDay) => { dayNumber = currentDay});
        day = 'day' + dayNumber
        this.props.navigator.push('exercise', {
            exercise: this.state.sequence2[day][index],
            insideWorkout: true,
            sequence: this.state.sequence2[day],
            logs: this.state.logs,
            workoutStarted: Date.now()
        })
}

_displayLeaveButton() {
    leaveProgram = () => {
        Alert.alert(
            'Leave Program',
            'You are about to leave your program, are you sure?',
            [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
                { text: 'Leave Program', onPress: () => {
                    this._retrieveFilteredItems();
                    this.setOwnPropertyTo(false);
                    AsyncStorage.setItem('ownProgramId', '');
                    Database.leaveProgram(this.props.route.params.uid)} }
            ]
        );
    }
    switch (this.state.programName) {

        case this.props.route.params.program._key:
            return(
                <View>
                    <TouchableOpacity onPress={leaveProgram}><Text>LEAVE PROGRAM</Text></TouchableOpacity>
                </View>
            );
        default: 
            return(
                <View/>
            );
    }
}

compare = (property) => {
    return (a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    }
}
_renderItem(item) {
    goToReplace = () => {
    this.props.navigator.push('replaceExercise', {
      item: item,
      sequence: this.state.sequence
    })
  }
  goToRoute = () => {
    this.props.navigator.push('exercise', {
      exercise: item,
    })
  }
    return (
      <ExerciseItem item={item} imageLink={item.photo} onPress={goToRoute} onReplace={goToReplace}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      marginBottom: 10
  },
  textWhite: {
      color: '#fff'
  },
  textWhiteTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
  },
  textBlackTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000'
  }
});