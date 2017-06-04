import * as firebase from "firebase";
import moment from 'moment';
var _ = require('lodash');

class Database {

    static setUserTodo(userId, todo) {

        let userTodoPath = "/user/" + userId + "/details";

        return firebase.database().ref(userTodoPath).set({
            todo: todo
        })

    }

    static listenForExercises() {
        let ref = firebase.database().ref().child('exercises');
        let exercises = [];
        ref.on('value', (snap) => {
            // get children as an array
            //var exercises = [];
            snap.forEach((child) => {
                exercises.push({
                name: child.val().name,
                muscles: child.val().muscles,
                type: child.val().type,
                photo: child.val().photo,
                video: child.val().video,
                checked: child.val().checked,
                _key: child.key
                });
            });
           console.log(exercises);
           return exercises;
        });
         
    }
    static listeningForLogs(currentDate, callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logsRec = [];
        let currDate = currentDate;
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            Object.keys(logs).forEach((date) => {
                Object.keys(logs[date]).forEach((index) => {
                    
                    if (index.length <= 3 && moment(logs[date].workoutCompleted).format('MM-DD-YY') === currDate) 
                    {
                        logsRec.push(logs[date][index]);
                    }
                })
                
                               
            })
            callback(logsRec)
        }, (e) => {console.log(e)})
    }

    static listeningForStats(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/workoutLogs";
        let logsRec = [];
        firebase.database().ref(path).on('value', (snap) => {
            let logs = snap.val();
            Object.keys(logs).forEach((date) => {
                logsRec.push(logs[date])        
            })
          callback(logsRec)
        }, (e) => {console.log(e)})
    }
    
    static saveExerciseSequence(exercises) {
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram/exerciseSequence";
           
            firebase.database().ref(path).set({
                exercises,
                currentExerciseIndex: 0,
                currentWorkoutDay: 1
            })
    }

    static getOwnExercises(uid) {
            
            //let path = "/user/" + uid + "/details";
           //console.log('Path is: ' + path);

            let exercises = firebase.database().ref().child('user').child(uid).child('ownProgram').child('exerciseSequence').once('value').then((snap) => {
                let exercises = snap.val().exercises;
                console.log(snap.val().exercises);
                return snap.val().exercises;
            });

            return exercises;
    }

    static getUserProgram(uid, callback) {
  
        let path = "/user/" + uid + "/ownProgram";
        
        firebase.database().ref(path).on('value', (snap) => {
            let programName = "";
            if (snap.val()) {
                programName = snap.val().programName
            }
            callback(programName);
    })
    
    }
    static enrollIntoProgram(passedProgram) {
            let uid = firebase.auth().currentUser.uid;
            let path = "/user/" + uid + "/ownProgram";
           
            firebase.database().ref(path).update({
                programName: passedProgram._key,
                gender: passedProgram.gender,
                days: passedProgram.days,
                day1: passedProgram.day1 || '',
                day2: passedProgram.day2 || '',
                day3: passedProgram.day3 || '',
                day4: passedProgram.day4 || '',
                day5: passedProgram.day5 || '',
                day6: passedProgram.day6 || '',
                hasProgram: true,

            })
    }



    static leaveProgram(uid) {
            let path = "/user/" + uid + "/ownProgram";

            firebase.database().ref(path).set({
                programName: ''
            })
    }
    
    static getCurrentExerciseIndex(callback) {
        let uid = firebase.auth().currentUser.uid;
        console.log('Triggered getCurrentExerciseIndex');
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';
        firebase.database().ref(path).on('value', (snap) => {
            console.log(snap.val());
            let index = snap.val().currentExerciseIndex;
            console.log('Index is' + index);
            callback(index);
        })
    }
    static getCurrentWorkoutDay(callback) {
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence/';
        firebase.database().ref(path).on('value', (snap) => {

            let day = snap.val().currentWorkoutDay;

            callback(day);
        })
    }

    static finishWorkout(){
        let dayNumber;
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/statistics';
        firebase.database().ref(path).update({
            lastWorkoutDate: moment().format('MM-DD-YY')
        });
        this.getCurrentWorkoutDay((day) => {dayNumber = day})
        this.emptyWorkout(dayNumber);
        
    }
    static pushWorkoutLog(log){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/workoutLogs/' + Date.now();
        let totalWeight = 0;
        log.forEach((logItem) => {
            totalWeight+=parseInt(logItem.weight)
        })
        firebase.database().ref(path).set({
            ...log,
            workoutCompleted: moment().format(),
            amountOfExercisesCompleted: log.length,
            totalWeight
        })
    }
    static rateWorkout(rate){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/details/';
        firebase.database().ref(path).once('value').then( (snap) => {
            console.log(snap.val());
            let currentRate = snap.val().difficultyRate;
            let newRate = currentRate + rate;
            if (newRate >= 5) {
                firebase.database().ref(path).update({
                    level: snap.val().level + 1,
                    difficultyRate: 0
                })
            }
            else {
                firebase.database().ref(path).update({
                    difficultyRate: newRate
                })
            }
        })

    }

    static emptyWorkout(dayNumber){
        let uid = firebase.auth().currentUser.uid;
        let path = '/user/' + uid + '/ownProgram/exerciseSequence';
        firebase.database().ref(path).update({
            currentExerciseIndex: 0,
            currentWorkoutDay: dayNumber + 1
        })
    }
    static addExerciseStats(exerciseId, weight, sets, reps, metric, ownExercise) {
        let uid = firebase.auth().currentUser.uid;

        let path = "/user/" + uid + "/statistics";
        let path2 = "/user/" + uid + "/exercisesLogs/" + Date.now();
        firebase.database().ref(path2).set({
            exerciseId,
            weight,
            sets,
            reps,
            metric,
            date: Date.now()
        });

        firebase.database().ref(path).transaction( (statistics) => {
            if (statistics) {
                statistics.exercisesDone++;
            }
            return statistics;
        });

        if (ownExercise) {
            firebase.database().ref('/user/' + uid + '/ownProgram/exerciseSequence').transaction( (index) => {
                if (index) {
                    index.currentExerciseIndex ++;
                }
                return index;
            });
        }
    }
    static updateProgram(newMuscles) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        firebase.database().ref(path).update({
            day1: newMuscles
        });
    }
    static userHasProgram(uid) {
        let path = "/user/" + uid + "/ownProgram";
        console.log('Path is: ' + path)
        firebase.database().ref(path).on('value', (snap) => {
            //console.log(snap.hasProgram.val());
            console.log(snap.val());
            if (snap.val().hasProgram === true) { return true }
            else {return false};
        }, (e) => {console.log(e)})
    }
    static getId() {

        let checkAuthInterval = setInterval(function(){
        if ( typeof firebase.auth().currentUser.uid !== undefined ) {
            clearInterval(checkAuthInterval);
            console.log('From Database.js: ' + firebase.auth().currentUser.uid);
            return firebase.auth().currentUser.uid;
        }
        }, 500);

    }
    static addUserDetails(level, DaysPerWeek) {
         let uid = firebase.auth().currentUser.uid;

         let path = "/user/" + uid + "/details";

         firebase.database().ref(path).update({
            level,
            DaysPerWeek,
        });         
    }

}

module.exports = Database;