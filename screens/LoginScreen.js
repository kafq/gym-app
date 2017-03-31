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

import { 
    FormLabel,
    FormInput,
    FormValidationMessage,
    SocialIcon,
    Button 
} from 'react-native-elements';

import React, {Component} from "react";
import * as firebase from "firebase";

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
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
    }

    async signup() {


        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

           /* setTimeout(() => {
                this.props.navigator.push('home');
            }, 1000);*/

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

            /*setTimeout(() => {
                 this.props.navigator.push('home');
            }, 1000);*/

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '1767868336864920',
            { permissions: ['public_profile', 'email'] }
        );

    if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).then(() => {
            setTimeout(() => {
                    this.props.navigator.push('home');
                }, 1000);
        }).catch((error) => {
        // Handle Errors here.
        });
        }
    }

    render() {

        return (

        <View style={styles.containerCentered}>
            <Image
                style={styles.backgroundImage}
                resizeMode={Image.resizeMode.fill}
                source={require('../assets/images/login_background.png')}
            >
                <View style={styles.containerCentered}>
                    <View style={styles.textGroup}>
                        <Text style={styles.title}>Atlite</Text>
                        <Text style={styles.description}>The best way to get right instructional videos, lorem ipsum dolor sit amet, in vina veritas per aspera et astra</Text>
                    </View>
                    
                    <View style={styles.form}>
                        <FormLabel style={{alignSelf: 'flex-start', color: "#CCC"}}>Email</FormLabel>
                        <FormInput
                            placeholder={"Enter your email"}
                            placeholderTextColor={"#CCC"}
                            style={styles.inputContainerStyle}
                            inputStyle = {{ color: '#fff' }} 
                            keyboardType="email-address"
                            onChangeText = {(email) => this.setState({email})}/>
                        
                        <FormLabel style={{alignSelf: 'flex-start', color: "#CCC"}}>Password</FormLabel>
                        <FormInput 
                            placeholder={"Enter your password"}
                            placeholderTextColor={"#CCC"}
                            style={styles.inputContainerStyle}
                            secureTextEntry={true}
                            inputStyle = {{ color: '#fff' }} 
                            onChangeText = {(password) => this.setState({password})}/>
                        
                        <FormValidationMessage>{this.state.response}</FormValidationMessage>

                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={this.login}
                            title='Sign in' />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={this.signup}
                            title='Sign up' />
                    </View>
                    <SocialIcon
                        title='Sign In With Facebook'
                        onPress={this.loginWithFacebook}
                        style={{width: 250}}
                        button
                        type='facebook'
                    />
                </View>
            </Image>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        zIndex: -1
    },
    containerCentered: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGroup: {
        marginHorizontal: 40
    },
    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#fff",
        fontSize: 45,
        fontWeight: "bold",
        justifyContent:'center',
        alignSelf: 'center'
    },
    description: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    form: {
        width: 300
    },
    loginButton: {
        width: 250,
        borderRadius: 100,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    inputContainerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff'
    }
});