import React from 'react';
import { View, Text, StyleSheet, Image, ListView } from 'react-native';
import Divider from '../components/Divider';
import ListItem from '../components/ListItem';

export default class ExerciseScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
      }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.programName}`
      }
    },
  };
  componentWillMount() {
      this.setState({
          datasource: this.props.route.params.exercises
      })
      console.log(this.props.route.params.exercises)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text style={styles.textWhiteTitle}>{this.props.route.params.programName}</Text>
            </Image>
        </View>
        <Text>Program Program Program</Text>
        <Text>You have passed: {this.props.route.params.exerciseType}</Text>
        <Text style={styles.textBlackTitle}>Workouts</Text>
        <Divider/>
        <Text>First day exercises</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.programsContainer}/>
           <Divider/>
      </View>
    );
  }

_renderItem(item) {


    return (
      <View>
          <Text>1 + item.name</Text>
          </View>
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