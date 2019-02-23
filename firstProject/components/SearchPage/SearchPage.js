import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Header, SearchBar } from "react-native-elements";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import path from "../../config/Path";
import { Dropdown } from "react-native-material-dropdown";
import _ from "lodash";

class SearchPage extends Component {
  state = {
    updateSearch: "",
    category: ''
  };
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };
  componentDidMount() {
    axios.post(path.GET_SERVICES).then(res => {
      console.log(res.data.data);
    })
  }

  getData = (cate) => {
    axios.post(path.GET_SERVICES,{category: cate}).then(res => {
      console.log(res);
    })
  }
  searchItem = () => {
    const { updateSearch, category } = this.state;  
    console.log(updateSearch,category)
  };

  render() {
    const { userServices, userData, updateSearch } = this.state;
    let data = [
      {
        value: "All"
      },
      {
        value: "Mechanic"
      },
      {
        value: "Plumber"
      },
      {
        value: "Car painter"
      },
      {
        value: "Labour"
      },
      {
        value: "Electrician"
      },
      {
        value: "AC Technician"
      }
    ];
    return (
      <View>
        {/* <Header backgroundColor= '#6200EE'> */}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch =>
            this.setState({ updateSearch }, () => {
              // console.log(updateSearch)
              // _.debounce(() => this.searchItem(),300)
              this.searchItem();
            })
          }
          containerStyle={{ width: "100%", backgroundColor: "#6200EE" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          inputStyle={{ color: "#6200EE" }}
          value={updateSearch}
        />
        <Dropdown
          label="Categories"
          data={data}
          fontSize={15}
          textColor="#6200EE"
          containerStyle={{
            width: "100%",
            backgroundColor: "#fff",
            padding: 0,
            margin: 0,
            border: 3,
            borderColor: "white"
          }}
          overlayStyle={{ border: 0 }}
          shadeOpacity={0}
          selectedItemColor="#6200EE"
          itemColor="gray"
          onChangeText={category => this.setState({category})}
        />
        {/* </Header> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* <Text style={styles.welcome}>SearchPage</Text> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
    width: "100%"
  }
});

export default SearchPage;
