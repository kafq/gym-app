import * as firebase from "firebase";

class Database {

    static setUserTodo(userId, todo) {

        let userTodoPath = "/user/" + userId + "/details";

        return firebase.database().ref(userTodoPath).set({
            todo: todo
        })

    }

    static listenUserTodo(userId, callback) {

        let userTodoPath = "/user/" + userId + "/details";

        firebase.database().ref(userTodoPath).on('value', (snapshot) => {

            var todo = "";

            if (snapshot.val()) {
                todo = snapshot.val().todo
            }

            callback(todo)
        });
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
    static enrollIntoProgram(uid, passedProgram) {
            
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
    static addExerciseStats(exerciseId, weight, metric) {
        let uid = firebase.auth().currentUser.uid;

        let path = "/user/" + uid + "/statistics";

        // firebase.database().ref(path).push({
        //     exerciseId,
        //     weight,
        //     metric,
        //     date: Date.now()
        // });

        firebase.database().ref(path).transaction( (statistics) => {
            if (statistics) {
                statistics.exercisesDone++;
            }
            return statistics;
        });
    }
    static updateProgram(newMuscles) {
        let uid = firebase.auth().currentUser.uid;
        let path = "/user/" + uid + "/ownProgram";
        firebase.database().ref(path).update({
            day1: newMuscles
        });
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