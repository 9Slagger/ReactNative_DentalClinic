'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import {
    AppRegistry,
    Alert,
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanQRcodeScreen extends Component {
    static navigationOptions = {
        title: "Scan QR"
    }

    onSuccess(e) {
        this.receiveQ()
        // Alert.alert(
        //     'Alert Title',
        //     e.data,
        //     [
        //         { text: 'Close', onPress: () => this.receiveQ(), style: 'cancel' },
        //     ],
        //     { cancelable: false }
        // )
    }

    async receiveQ() {
        const token = await AsyncStorage.getItem("token")
        var params = this.props.navigation.getParam("indata")
        const { id } = params
        const data = { "id": id }
        axios.put('https://immense-tundra-42908.herokuapp.com/api/v1/queue/booking', data, { headers: { 'x-access-token': token } })
            .then(response => {
                const result = response.data
                Alert.alert("รับคิวสำเร็จ หมายเลขคิวของคุณคือ "+"-"+result.priority+result.queue_order) //เหลือใส่หมายเลขห้องหน้า-
            })
            .catch(error => {
                Alert.alert("catch")
            });
    }


    scan = () => {
        this.scanner.reactivate()
    }

    render() {
        return (
            <QRCodeScanner
                ref={(node) => { this.scanner = node }}
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}><Text style={styles.textBold}>
                        สแกน QR Code ที่จอ Monitor เพื่อรับคิว!
                    </Text></Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={this.scan}>
                        <Text style={styles.buttonText}>สแกนซ้ำ</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});
// fix