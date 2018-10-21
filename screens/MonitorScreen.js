import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import axios from 'axios'

export class MonitorScreen extends Component {
  static navigationOptions = {
    title: "Monitor"
  }

  constructor(prop) {
    super(prop)
    this.state = {
      loading: false,
      feed_data: [],
      feed_queue_booking: [],
      feed_queue_active: [],
      number_of_room1: '',
      number_of_room2: '',
      number_of_room3: ''
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.feed(), 1000);
    this.timerID2 = setInterval(() => this.feed2(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerID2);
    clearInterval(this.timerID3);
  }

  feed() {
    let time = new Date()
    let day = time.getDate()
    let mount = time.getMonth() + 1
    let year = time.getFullYear()
    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/monitor/queue?day=' + day + '&month=' + mount + '&year=' + year)
      .then(response => {
        const result = response.data
        this.setState({ feed_data: result, loading: true })
        // console.log(this.state.feed_data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  feed2() {
    let time = new Date()
    let day = time.getDate()
    let mount = time.getMonth() + 1
    let year = time.getFullYear()
    // console.log(day)
    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/queue/booking?day=' + day + '&month=' + mount + '&year=' + year)
      .then(response => {
        const result = response.data
        this.setState({ feed_queue_booking: result })
        const temp1 = result.filter((member) => {
          return member.room_usage.room_name == 1
        })
        const temp2 = result.filter((member) => {
          return member.room_usage.room_name == 2
        })
        const temp3 = result.filter((member) => {
          return member.room_usage.room_name == 3
        })
        this.setState({
          number_of_room1: temp1.length,
          number_of_room2: temp2.length,
          number_of_room3: temp3.length,
          loading: true
        })
        console.log(temp1.length + " " + temp2.length + " " + temp3.length)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.feed_data.length > 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>

          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <View style={{ flex: 1, backgroundColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
              <Text>ห้องหมายเลข</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center' }}>
              <Text>1</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center' }}>
              <Text>2</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
              <Text>3</Text>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <View style={{ flex: 1, backgroundColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
              <Text>คิวที่กำลังทำฟัน</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.feed_data[0].room1.active.room_usage.room_name}{this.state.feed_data[0].room1.active.priority}-{this.state.feed_data[0].room1.active.queue_order}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.feed_data[1].room2.active.room_usage.room_name}{this.state.feed_data[1].room2.active.priority}-{this.state.feed_data[1].room2.active.queue_order}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.feed_data[2].room3.active.room_usage.room_name}{this.state.feed_data[2].room3.active.priority}-{this.state.feed_data[2].room3.active.queue_order}</Text>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <View style={{ flex: 1, backgroundColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
              <Text>จำนวนคิวที่รอทำฟัน</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.number_of_room1}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.number_of_room2}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.number_of_room3}</Text>
            </View>
          </View>

        </View>
      )
    }
    else {
      return (
        <View>

        </View>
      )
    }
  }

}

export default MonitorScreen