import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";
import axios from 'axios'
import { Card, ListItem, Button } from 'react-native-elements'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
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

        axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/queue?customer_id=5ba7e72a7949f00015150f03',
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
                <Card title="นัดหมายของฉัน">
                    {<ListItem roundAvatar title={'หัวข้อที่นัดหมาย: ' + this.state.feedData.title} />}
                    {<ListItem roundAvatar title={'หัวข้อที่นัดหมาย: ' + this.state.feedData.description} />}
                    {<ListItem roundAvatar title={'วันที่หนดหมาย: ' + this.state.feedData.appointment_date[0]} />}
                    {<ListItem roundAvatar title={'เวลาที่นัดหมาย: ' + this.state.feedData.appointment_date[1]} />}
                    {<ListItem roundAvatar title={'หมายเลขคิวที่: ' + this.state.feedData.queue_order} />}
                </Card>
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