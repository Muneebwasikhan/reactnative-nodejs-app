import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Route from './route/Route';
import SocketIOClient from 'socket.io-client';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});




// import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'


// export default class App extends Component {
//   render() {
//     return (
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={{ flex: 1 }}
//         region={{
//           latitude: 42.882004,
//           longitude: 74.582748,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         }}
//         showsUserLocation={true}
//       />
//     );
//   }
// }


export default class App extends Component {
  constructor(props){
    super(props)
    console.log("From App")
    this.socket = SocketIOClient('https://a085829a.ngrok.io');
    this.socket.on('message', this.onReceivedMessage);
  }
  onReceivedMessage(message){
    console.log("from server====>>>",message)
  }

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
  hw: {
    width: '100%'
  },
  hh: {
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
