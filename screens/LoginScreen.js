import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";

import CommonStyle from "../constants/common";

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

    render() {

        return (
            <TouchableWithoutFeedback>
                <View style={CommonStyle.container}>
                    <View style={styles.formGroup}>
                        <Text style={styles.title}>Firebase Sample</Text>
                        <TextInput
                            placeholder={"Email Address"}
                            style={{height: 20, width: 200}}
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
                            <TouchableOpacity onPress={this.signup} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                                <Text>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.login} style={styles.buttons} textStyle={{fontSize: 18}}>
                                <Text>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.response}>{this.state.response}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 50
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    }
});