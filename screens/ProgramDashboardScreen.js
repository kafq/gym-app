import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView, TouchableOpacity, Alert } from 'react-native';
import Divider from '../components/Divider';
import ListItem from '../components/ListItem';
import Database from '../api/database';

export default class ExerciseScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
          programName: 'attempt1'
      }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.program._key}`
      }
    },
  };
  componentWillMount() {
     
  }
  componentDidMount() {
      let uid = this.props.route.params.uid;
      Database.getUserProgram(uid, (programName) => {
          this.setState({
              programName
          })
      })
       this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises)
      });
      //this._retrieveFilteredItems();
  }

  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text style={styles.textWhiteTitle}>{this.props.route.params.program._key}</Text>
            </Image>
        </View>
        <Text>You have passed: {this.props.route.params.uid}</Text>
        {this._displayEnrollButton()}
        {this._displayLeaveButton()}
        <Text>Program name: {this.state.programName}</Text>
        <Text style={styles.textBlackTitle}>Workouts</Text>
        <Divider/>
            {/*<Text>First day exercises</Text>
            <Text>{this.props.route.params.program.days}</Text>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.programsContainer}/>
            <Divider/>*/}
            {this._retrieveFilteredItems()}
      </ScrollView>
    );
  }

_retrieveFilteredItems(filter, exercises) {

    let days = this.props.route.params.program.days;
    console.log('Number of days in program: ' + days);
    let newArr = this.props.route.params.exercises.sort(this.compare('muscles'));
    for ( i=1; i<=days; i++ ) {
        console.log('Counter is: ' + i);
        let day = 'day' + i;
        let ref = this.props.route.params.program[day];
        console.log('Ref is: ' + ref)

        const filteredByDay = this.props.route.params.exercises.filter((item) => {
            return ref.split(', ').includes(item.muscles);
        })

        const filteredByNumber = this.filterByNumber(filteredByDay, 2);
        
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(filteredByNumber)
        })

        return (
            <View>
                <Text>{i} day exercises</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.programsContainer}/>
            </View>
        )
    }
}

filterByNumber = (arrayToFilter, n) => {
  let muscleToCompareWith = 'brain';
  let counter = 1;
  let filtered = [];
  arrayToFilter.forEach((item) => {
    if ((item.muscles !== muscleToCompareWith)) {
      
      counter = 1;
      muscleToCompareWith = item.muscles;
      filtered.push(item);
      
    }
    else if ((item.muscles === muscleToCompareWith) && (counter < n)) {
      filtered.push(item);
      counter++;
    }
  });
  console.log(filtered);
  return filtered;
}


_displayEnrollButton() {
    enrollProgram = () => {
        Database.enrollIntoProgram(this.props.route.params.uid, this.props.route.params.program)
    }
    goToRoute = () => {
    this.props.navigator.push('editProgramDash', {
      program: this.props.route.params.program,
      uid: this.props.route.params.uid
    })
  }
    switch (this.state.programName) {
        case '':
            return(
                <View>
                    <TouchableOpacity onPress={enrollProgram}><Text>ENROLL RIGHT NOW</Text></TouchableOpacity>
                </View>
            );
        case this.props.route.params.program._key:
            return(
                <View>
                    <Text>THIS YOUR PROGRAM</Text>
                    <TouchableOpacity onPress={goToRoute}><Text>EDIT THE PROGRAM</Text></TouchableOpacity>
                </View>

            );
        default: 
            return(
                <View>
                    <Text>DEFAULT CASE</Text>
                </View>
            );
    }
}

_displayLeaveButton() {
    leaveProgram = () => {
        Alert.alert(
            'Leave Program',
            'You are about to leave your program, are you sure?',
            [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
                { text: 'Leave Program', onPress: () => {Database.leaveProgram(this.props.route.params.uid)} }
            ]
        );
    }
    switch (this.state.programName) {

        case this.props.route.params.program._key:
            return(
                <View>
                    <TouchableOpacity onPress={leaveProgram}><Text>LEAVE PROGRAM</Text></TouchableOpacity>
                </View>
            );
        default: 
            return(
                <View/>
            );
    }
}

compare = (property) => {
    return (a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    }
}
_renderItem(item) {


    return (
      <ListItem item={item} imageLink={item.photo}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      marginBottom: 10
  },
  textWhite: {
      color: '#fff'
  },
  textWhiteTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
  },
  textBlackTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000'
  }
});