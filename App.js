import React, { Component } from 'react';
import SettingsScreen from './screens/SettingsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ScanQRcodeScreen from './screens/ScanQRcodeScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'

const AuthStackNavigator = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
}, { initialRouteName: 'SignIn' })

var HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ScanQRcode: {screen: ScanQRcodeScreen},
}, { initialRouteName: 'Home' })

var SettingStack = createStackNavigator({
  Setting: { screen: SettingsScreen },
}, { initialRouteName: 'Setting' })

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Setting: { screen: SettingStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home'
        } else if (routeName === 'Setting') {
          iconName = 'settings'
        }
        return <Icon name={iconName} size={24} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: TabNavigator,
})
