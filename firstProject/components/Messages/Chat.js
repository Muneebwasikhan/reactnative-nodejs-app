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
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { AsyncStorage } from "react-native";
import { ListItem, Header, Avatar, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  showListOrSpinner() {
    if (this.props.fetching) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <FlatList
            inverted
            data={this.props.messages}
            renderItem={this.renderChatItem}
            keyExtractor={this.keyExtractor}
        />
    );
}
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ height: 80 }}
          leftComponent={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10
              }}
            >
              <Avatar
                size={50}
                rounded
                source={{
                  uri: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
                }}
              />
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>Muneeb khan</Text>
                <Text style={{ color: "white", fontSize: 15 }}>Online</Text>
              </View>
            </View>
          }
        />
         {/* { this.showListOrSpinner () } */}
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
                <KeyboardAvoidingView behavior={'padding'}>
                    <View style={styles.inputBar}>
                        
                        <TextInput 
                            style={styles.textBox} 
                            multiline
                            onChangeText={(text) => this.onTyping(text)}
                            ref={input => { this.textInput = input; } }
                        />

                        <TouchableHighlight 
                            style={[styles.sendBtn, styles.enabledBtn ]}
                            // disabled={this.state.disabled}
                            // onPress={this.onSendBtnPressed.bind(this)}
                        >
                            <Text style={{ color: '#fff'}}>Send</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
        {/* <View
          style={{
           flex: 1,
           backgroundColor: 'red'
          }}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
        </View>

        <View />
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
	<ScrollView>
		<View style={styles.row}>
        <View
        // style={{
        //   position: "absolute",
        //   bottom: 0,
        //   width: "100%"
        // }}
        >
          <TextInput
            style={{ ...styles.input, backgroundColor: "white" }}
            onChangeText={text => this.setState({ message: text })}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <Button buttonStyle={{ backgroundColor: "blue" }} title="SEND" />
        </View>
        </View>
	</ScrollView>
</KeyboardAvoidingView>
      */}
     
     
     
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
},
inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHoriztonal: 5,
    paddingVertical: 10,
    backgroundColor: '#dadfea'
},
textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 14,
    // paddingHoriztonal: 10,
    flex: 1,
    paddingVertical: 5,
    marginLeft: 5
},
sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5
},
enabledBtn: {
    backgroundColor: '#476DC5'
},
disabledBtn: {
    backgroundColor: '#89a9f4'
}
});

export default Chat;
