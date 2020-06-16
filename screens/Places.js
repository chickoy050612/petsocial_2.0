// App.js
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import Map from '../screens/MapPlaces.js'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import YelpService from '../screens/Yelp.js';

// A placeholder until we get our own location
const region = {
  latitude: 37.321996988,
  longitude: -122.0325472123455,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

export default class App extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  }

  componentWillMount() {
      console.log("willmount");
    this.getLocationAsync();
  }

  getCoffeeShops = async () => {
    console.log("getcoffee");
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    console.log("yelp==>",coffeeShops);
    const coffeeShops = await YelpService.getCoffeeShops(userLocation);
    
    this.setState({ coffeeShops });
  };

  getLocationAsync = async () => {
    console.log("locationasync");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
      
      
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getCoffeeShops();
  }

  render() {
    const { region, coffeeShops } = this.state;
    console.log("coffee==>",this.state.coffeeShops);
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
          places={coffeeShops}
        />
      </SafeAreaView>
    );
  }
}

const styles = {
    container: {
      width: '100%',
      height: '125%'
    }
  }