import React from 'react';
import { ScrollView, StyleSheet, Text, ListView, AsyncStorage, ActivityIndicator, View } from 'react-native';


import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Database from '../api/database';
import LogItem from '../components/LogItem';
import ExerciseItem from '../components/ExerciseItem'
var _ = require('lodash');

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Diary',
    },
  };

  componentWillMount() {
     AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({
          exercises
        });
      } catch(e) {
        console.log(e);
      }
  })
  
  }
  componentDidMount() {
    
      Database.listeningForLogs(this.state.currentDay, (log) => {
        this.setState({
          dateLog: log,
          dataSource: this.state.dataSource.cloneWithRows(log),
      }, function dateLogUpdated () {
         this.filterExercises();
      })
      if (this.state.dataSource.getRowCount() !== 0) {
          this.setState({
          hasData: true,
          loading: false
      })
        }
        else {
          this.setState({
          hasData: false,
          loading: false
      })
        }
    }); 
  }

  constructor(props){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state = {
    currentDay: moment().format('MM-DD-YY'),
    currentTime: moment().format('HH:mm'),
    dateLog: '',
    dataSource: ds.cloneWithRows([]),
    exercisesSource: ds.cloneWithRows([]),
    hasData: false,
    exercises: [],
    loading: true,
  }
  this.filterExercises = this.filterExercises.bind();
  }

  onDateChange = (i) => {
    this.setState({
      loading: true,
      currentDay: i.format('MM-DD-YY'),
    }, function dateLogUpdated () {

      Database.listeningForLogs(this.state.currentDay, (log) => {
        this.setState({
          dateLog: log,
          dataSource: this.state.dataSource.cloneWithRows(log),
      }, function dateLogUpdated () {
         this.filterExercises();
      })
      if (this.state.dataSource.getRowCount() !== 0) {
          this.setState({
          hasData: true,
          loading: false
      })
        }
        else {
          this.setState({
          hasData: false,
          loading: false
      })
        }
    }); 
    }) 
  }

  _renderItem(item) {
    goToRoute = () => {
    this.props.navigator.push('exercise', {
      exercise: item
    })
  }
    return (
      <ExerciseItem item={item} imageLink={item.photo} videoLink={item.video} onPress={goToRoute}/>
    );
  }
  
  filterExercises = () => {
    var logsId = this.state.dateLog.map((item) => {
      return( _.filter(this.state.exercises, {'_key': item.id}) )
    });
    this.setState({
          exercisesSource: this.state.exercisesSource.cloneWithRows(_.flatten(logsId))
      });
      if (this.state.exercisesSource.getRowCount() > 0) {
          this.setState({
          hasData: true,
      });
        }
        else {
          this.setState({
          hasData: false,
      })
        }
};

  render() {

    const workoutList = (
      <ListView
          dataSource={this.state.exercisesSource}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        />
    )

    const emptyList = (
                <LogItem
                    titleText={'Total'}
                    title={'50'}
                    weight={120}
                />
    )

    const randomTips = (
                <Text>Try to eat more protein today to recover</Text>
    )
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
                 <CalendarStrip
                    daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#CE0707', zIndex: 10}}
                    style={{paddingTop: 20, paddingBottom: 20}}
                    calendarHeaderStyle={{color: 'black'}}
                    calendarColor={'#F5F5F5'}
                    dateNumberStyle={{color: 'black', fontSize: 15}}
                    dateNameStyle={{color: 'black'}}
                    highlightDateNumberStyle={{color: 'white', fontSize: 15}}
                    highlightDateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={(i) => this.onDateChange(i)}
                    styleWeekend={false}
                />
                 {this.state.loading && <View style={styles.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}        
              {emptyList}
              {workoutList}
              {randomTips}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testDay: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.2)"

    }
});
