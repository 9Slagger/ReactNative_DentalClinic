import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";
import axios from 'axios'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }
    componentDidMount() {
        this.myqueue()
    }

    async myqueue() {
        const token = await AsyncStorage.getItem("token")
        const id = await AsyncStorage.getItem("id")
        axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/queue?customer_id='+id,
            { headers: { 'x-access-token': token } })
            .then(response => {
                const result = response.data
                result[0].appointment_date = result[0].appointment_date.split("T");
                this.setState({ feedData: result[0] })
                console.log(this.state.feedData)
            })
            .catch(error => {
                Alert.alert(JSON.stringify(error))
                console.log(error);
            });
    }

    render() {
        return (
            <View>
                    {<ListItem roundAvatar title={'หัวข้อที่นัดหมาย: ' + this.state.feedData.title} leftIcon={{ name: 'title' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'รายละเอียด: ' + this.state.feedData.description} leftIcon={{ name: 'description' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'วันที่หนดหมาย: ' + this.state.feedData.appointment_date[0]} leftIcon={{ name: 'date-range' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'เวลาที่นัดหมาย: ' + this.state.feedData.appointment_date[1]} leftIcon={{ name: 'update' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'หมายเลขคิวที่: ' + this.state.feedData.queue_order} leftIcon={{ name: 'queue' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                

            </View>
        );
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