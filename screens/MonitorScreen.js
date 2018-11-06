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
import { Table, Row, Rows } from 'react-native-table-component';
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'



class MonitorScreen extends Component {
  static navigationOptions = {
    title: "Monitor"
  }
  constructor(props) {
    super(props);
    this.state = {
      room: [],
      monitor_queue: [],
      loading: false,
      tableHead: ['เลขห้อง', 'คิวปัจจุบัน', 'คิวทั้งหมด'],
      BookingQueueforme: [],
      loadingQueueforme: false
    };
  }

  async componentDidMount() {
    this.timerID = await setInterval(() => this.feedRoom(), 1000);
    this.timerID1 = setInterval(() => this.feedQueueOrder(), 1000);
    this.timerID2 = setInterval(() => this.feedBookingQueueforme(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerID1);
  }

  feedRoom() {
    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/room')
      .then(response => {
        const result = response.data
        result.sort((a, b) => parseFloat(a.room_name) - parseFloat(b.room_name));
        this.setState({ room: result })
      })
      .catch(error => {
        console.log(error);
      });
  }

  feedQueueOrder() {
    let time = new Date()
    let day = time.getDate()
    let mount = time.getMonth() + 1
    let year = time.getFullYear()
    // console.log(day)
    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/queue/booking?day=' + day + '&month=' + mount + '&year=' + year)
      .then(response => {
        const result = response.data
        const room = this.state.room
        // console.log(result)

        let monitor_queue = []
        room.forEach((data, index) => {
          monitor_queue.push([data.room_name, '-', 0])
        })

        monitor_queue.forEach((data_i, index_i) => {
          result.forEach((data_j, index_j) => {
            if (data_i[0] === data_j.room_usage.room_name) {
              monitor_queue[index_i][2]++
            }
          })
        })
        this.feedQueueActive(monitor_queue)
      })
      .catch(error => {
        console.log(error);
      });
  }

  feedQueueActive(monitor_queue) {
    let time = new Date()
    let day = time.getDate()
    let mount = time.getMonth() + 1
    let year = time.getFullYear()
    // console.log(day)
    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/queue/active?day=' + day + '&month=' + mount + '&year=' + year)
      .then(response => {
        const result = response.data

        monitor_queue.forEach((data_i, index_i) => {
          result.forEach((data_j, index_j) => {
            if (data_i[0] === data_j.room_usage.room_name) {
              let data_temp = result[index_j].room_usage.room_name + result[index_j].priority + "-" + result[index_j].queue_order
              monitor_queue[index_i][1] = data_temp
            }
          })
        })

        this.setState({ monitor_queue: monitor_queue, loading: true })
        console.log(this.state.monitor_queue)

      })
      .catch(error => {
        console.log(error);
      });
  }

  async feedBookingQueueforme() {
    const id = await AsyncStorage.getItem("id")
    axios.get(`https://immense-tundra-42908.herokuapp.com/api/v1/queue?customer_id=${id}&status=booking_queue`)
      .then(res => {
        const result = res.data
        this.setState({ BookingQueueforme: result, loadingQueueforme: true })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const data = this.state.BookingQueueforme
    if (this.state.loading && this.state.loadingQueueforme) {
      return (
        <ScrollView style={styles.container}>
          <ListItem roundAvatar title={`หมายเลขคิวปัจจุบันของคุณคือ ${this.state.BookingQueueforme[0].room_usage.room_name}${this.state.BookingQueueforme[0].priority}-${this.state.BookingQueueforme[0].queue_order}`} leftIcon={{ name: 'history' }} />
          <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />

          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.monitor_queue} textStyle={styles.text} />
          </Table>
        </ScrollView>
      )
    }
    else if (this.state.loading) {
      return (
        <ScrollView style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.monitor_queue} textStyle={styles.text} />
          </Table>
        </ScrollView>
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


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  text2: {
    fontSize: 30,
    textAlign: 'center'
  }
});