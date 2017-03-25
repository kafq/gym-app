import * as firebase from 'firebase';
import Database from '../api/database';

class Profile {
 
static getProfile() {    
    let user = firebase.auth().currentUser;

            // Listen for Mobile Changes
            Database.listenUserTodo(user.uid, (todoNumber) => {
                this.setState({
                    todo: todoNumber,
                    todoForm: todoNumber
                });
            });

            this.setState({
                uid: user.uid
            });


}

}

 module.exports = Profile;