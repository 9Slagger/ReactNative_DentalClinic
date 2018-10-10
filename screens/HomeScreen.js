import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight,
    ScrollView
} from "react-native";
import axios from 'axios'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queue: [],
            token: '',
            list: [
                {
                    title: 'Appointments',
                    icon: 'av-timer'
                },
                {
                    title: 'Trips',
                    icon: 'flight-takeoff'
                }
            ],
            feedData: {
                record_date: "loading...",
                description: "loading...",
                title: "loading...",
                appointment_date: "loading...",
            }
        }
        // this.ReservationQueue()
    }
    componentDidMount() {
        this.ReservationQueue()
    }

    async ReservationQueue() {
        console.log("ReservationQueue Hello")
        const id = await AsyncStorage.getItem("id")
        axios.get(`https://immense-tundra-42908.herokuapp.com/api/v1/queue?customer_id=${id}&status=appointment`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ queue: res.data })
                    console.log(this.state.queue)
                }
                else {
                    console.log("Not Found Queue")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async receiveQueue(queue_id) {
        console.log("Hello")
    }

    lists(queue) {
        var temp = queue.map(data => (
            <View key={data._id} >
            <Card title="รายการนัดหมาย">
                {<ListItem roundAvatar title={'แพทย์: ' + data.doctor.name +' '+ data.doctor.lastname} leftIcon={{ name: 'person' }} />}
                <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                {<ListItem roundAvatar title={'วันพบแพทย์: ' + data.appointment_date} leftIcon={{ name: 'alarm' }} />}
                <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                {<ListItem roundAvatar title={'หัวข้อ: ' + data.title} leftIcon={{ name: 'title' }} />}
                <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                {<ListItem roundAvatar title={'รายละเอียด: ' + data.description} leftIcon={{ name: 'pageview' }} />}
                <TouchableHighlight
                    onPress={() => this.receiveQueue(data._id)}
                    style={{
                        height: 50,
                        backgroundColor: '#00C4F5',
                        alignSelf: 'stretch',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 18, color: '#0007', alignSelf: 'center' }}>ScanQR Code เพื่อรับคิว</Text>
                </TouchableHighlight>
                </Card>
            </View>
        ))
        return temp
    }

    render() {
        return (
            <ScrollView>
                <View>{this.lists(this.state.queue)}</View>
            </ScrollView>
        )
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});