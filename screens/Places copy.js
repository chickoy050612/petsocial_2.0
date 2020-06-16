import React, { Component} from 'react';
import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View,Linking, Button, Image,ImageBackground, ScrollView, FlatList} from 'react-native';
import styles from '../styles.js'
import Category from '../components/Category'
import Carousel from 'react-native-snap-carousel';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {getPosts} from '../actions/post'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { filter} from 'lodash'
const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const region = {
    latitude: 37.321996988,
    longitude: -122.0325472123455,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const Marker = MapView.Marker;
class Places extends Component {
    
    getLocationName = (pos) => {
        
        const ar = JSON.stringify(pos)
        console.log("getlocation==>",pos)


        return "jal"
      }

      getLocationCoords = (pos) => {
        
        var json = pos //{"active":{"label":"Active","value":"12"},"automatic":{"label":"Automatic","value":"8"},"waiting":{"label":"Waiting","value":"1"},"manual":{"label":"Manual","value":"3"}};
        var arr = [];
        Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
        });
        //return <ul>{arr.map(item => <MyAppChild key={item.label} label={item.label} value={item.value} />)}</ul>;
        console.log("jannelcoords",arr)
      }

    renderMarkers() {
        console.log("render===>",this.props.post.feed)
        return this.props.post.feed.map((post1, i) => (
          <Marker 
            style ={{zIndex: 0}}
            key={i}
            image={require('../assets/marker.png')}
            title={"a"}//{this.getLocationName(post.postLocation)}
            coordinate={
                  {
                    latitude: 43.01779,
                    longitude:  -81.216357
                    }
                   //console.log("haha",JSON.stringify(post1.postLocation.coords))
            
            }
          />
        ));
      }

    //   {
    //     latitude: 43.01779,
    //     longitude:  -81.216357
    //     }
    // componentDidMount(){
    //     this.props.getPosts("PetShops")
    //   }

    state = {
        region: null,
        coffeeShops: []
      };
    
      componentWillMount() {
        this.getLocationAsync();
        this.props.getPosts("PetShops");
      }

      getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
        console.log("1st region jannel====>",region)
        await this.setState({ region });
      }

    //   let array = []
    //         posts.forEach((post) => {
    //             array.push(post.data())
    //         })
    
      render() {
          
        const { region} = this.state
       
       console.log("jannelstringtify==>",JSON.stringify(this.props.post.feed))

   

    // shops =[{
    //         latitude: 43.019850,
    //         longitude: -81.215570
    //     }    ]

        //    let array = []
        //     this.props.posts.forEach((post) => {
        //         array.push(post.data())
        //     })
        

        
        console.log("2 region joanne====>",this.state.region)
        return (
          <MapView
                style={styles.container}
                region={region}
                provider={PROVIDER_GOOGLE}
                places={this.props.post.feed.postLocation}
                showsUserLocation
                showsMyLocationButton
                >
                {this.renderMarkers()}
          </MapView>
        );
      }
  
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({getPosts},dispatch)
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Places) 