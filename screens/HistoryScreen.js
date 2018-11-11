import React, { Component } from 'react'
import {
  Alert,
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

export class HistoryScreen extends Component {
  static navigationOptions = {
    title: "History"
  }
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      loading: false,
      tableHead: ['หัวข้อ', 'รายละเอียด', 'วันที่', 'แพทย์']
    }
  }

  componentDidMount() {
    this.feedQueueSuccess()
  }

  async feedQueueSuccess() {
    const id = await AsyncStorage.getItem("id")
    axios.get(`https://immense-tundra-42908.herokuapp.com/api/v1/queue?customer_id=${id}&status=success`)
      .then(response => {
        const result = response.data
        this.setState({ queue: result, loading: true })
        console.log(this.state.queue)
      })
      .catch(error => {
        console.log(error);
      });
  }

  lists(queue) {
    console.log(queue)
    var temp = queue.map(data => {
      return (
        <View key={data._id} >
          <Card title="ประวัติทำฟัน">
            {<ListItem roundAvatar title={'วันพบแพทย์: ' + data.appointment_date} leftIcon={{ name: 'alarm' }} />}
            <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
            {<ListItem roundAvatar title={'หัวข้อ: ' + data.title} leftIcon={{ name: 'title' }} />}
            <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
            {<ListItem roundAvatar title={'รายละเอียด: ' + data.description} leftIcon={{ name: 'pageview' }} />}
            <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
            {<ListItem roundAvatar title={'บันทึกการรักษา: ' + data.treatment_history} leftIcon={{ name: 'history' }} />}
            <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
            {<ListItem roundAvatar title={'ราคา: ' + data.price} leftIcon={{ name: 'payment' }} />}
            <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
            {<ListItem roundAvatar title={'แพทย์: ' + data.doctor.firstname + ' ' + data.doctor.lastname} leftIcon={{ name: 'person' }} />}
          </Card>
        </View>
      )
    })
    return temp
  }

  render() {
    if (this.state.loading && this.state.queue.length > 0) {
      return (
        <ScrollView>
          {this.lists(this.state.queue)}
        </ScrollView>
      )
    }
    else if (this.state.loading && this.state.queue.length === 0) {
      console.log(this.state.queue.length)
      return (
        <ScrollView>
          {Alert.alert("คุณยังไม่มีประวัติการรักษา!")}
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView>

        </ScrollView>
      )
    }
  }

}

export default HistoryScreen

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