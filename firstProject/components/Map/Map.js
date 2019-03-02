import React, {
  Component
} from 'react';
import MapView, {
  PROVIDER_GOOGLE
} from 'react-native-maps'


export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationResult: null,
      location: {
        coords: {
          latitude: 24.926294,
          longitude: 67.022095
        }
      },
      marker: false,
      routes: null,
      coords: null,
      origin: null,
      destination: {
        latitude: 24.946294,
        longitude: 67.032095
      }
    };
  }


  render() {
    const { location, marker, origin, destination } = this.state;
    return ( 
    <MapView 
      provider={ PROVIDER_GOOGLE }
      style={{flex: 1}}
      region={
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      }
      showsUserLocation = {
        true
      }
      />
    );
  }
}