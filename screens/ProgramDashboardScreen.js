import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView } from 'react-native';
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
        return `Do ${params.program._key}`
      }
    },
  };
  componentWillMount() {
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises)
      });
      this._retrieveFilteredItems();
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
        <Text>You have passed: {this.state.uid}</Text>
        <Text style={styles.textBlackTitle}>Workouts</Text>
        <Divider/>
        <Text>First day exercises</Text>
        <Text>{this.props.route.params.program.days}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.programsContainer}/>
           <Divider/>
      </ScrollView>
    );
  }
_retrieveFilteredItems(filter, exercises) {
const ref = this.props.route.params.program.day1;

const filteredExercises = this.props.route.params.exercises.filter((item) => {

    return ref.split(', ').includes(item.muscles);
})
this.setState({
    dataSource: this.state.dataSource.cloneWithRows(filteredExercises)
})
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