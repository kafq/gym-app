import React, { Component } from 'react';

import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  AppRegistry,
  AlertIOS,
  TextInput
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { LoginScreen } from './LoginScreen';
import Database from '../api/database';
import CommonStyle from "../constants/common";
import * as firebase from 'firebase';
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = require('../constants/styles.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIoYGPPcwoXacoD8TNm6t9YzgkNcPSh-U",
    authDomain: "gymnext-a9231.firebaseapp.com",
    databaseURL: "https://gymnext-a9231.firebaseio.com",
    storageBucket: "gymnext-a9231.appspot.com",
    messagingSenderId: "1054828973938"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      uid: "",
      todo: "",
      todoForm: ""
    };
    this.logout = this.logout.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    
    this.itemsRef = this.getRef().child('items');
  }

    async logout() {

        try {

            await firebase.auth().signOut();

            this.props.navigator.push('login')

        } catch (error) {
            console.log(error);
        }

    }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  async componentDidMount() {

        this.listenForItems(this.itemsRef);

        try {

            // Get User Credentials
            let user = await firebase.auth().currentUser;

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

        } catch (error) {
            console.log(error);
        }

    }

     saveTodo() {

        // Set Mobile
        if (this.state.uid && this.state.todoForm) {
            Database.setUserTodo(this.state.uid, this.state.todoForm);
        }

    }


  render() {
   
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />
        <View>
           <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
                    <Text style={styles.heading}>Mobile Number (From Database): {this.state.todo}</Text>
        </View>
        <View style={styles.form}>
                        <TextInput
                          style = {{height: 20, width: 300}}
                            value={this.state.todoForm}
                            onChangeText={(todoForm) => this.setState({todoForm})}
                        />
                        <TouchableOpacity onPress={this.saveTodo} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />
        <ActionButton onPress={this.logout} title="Logout" />
    
      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}