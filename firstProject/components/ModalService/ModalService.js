import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { Icon, Header } from "react-native-elements";

class ModalService extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalData } = this.props;
    console.log(modalData);
    return (
      // <View style={{marginTop: 22}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <Header
          backgroundColor="#6200EE"
          placement="left"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.modalInvisible(false);
              }}
            >
              <Icon
                name="angle-down"
                type="font-awesome"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          }
        />
        <ScrollView>
        {/* <Image
  source={{ uri: modalData.imageUrl }}
  style={{ width: '100%', height: 200 }}
  PlaceholderContent={<ActivityIndicator />}
/> */}
          <View>

          </View>

        </ScrollView>
      </Modal>

      //   <TouchableHighlight
      //     onPress={() => {
      //       this.props.modalInvisible(true);
      //     }}>
      //     <Text>Show Modal</Text>
      //   </TouchableHighlight>
      // </View>
    );
  }
}

export default ModalService;
