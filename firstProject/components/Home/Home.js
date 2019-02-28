import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { AsyncStorage } from "react-native";
import Axios from "axios";
import path from "../../config/Path";
import ModalService from "../ModalService/ModalService";
import HomeItemCard from "./HomeItemCard";


class Home extends Component {
  state = {
    feed: [],
    refreshing: false,
    modalVisible: false,
    modalData: {}
  };

  _onRefresh = () => {
    this.cdmFUn();
  };

  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      console.log(user);
    } catch (er) {
      console.log(er);
    }
  };
  componentDidMount() {
    this.cdmFUn();
  }

  cdmFUn = () => {
    this.setState({ refreshing: true });
    this._asyncGetRegStudent().then(stdData => {
      Axios.post(path.GET_SERVICES).then(data => {
        if (data.data.success) {
          console.log(data.data.data);
          this.setState({ feed: data.data.data, refreshing: false });
        } else {
          this.setState({ refreshing: false });
          alert("An error occur!");
        }
        console.log(data);
      });
    });
  };

  render() {
    const { feed, modalVisible, modalData } = this.state;
    return (
      <View>
        <ModalService
          modalData={modalData}
          modalVisible={modalVisible}
          modalInvisible={visible => {
            this.setState({ modalVisible: visible });
          }}
        />

        <ScrollView
          style={{ minHeight: 50 }}
          automaticallyAdjustContentInsets={true}
          style={[styles.screen]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {feed.map(value => (
            <HomeItemCard
              cardData={{ value }}
              changeState={paramsState => {
                this.setState(paramsState);
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f0f1f5"
    // padding: 12,
  },
  // buttonIcon: {
  //   marginRight: 7,
  //   fontSize: 19.7
  // },
  // footer: {
  //   marginHorizontal: 16
  // },
  // avatar: {
  //   width: 42,
  //   height: 42,
  //   borderRadius: 21,
  //   marginRight: 17
  // },
  // dot: {
  //   fontSize: 6.5,
  //   color: "#0000008e",
  //   marginLeft: 2.5,
  //   marginVertical: 10
  // },
  // floating: {
  //   width: 56,
  //   height: 56,
  //   position: "absolute",
  //   zIndex: 200,
  //   right: 16,
  //   top: 173
  // },
  // footerButtons: {
  //   flexDirection: "row"
  // },
  // overlay: {
  //   justifyContent: "flex-end",
  //   paddingVertical: 23,
  //   paddingHorizontal: 16
  // }
});

export default Home;
