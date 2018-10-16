'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import {
    AppRegistry,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
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
        const data = { id: "5bc4799d63986600150f876c" }
        axios.post('https://immense-tundra-42908.herokuapp.com/api/v1/queue/active', data, { headers: { 'x-access-token': token } })
            .then(async response => {
                const result = response.data
                Alert.alert(result.status)
            })
            .catch(error => {
                console.log(error);
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