import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert, Button, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import axios from 'axios'
import { httpClient } from './HttpClient'
import { StackActions, NavigationActions } from 'react-navigation';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home Screen',
  };

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      feedData: '',
      dataSource: this.list
    }
    this.feed()

    httpClient
      .get('/feed')
      .then(result => {
        Alert.alert(JSON.stringify(result.data))
      })
  }

  goHomeScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async logout() {
    await AsyncStorage.removeItem('token')
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async feed() {
    this.state.feedData = {
      username: "loading...",
      firstname: "loading...",
      lastname: "loading...",
      phone: "loading...",
      address: "loading...",
      allergy_history: "loading...",
      birthday: "loading...",
      record_date: "loading...",
    }
    const token = await AsyncStorage.getItem("token")

    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/myuser',
      { headers: { 'x-access-token': token } })
      .then(response => {
        const result = response.data
        this.setState({ feedData: result })
        console.log(this.state.feedData)
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error))
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.fronData}> Account: {this.state.feedData.username} </Text>
        <Text style={styles.fronData}> ชื่อ: {this.state.feedData.firstname} </Text>
        <Text style={styles.fronData}> นามสกุล: {this.state.feedData.lastname} </Text>
        <Text style={styles.fronData}> เบอร์โทร: {this.state.feedData.phone} </Text>
        <Text style={styles.fronData}> ที่อยู่: {this.state.feedData.address} </Text>
        <Text style={styles.fronData}> ประวัติแพ้ยา: {this.state.feedData.allergy_history} </Text>
        <Text style={styles.fronData}> วันเกิด: {this.state.feedData.birthday} </Text>
        <Text style={styles.fronData}> วันที่เป็นสมาชิก: {this.state.feedData.record_date} </Text>
        <TouchableHighlight
          onPress={() => this.logout()}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableHighlight>
      </View>
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
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    paddingTop: 80
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


export default HomeScreen;
