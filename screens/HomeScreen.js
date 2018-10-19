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

    render() {
        return (
            <ImageBackground source={require('./imgs/dental.jpg')} style={{backgroundColor: '#FFFFFF',width: '100%', height: '40%', flex: 1, flexDirection: 'column', }}>

                <View style={{ flex: 0.4 }}></View>
                <View style={{ flex: 0.6 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMyQueueScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>รับคิว</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMyQueueScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>MyQueue</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMyQueueScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>MyQueue</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.5 }}>

                            <View style={styles.viewTouchable}>
                                <TouchableOpacity style={styles.touchable} onPress={() => this.navigateMyQueueScreen()}>
                                    <View style={styles.view}>
                                    </View>
                                    <Image
                                        source={require('./imgs/Icon.png')}
                                        style={styles.image} />
                                </TouchableOpacity>
                                <Text style={styles.textTouchable}>MyQueue</Text>
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
        fontSize: 20
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    }
});