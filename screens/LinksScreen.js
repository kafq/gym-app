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
import Footer from '../components/Footer';
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
  if (filter === 'MUSCLES') return item.checked;
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
    this.itemsRef = this.getRef().child('exercises');
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Database data',
    },
  };
  handleFilter(filter) {
    this.setSource(this.state.exercises, filterExercises(filter, this.state.items), { filter })
  }

componentWillMount() {

   this.listenForItems(this.itemsRef);
   this.getProfile();

  
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
          _key: child.key
        });
      });

      this.setState({
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

 


   // Get User Credentials
async getProfile() {    
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
     saveTodo() {

        // Set Mobile
        if (this.state.uid && this.state.todoForm) {
            Database.setUserTodo(this.state.uid, this.state.todoForm);
        }

    }


  render() {
   
    return (
      <View style={styles.container}>

        <View style={{flex: 1}}>

                    <View style={{flex: 1,flexDirection: 'column', margin: 0, padding: 0, backgroundColor: '#F00'}}>
                      {/*<Image source={require('../assets/images/hero2.png')}
                      style={{flex: 1, alignSelf: 'stretch',
    width: null}}></Image>*/}
                    </View>
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
         <Footer
          onFilter={this.handleFilter}
          filter={this.state.filter}/>
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
      <ListItem item={item} imageLink={item.photo} onPress={onPress} />
    );
  }
}