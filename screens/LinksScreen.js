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
  TextInput,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { LoginScreen } from './LoginScreen';
import Filters from '../components/Filters';
import CommonStyle from "../constants/common";
import * as firebase from 'firebase';
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = require('../constants/styles.js');

import Firebase from "../api/firebase";
import Database from '../api/database';


const filterExercises = (filter, exercises) => {
return exercises.filter((item) => {
  if (filter === 'ALL') return true;
  if (filter === 'ISOLATION') return item.type === 'isolating';
  if (filter === 'ARMS') return item.arms;
})
}

export default class LinksScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      uid: "",
      uriLink: "",
      todo: "",
      todoForm: "",
      filter: "ALL",
      exercises: []
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.logout = this.logout.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.setSource = this.setSource.bind(this);
    this.itemsRef = this.getRef().child('exercises');
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Library',
    },
  };
/**
 * Component Life Cycles
 */
  componentWillMount() {
    this.listenForItems(this.itemsRef);
    this.getProfile();
  }
/**
 * Public functions 
 */
  handleFilter(filter) {
    this.setSource(this.state.exercises, filterExercises(filter, this.state.exercises), { filter })
  }
  
  setSource(exercises, itemsDatasource, otherState = {}){
    this.setState({
      exercises,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    })
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var exercises = [];
      snap.forEach((child) => {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type,
          photo: child.val().photo,
          checked: child.val().checked,
          _key: child.key
        });
      });
      this.setState({
        exercises,
        dataSource: this.state.dataSource.cloneWithRows(exercises)
      });
    });
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
    return firebase.database().ref();
  }
  getImagesRef() {
    return firebase.storage().ref();
  }

  async getProfile() {    
    let user = firebase.auth().currentUser;
            // Listen for data change in optional field
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
  saveTodo() {
        // Set Optional Test Field
        if (this.state.uid && this.state.todoForm) {
            Database.setUserTodo(this.state.uid, this.state.todoForm);
        }
    }

  render() {
   
    return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading1}>Search Exercises</Text>
        <Filters
          onFilter={this.handleFilter}
          filter={this.state.filter}/>
      </View>
            
        <View style={styles.form}>
                        <TextInput
                          style = {{height: 20, width: 300}}
                            onChangeText={(todoForm) => this.setState({todoForm})}
                        />
                        <TouchableOpacity onPress={this.getUrl} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
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
    
      </ScrollView>
    )
  }
/**
 * Private Functions
 */
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
      <ListItem item={item} imageLink={item.photo} onPress={onPress} />
    );
  }
}