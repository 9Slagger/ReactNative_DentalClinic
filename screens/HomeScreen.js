import React, { Component } from "react";
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

    navigateMyQueueScreen() {
        this.props.navigation.navigate('GetQueue')
    }

    navigateMonitorScreen() {
        this.props.navigation.navigate('Monitor')
    }

    navigatePetition() {
        Alert.alert("Coming Soon")
    }

    navigateHistory() {
        this.props.navigation.navigate('History')
    }

    render() {
        return (
            <ImageBackground source={require('./imgs/BG.jpg')} style={{ backgroundColor: '#F5F5F5', width: '100%', height: '100%', flex: 1, flexDirection: 'column', }}>

                <View style={{ flex: 0.4 }}></View>
                <View style={{ flex: 0.6 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMyQueueScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    {/* <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} /> */}
                                    <Icon name='queue' size={50} color='#CC66BB' />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>รับคิว</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMonitorScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    {/* <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} /> */}
                                    <Icon name='airplay' size={50} color='#AAFAAA' />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>ติดตามคิว</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigatePetition()}>
                                    <View style={styles.view}>
                                    </View>
                                    {/* <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} /> */}
                                    <Icon name='description' size={50} color='#66CCFF' />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>ขอเลื่อนวันนัด</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateHistory()}>
                                    <View style={styles.view}>
                                    </View>
                                    {/* <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} /> */}
                                    <Icon name='album' size={50} color='#9966CC' />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>ประวัตินัดหมาย</Text>
                            </View>

                        </View>
                    </View>

                </View>

                {/* <View style={{ flex: 0.2 }}></View> */}
            </ImageBackground>
        )
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    viewTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        fontSize: 18
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: 120,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    }
});