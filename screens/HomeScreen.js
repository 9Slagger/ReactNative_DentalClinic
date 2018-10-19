import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import axios from 'axios'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class HomeScreen extends Component {
    static navigationOptions = {
        title: "Home"
    }

    constructor(props) {
        super(props)
        this.state = {
            test: { username: 'abc1', password: 'cba1' },
            queue: [],
            token: ''
        }
    }

    button1 = () => {
        return (
            <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.navigateMyQueueScreen()} style={styles.btn}>
                    <View style={styles.absoluteView}>
                        {/* <Text>title</Text> */}
                    </View>
                    <Image source={require('./imgs/Icon.png')} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.textBanner}>My Queue</Text>
            </View>
        )
    }

    navigateMyQueueScreen() {
        this.props.navigation.navigate('MyQueue')
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5,backgroundColor:'red'}}>
                        {this.button1()}
                    </View>
                    <View style={{ flex: 0.5 }}>
                        {this.button1()}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}>
                        {this.button1()}
                    </View>
                    <View style={{ flex: 0.5 }}>
                        {this.button1()}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: 100,
    },
    textBanner: {
        fontSize: 29,
        justifyContent: 'center'
    },
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    img: {
        justifyContent: 'center'
    },
    btn: {
        justifyContent: 'center'
    }
});