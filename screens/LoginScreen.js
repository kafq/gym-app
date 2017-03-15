import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from "react-native";

import Expo from 'expo';

import React, {Component} from "react";
import * as firebase from "firebase";

//import CommonStyle from "../constants/common";

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async signup() {


        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

            setTimeout(() => {
                this.props.navigator.push('home');
            }, 1000);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async login() {

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "Logged In!"
            });

            setTimeout(() => {
                 this.props.navigator.push('home');
            }, 1000);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

async loginWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '1767868336864920',
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
    });
  }
}

    render() {

        return (
                /*<Image
                    style={styles.backgroundImage}
                    source={require('../assets/images/login_background.png')}
                >
                <View style={styles.containerCentered}>
                        <View style={styles.textGroup}>
                            <Text style={styles.title}>Atlite</Text>
                            <Text style={styles.description}>The best way to get right instructional videos, lorem ipsum dolor sit amet, in vina veritas per aspera et astra</Text>
                        </View>
                        <TextInput
                            placeholder={"Email Address"}
                            style={{height: 20, width: 200, color: '#fff'}}
                            onChangeText={(email) => this.setState({email})}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder={"Password"}
                               style={{height: 20, width: 100}}
                            onChangeText={(password) => this.setState({password})}
                            password={true}
                            autoCapitalize="none"
                        />

                        <View style={styles.submit}>
                            <TouchableOpacity onPress={this.signup}  textStyle={{fontSize: 18}}>
                                <Text style={styles.caption} >Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.loginWithFacebook} style={styles.buttons} textStyle={{fontSize: 18}}>
                                <Text style={styles.caption}>Login</Text>
                            </TouchableOpacity>
                        </View>

     <View>
                        <Text style={styles.response}>{this.state.response}</Text>
                    </View>
                    </View>
                   
                
                </Image>*/
                <View style={styles.containerCentered}>

                <Image
                    style={styles.backgroundImage}
                    source={require('../assets/images/login_background.png')}
                >
                                <View style={styles.textGroup}>
                            <Text style={styles.title}>Atlite</Text>
                            <Text style={styles.description}>The best way to get right instructional videos, lorem ipsum dolor sit amet, in vina veritas per aspera et astra</Text>
                        </View>
                        <TextInput
                            placeholder={"Email Address"}
                            style={{height: 20, width: 200, color: '#fff'}}
                            onChangeText={(email) => this.setState({email})}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder={"Password"}
                               style={{height: 20, width: 100}}
                            onChangeText={(password) => this.setState({password})}
                            password={true}
                            autoCapitalize="none"
                        />

                        <View style={styles.submit}>
                            <TouchableOpacity onPress={this.signup}  textStyle={{fontSize: 18}}>
                                <Text style={styles.caption} >Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.loginWithFacebook} style={styles.buttons} textStyle={{fontSize: 18}}>
                                <Text style={styles.caption}>Login</Text>
                            </TouchableOpacity>
                        </View>
                </Image>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        zIndex: -1
    },
    containerCentered: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGroup: {
        width: 300,
        marginHorizontal: 40
    },
    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#fff",
        fontSize: 45,
        fontWeight: "bold",
    },
    description: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
    }
});