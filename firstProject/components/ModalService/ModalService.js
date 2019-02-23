import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,TouchableOpacity, Alert} from 'react-native';
import { Icon,Header } from 'react-native-elements';

class ModalService extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { modalData } = this.state;
    console.log(modalData);
    return (
      // <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Header
          backgroundColor= '#6200EE'
  placement="left"
  leftComponent={
  <TouchableOpacity
  onPress={() => {this.props.modalInvisible(false)}}>
<Icon
  
    name="angle-down"
    type="font-awesome"
    size={30}
    color='#fff'
  />
  </TouchableOpacity>
  }
/>
          {/* <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.props.modalInvisible(!this.props.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View> */}
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