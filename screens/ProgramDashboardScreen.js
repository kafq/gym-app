import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Divider from '../components/Divider';
import ListItem from '../components/ListItem';
import WorkoutExercises from '../components/WorkoutExercises'
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
          sequence2: ''
      }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.program._key}`
      }
    },
  };

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
  }

  async renderExercises() {
    let ownProgramKey = '';
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
       
    }
  }
  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text style={styles.textWhiteTitle}>{this.props.route.params.program._key}</Text>
            </Image>
        </View>
        <Text>You have passed: {this.props.route.params.uid}</Text>
        {this._displayEnrollButton()}
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
    let workoutExercises = [<TouchableOpacity onPress = {() => {console.log(this.state.sequence2)}}><Text>PRESS TO GET CURRENT SEQUENCE</Text></TouchableOpacity>];
        for (i = 1; i <= this.props.route.params.program.days; i++) {
        let day = 'day' + i;
        workoutExercises.push(
            <WorkoutExercises key={i} dayNumber={i} exercises={this.state.sequence2[day]} program={this.props.route.params.program}></WorkoutExercises>
        );
    } 
    return (workoutExercises)
}

setOwnPropertyTo(bool) {
    revertExercise = () => {
        Object.keys(this.state.sequence2).forEach((day) => {
            console.log(day);
            this.state.sequence2[day].forEach((exercise) => {
                console.log('Exercise is: ');
                console.log(exercise);
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

        let filteredByNumber = this.filterByNumber(filteredByDay, 2);
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

_displayEnrollButton() {
    enrollProgram = () => {
        Database.enrollIntoProgram(this.props.route.params.uid, this.props.route.params.program);
        Database.saveExerciseSequence(this.props.route.params.uid, this.state.sequence2);
        AsyncStorage.setItem('ownProgram', JSON.stringify(this.props.route.params.program));
        this.setOwnPropertyTo(true);
    }
    goToRoute = () => {
    this.props.navigator.push('editProgramDash', {
      program: this.props.route.params.program,
      uid: this.props.route.params.uid
    })
}

continueProgram = () => {
        console.log('Sequence below');
        console.log(this.state.sequence);
        let index = 1;
        Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
        console.log('Index from database.js is ' + index);
        console.log('exercise is ' + this.state.sequence[index]);
        this.props.navigator.push('exercise', {
            exercise: this.state.sequence[index],
            insideWorkout: true,
            sequence: this.state.sequence
        })
    }
    switch (this.state.programName) {
        case '':
            return(
                <View>
                    <TouchableOpacity onPress={enrollProgram}><Text>ENROLL RIGHT NOW</Text></TouchableOpacity>
                </View>
            );
        case this.props.route.params.program._key:
            return(
                <View>
                    <Text>THIS YOUR PROGRAM</Text>
                    <TouchableOpacity onPress={goToRoute}><Text>EDIT THE PROGRAM</Text></TouchableOpacity>
                    <TouchableOpacity onPress={continueProgram}><Text>CONTINUE THE PROGRAM</Text></TouchableOpacity>
                </View>

            );
        default: 
            return(
                <View>
                    <Text>DEFAULT CASE</Text>
                </View>
            );
    }
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
      <ListItem item={item} imageLink={item.photo} onPress={goToRoute} onReplace={goToReplace}/>
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