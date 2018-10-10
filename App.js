import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
/**
 * createSwitchNavigator - Only Show ONE SCREEN/STACK at one time
 *  1. Loading Screen
 *  2. Authentication StackNavigator
 *    - Auth Welcome Screen
 *    - SignIn Screen
 *    - Sign Up Screen
 *  3. AppDrawerNavigator
 *    - App StackNavigator (to give a common header to the tabs)
 *       - App TabNavigator
 *         - Home Tab
 *         - Settings Tab
 */


import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import ScanQRcodeScreen from './screens/ScanQRcodeScreen'

const AuthStackNavigator = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
}, { initialRouteName: 'SignIn' })

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: () => (
        <Icon name="home" size={24} color="#3079DD" />
      )
    }
  },
  ScanQRcode: {
    screen: ScanQRcodeScreen,
    navigationOptions: {
      tabBarLabel: 'SCANQRCODE',
      tabBarIcon: () => (
        <Icon name="camera" size={24} color="#3079DD" />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'SETTINGS',
      tabBarIcon: () => (
        <Icon name="settings" size={24} color="#3079DD" />
      )
    }
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Your App',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="menu" size={24} color="#3079DD" />
          </View>
        </TouchableOpacity>
      )
    })
  }
})

AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = routeName;

  return {
    headerTitle,
  };
};

// const CustomDrawerComponent = (props) => (
//   <SafeAreaView style={{ flex: 1 }}>
//     <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
//       <Image source={require('./screens/imgs/dental.jpg')} style={{ height: 120, width: 120, borderRadius: 60 }} />
//     </View>
//     <ScrollView>
//       <DrawerItems {...props} />
//     </ScrollView>
//   </SafeAreaView>
// )

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
},
  {initialRouteName: 'Home' },
  {
    // contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: 'orange'
    }
  }
);


export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});