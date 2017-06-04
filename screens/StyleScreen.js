import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Common from "../constants/common";
import ExerciseItem from "../components/ExerciseItem";
import Tag from '../components/Tag';
import BigTag from '../components/BigTag';
import {Grid, Row, Col} from 'react-native-elements';
import Layout from '../constants/Layout';
import Theme from '../constants/Theme';
import LogItem from '../components/LogItem';
import ProgramItem from '../components/ProgramItem';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from "victory-native";
export default class StyleScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  static route = {
    navigationBar: {
      title: 'Styles Screen',
    },
  };
  
  render() {
    let exerciseExample1 = {
        videoLink: 'https://',
        photo: 'id1',
        name: 'Incline Bench Dumbbell Press',
        muscles: 'Back',
        type: 'Isolating',
        own: true
    }
    let exerciseExample2 = {
        videoLink: 'https://',
        photo: 'id2',
        name: 'Scott Curl Machine',
        muscles: 'Biceps',
        type: 'Basic',
        own: true
    }
    let exerciseExample3 = {
        videoLink: 'https://',
        photo: 'id3',
        name: 'Flat Bench Dumbbell Press',
        muscles: 'Triceps',
        type: 'Basic',
        own: true
    }

const data = [
    {day: 1, exercises: 5},
    {day: 2, exercises: 6},
    {day: 3, exercises: 4},
    {day: 4, exercises: 0},
    {day: 5, exercises: 7},
    {day: 6, exercises: 5},
    {day: 7, exercises: 3}
  ];

const LineData = [
    {day: 1, weight: 150},
    {day: 2, weight: 340},
    {day: 3, weight: 500},
    {day: 4, weight: 670},
    {day: 5, weight: 840},
    {day: 6, weight: 1000},
    {day: 7, weight: 1100}
  ];
    return (
      <ScrollView>  
        <Text style={Common.darkTitleDisplay}>Typography</Text>
        <View style={[Common.container, Common.sectionBorder]}>
            <Text style={Common.darkTitleH1}>H1 heading for section titles</Text>
            <Text style={Common.darkTitleH2}>H2 heading for exercise titles</Text>
            <Text style={Common.darkTitleH3}>H3 heading for questions</Text>
            <Text style={Common.darkBodyText}>This is body text for exercises descriptions, instructions, copy, helplines and comments.</Text>
        </View>
        <Text style={Common.darkTitleDisplay}>Containers</Text>
        <View style={[Common.container, Common.sectionBorder]}>
            <Text style={Common.darkTitleH1}>Inline container</Text>
            <Text style={Common.darkBodyText}>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</Text>
            <Text style={Common.darkBodyText}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</Text>
        </View>
        <View style={[Common.container, Common.sectionBorder, Common.centered]}>
            <Text style={Common.darkTitleH1}>Centered container</Text>

            <Text style={[Common.darkBodyText, Common.centeredText]}>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</Text>
        </View>
        <Text style={Common.darkTitleDisplay}>Components</Text>
        <View style={[Common.containerLeft, Common.sectionBorder]}>
            <ExerciseItem
            item={exerciseExample1}
            imageLink={exerciseExample1.photo}
            videoLink={exerciseExample1.video}
            />
            <ExerciseItem
            item={exerciseExample2}
            imageLink={exerciseExample2.photo}
            videoLink={exerciseExample2.video}
            />
            <ExerciseItem
            item={exerciseExample3}
            imageLink={exerciseExample3.photo}
            videoLink={exerciseExample3.video}
            />
        </View>
        <Text style={Common.darkTitleDisplay}>Statistics</Text>
        <View style={[Common.container, Common.sectionBorder]}>
            <Tag title={'item 1'} content={'Biceps'} color={'#000'}/>
            <Tag title={'item 2'} content={'Biceps'} color={'#000'}/>
            <Tag title={'item 3'} content={'Biceps'} color={'#000'}/>
            <Tag title={'item 4'} content={'Biceps'} color={'#000'}/>
        </View>
        <Text style={Common.darkTitleDisplay}>Grids</Text>
        <View style={Common.sectionBorder}>
            <Grid style={{height: Layout.window.height * 0.4, flex: 1}}>
                <Col containerStyle={{flex: 1}} size={1}>
                   
                         <BigTag 
                        title={'days overall'}
                        content={'70'} label={'kg'}
                        color={'#000'}/>
                </Col>
                <Col size={1}>
                     <BigTag 
                        title={'days overall'}
                        content={'70'} label={'kg'}
                        color={'#000'}/>
                </Col>
                <Col size={1}>
                    <View style={Common.coloredView}>
                         <BigTag 
                        title={'days overall'}
                        content={'70'} label={'kg'}
                        color={'#000'}/>
                    </View>
                </Col>
            </Grid>
        </View>
                        <LogItem
                    titleText={'Total'}
                    title={'50'}
                    weight={120}
                />
                <View style={[Common.container, Common.sectionBorder]}>
                <View style={[Common.inlineContainer, Common.brightStats, Common.centered, Common.shadowBright]}>
                   <Grid>
                        <Col>
                            <BigTag
                                title='total exercises'
                                content={'34'}
                                color='#fff'
                                />
                        </Col>
                        <Col>
                            <BigTag
                            title='workouts done'
                            content='22'
                            color='#fff'/>
                        </Col>
                        <Col>
                            <BigTag
                                title='workouts done'
                                content='22'
                                color='#fff'/>
                        </Col>
                    </Grid> 
                </View>
                </View>
        <Grid>
            <Col size={2}>
                <View style ={[Common.minusHorizontal, Common.paddingVertical]}>
                    <VictoryChart
                        theme={Theme}
                        width={Layout.width.l}
                        height={Layout.width.m}
                        domainPadding={Layout.gutter.l}
                >

                    <VictoryAxis
                        tickValues={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
                        tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
                        offsetX={0}
                        style={{
                            grid: {stroke: "#ECECEC", strokeWidth: Layout.gutter.m + Layout.gutter.xs}
                        }}
                        />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (Math.round(x))}
                        />
                    <VictoryBar
                        style={{
                            data: {fill: "#CE0606", width: Layout.gutter.m+ Layout.gutter.xs},
                        }}
                        
                        data={data}
                        x="day"
                        y="exercises"
                        />
                </VictoryChart>
                </View>
            </Col>
            <Col size={1}>
                <View style={[Common.containerLeft, Common.paddingVertical]}>
                    <BigTag 
                        title={'days overall'}
                        content={'70'} label={'kg'}
                        color={'#000'}/>
                    <BigTag
                        title={'days overall'}
                        content={'30'}
                        color={'#000'}/>
                </View>
            </Col>
        </Grid>
        <View style={Common.containerLeft}>
            <Text style={Common.darkTitleH1}>Seasonal products</Text>
            <ScrollView
                pagingEnabled
                horizontal>
                <ProgramItem 
                    title={'Monster'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed.'}/>
                <ProgramItem
                    title={'No need a gun'}
                    description={'Lorem ipsum dolor sit amet.'}/>
                <ProgramItem
                    title={'Diamond Abs'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipisci elit.'}/>
                <ProgramItem
                    title={'Summer Chest'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipisci elit.'}/>
            </ScrollView>
        </View>
        <View>
        </View>
      </ScrollView>
    );
  }
}