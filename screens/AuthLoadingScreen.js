import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from "react-native";

class AuthLoadingScreen extends Component {

    constructor() {
        super()
        this.loadApp()
    }

    loadApp = async () => {
        const token = await AsyncStorage.getItem('token')

        this.props.navigation.navigate(token ? 'App' : 'Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});