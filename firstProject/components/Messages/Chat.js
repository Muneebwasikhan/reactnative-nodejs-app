import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { AsyncStorage } from "react-native";
import { ListItem, Header, Avatar, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import Axios from "axios";
import path from "../../config/Path";

class Chat extends Component {
  state = {
    refreshing: false,
    text: "",
    chat: [
      {
        user: "user",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message:
          " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfals ;skdjf lsk flsk joasi slkd jasi jfals ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "user",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "user",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message:
          " Munee ;skdjf lsk flsk joasi slkd jasi jfalshan ;skdjf lsk flsk joasi slkd jasi jfals ;skdjf lsk flsk joasi slkd jasi jfals ;skdjf lsk flsk joasi slkd jasi jfalsasi slkd jasi jfalsd "
      },
      {
        user: "musere",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message:
          " Muneeb wasi khan ;skdjf lsk flsk wasi khan ;skdjf lsk flsk wasi khan ;skdjf lsk flsk wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "user",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message:
          " Muneeb ;skdjf lsk flsk joasi han ;skdjf lsk flsk joasi ;skdjf lsk flsk joasi ;skdjf lsk flsk joasi ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "user",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "me",
        message: " Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      },
      {
        user: "user",
        message:
          " Muneeb wasi khan Muneeb wasi khan Muneeb wasi khan Muneeb wasi khan Muneeb wasi khan Muneeb wasi khan ;skdjf lsk flsk joasi slkd jasi jfalsd "
      }
    ]
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

  componentWillMount() {
    // this.refs._scrollView.scrollToEnd();
    console.log(this.props.propsData);
    this._asyncGetRegStudent().then(user => {
      console.log(user)
      this.setState({ userData: user.studentData })
    });
    this.getChat();

  }

  sendMessage = () => {
    const { text, userData, chatObj } = this.state;
    // console.log(text);
    // console.log(userData);
    // console.log({ message: text, user_id: userData._id, chatObj: chatObj._id });
    // message: req.body.message,
    // senderId: req.body.user_id,
    // chatId: req.body.chatId
    Axios.post(path.SEND_MESSAGE,{ message: text, user_id: userData._id, chatObj: chatObj._id }).then(res => {
      console.log(res);
    })
  }
  getChat = () => {
    const { person1, person2 } = this.props.propsData;
    console.log({ person1_id: person1,person2_id: person2 });
    console.log(path.GET_CHAT);
    Axios.post(path.GET_CHAT,{ person1_id: person1,person2_id: person2 }).then(res => {
      console.log(res.data);
      if(res.data.success){
        const { chatObj, messagesArray } = res.data.data;
        this.setState({ chatObj, messagesArray });
      }
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  render() {
    let behavior = "";
    if (Platform.OS == "ios") {
      behavior = "padding";
    }
    const { chat, text } = this.state;

    return (
      <View style={styles.container}>
        <Header
          placement={"left"}
          backgroundColor="#6200EE"
          containerStyle={{ height: 80 }}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon name="chevron-left" type="font-awesome" color="white" />
            </TouchableOpacity>
          }
          centerComponent={
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
        <View
          style={{ flex: 1 }}
        >
          <ScrollView
          ref="_scrollView">
            {chat.map(val => {
              if (val.user == "me") {
                return <MyChat message={val.message} />;
              } else if (val.user == "user") {
                return <UserChat message={val.message} />;
              }
            })}
          </ScrollView>
        </View>
        <KeyboardAvoidingView behavior={behavior}>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.textBox}
              multiline
              onChangeText={text => this.setState({ text })}
              value={text}
              placeholder="Enter you text here"
            />

            <TouchableOpacity style={[styles.sendBtn]}>
              <Button
                style={{ color: "#fff" }}
                icon={<Icon name="send" size={15} color="white" />}
                onPress={() => {
                  this.sendMessage();
                  // chat.push({ user: "me", message: text });
                  // this.setState({ chat, text: "" }, () => {
                  //   setTimeout(() => {
                  //     this.refs._scrollView.scrollToEnd();
                  //   }, 10);
                  // });
                }}
                buttonStyle={{ backgroundColor: "#6200EE" }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myMessageTextCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10
  },
  myMessageTextBody: {
    backgroundColor: "#6200EE",
    maxWidth: "80%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden"
  },
  myMessageText: {
    fontSize: 15,
    color: "white"
  },
  userTextCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10
  },
  userTextBody: {
    backgroundColor: "lightgray",
    maxWidth: "80%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden"
  },
  userText: {
    fontSize: 15,
    color: "gray"
  },
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#dadfea"
  },
  textBox: {
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 14,
    flex: 1,
    paddingVertical: 5,
    marginLeft: 5
  },
  sendBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5
  },
  enabledBtn: {
    backgroundColor: "#476DC5"
  },
  disabledBtn: {
    backgroundColor: "#89a9f4"
  }
});

const MyChat = props => (
  <View style={styles.myMessageTextCont}>
    <View style={styles.myMessageTextBody}>
      <Text style={styles.myMessageText}>{props.message}</Text>
    </View>
  </View>
);

const UserChat = props => (
  <View style={styles.userTextCont}>
    <View style={styles.userTextBody}>
      <Text style={styles.userText}>{props.message}</Text>
    </View>
  </View>
);

export default Chat;
