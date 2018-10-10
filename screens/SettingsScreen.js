import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, Alert, StyleSheet, TouchableHighlight, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'

class SettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            feedData: {
                username: "loading...",
                firstname: "loading...",
                lastname: "loading...",
                phone: "loading...",
                address: "loading...",
                allergy_history: "loading...",
                birthday: "loading...",
                record_date: "loading...",
            },
            dataSource: this.list
        }
        // this.feed()
        // httpClient
        //   .get('/feed')
        //   .then(result => {
        //     Alert.alert(JSON.stringify(result.data))
        //   })
    }
    componentDidMount() {
        this.myuser()
    }

    async myuser() {
        const token = await AsyncStorage.getItem("token")

        axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/myuser',
            { headers: { 'x-access-token': token } })
            .then(response => {
                const result = response.data
                result.birthday = result.birthday.split("T");
                result.record_date = result.record_date.split("T");
                this.setState({ feedData: result })
                console.log(this.state.feedData)
            })
            .catch(error => {
                Alert.alert(JSON.stringify(error))
                console.log(error);
            });
    }

    signOut = async () => {
        AsyncStorage.clear()
        this.props.navigation.navigate('SignIn')
    }

    render() {
        return (
            <ScrollView >

                    {<ListItem roundAvatar title={'แอเคาท์: ' + this.state.feedData.username} leftIcon={{ name: 'accessibility' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'ชื่อ: ' + this.state.feedData.firstname +' '+ this.state.feedData.lastname} leftIcon={{ name: 'person' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'เบอร์: ' + this.state.feedData.phone} leftIcon={{ name: 'phone' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'ที่อยู่: ' + this.state.feedData.address} leftIcon={{ name: 'business' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'แพ้ยา: ' + this.state.feedData.allergy_history} leftIcon={{ name: 'history' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'วันเกิด: ' + this.state.feedData.birthday[0]} leftIcon={{ name: 'today' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />
                    {<ListItem roundAvatar title={'เป็นสมาชื่อเมื่อ: ' + this.state.feedData.record_date[0]} leftIcon={{ name: 'today' }} />}
                    <View style={{ borderBottomColor: 'silver', borderBottomWidth: 0.5, }} />

                <TouchableHighlight
                    onPress={() => this.signOut()}
                    style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Logout</Text>
                </TouchableHighlight>

            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    fronData: {
        fontSize: 18,
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 10,
    },
    ontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        height: 90,
        width: '100%'
    },
    input: {
        height: 50,
        width: '100%',
        marginTop: 10,
        padding: 4,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec33'
    },
    loginButton: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 40,
        borderRadius: 10,
        justifyContent: 'center'
    },
    registerButton: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center',
    },
    registerButtonText: {
        fontSize: 18,
        color: '#0007',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
        marginBottom: 40
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});

export default SettingsScreen;