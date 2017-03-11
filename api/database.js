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

}

module.exports = Database;