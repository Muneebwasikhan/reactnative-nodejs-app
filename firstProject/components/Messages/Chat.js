import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Button
} from "react-native";
import { AsyncStorage } from "react-native";
import { ListItem, Header, Avatar } from "react-native-elements";

class Chat extends Component {
  state = {
    refreshing: false
  };
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };

  _onRefresh = () => {};

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Header
        containerStyle={{height: 80}}
          leftComponent={
            <View style={{display: 'flex',flexDirection: 'row',width: 150,justifyContent: 'center',alignItems: 'center',paddingLeft: 10}}>
 <Avatar
            // containerStyle={{ height: 60,width: 60 }}
            size={50}
              rounded
              source={{
                uri:
                  "http://images.math.cnrs.fr/IMG/png/section8-image.png"
              }}
            />
            <View style={{paddingLeft: 5}}>
              <Text style={{color: '#fff',fontSize: 20}}>Muneeb khan</Text>
              <Text style={{color: 'white',fontSize: 15}}>Online</Text>
            </View>
              </View>
           
          }
          // centerComponent={<MyCustomCenterComponent />}
          // rightComponent={<MyCustomRightComponent />}
        />

        {/* <View>
<ListItem
        leftAvatar={{ source: { uri: 'http://images.math.cnrs.fr/IMG/png/section8-image.png' } }}
        title={'Najam Shahzad'}
        subtitle={'online'}
      />
</View> */}
        {/* <ModalService modalVisible={ modalVisible } modalInvisible={(visible) => {this.setState({modalVisible: visible})}} /> */}
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {/* <Text>Chat</Text> */}
        </ScrollView>
        <View>
 <KeyboardAvoidingView 
   style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
   behavior="position"
 >
  <TextInput
    style={styles.input}
    onChangeText={text => this.setState({ message: text })}
    // value={this.state.email}
    placeholderTextColor='white'
    underlineColorAndroid='transparent'
  />
  <Button onPress={this.send} title='SEND' />
 </KeyboardAvoidingView>
</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
    width: "100%"
  },
  container: {
    backgroundColor: "white",
    padding: 0,
    margin: 0
  },
  cardStyle: {
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    marginBottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default Chat;
