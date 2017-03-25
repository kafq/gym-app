
import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyCIoYGPPcwoXacoD8TNm6t9YzgkNcPSh-U",
            authDomain: "gymnext-a9231.firebaseapp.com",
            databaseURL: "https://gymnext-a9231.firebaseio.com",
            storageBucket: "gymnext-a9231.appspot.com",
            messagingSenderId: "1054828973938"
        });
    }

}

module.exports = Firebase;