import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Route from './route/Route';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

 
  // render() {
  //   return (
  //     <View style={{...styles.hw,...styles.hh}}>
       
  //       <LoginPage />
  //     </View>
  //   );
  // }
  render() {
      return (
        <Route />
      );
    }
}

const styles = StyleSheet.create({
  hw:{
    width: '100%'
  },
  hh:{
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
