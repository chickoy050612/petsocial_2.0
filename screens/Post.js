import React from 'react';
import {Text, View, Image, Modal, SafeAreaView, FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';
import ENV from '../env';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {updateDescription,updateCategory,uploadPost, updatePhoto, updateLocation} from '../actions/post.js'
import { uploadPhoto } from '../actions'
import styles from '../styles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

const DATA = [
  {
    category: 'Home',
  },
  {
    category: 'PetShops',
  },
  {
    category: 'Clinic',
  },
  {
    category: 'Products',
  },
];



class Post extends React.Component {
  

    state = {
        showModal: false,
        locations: [],
        showModalCategory: false,
        category:[],
        showModalPhoto: false
      }

      componentDidMount(){
        this.getLocations()
      }

      post = () => {
       this.props.uploadPost()
       this.props.navigation.navigate('Home')
     }

    // activating photo library if no photo
     onWillFocus = () => {
       
        //if(!this.props.postPhoto){
          //this.openLibrary()
          this.modalPhoto
        //}
      }
    
    
      openLibrary = async () => {
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
          const image = await ImagePicker.launchImageLibraryAsync()
          if(!image.cancelled){
            const url = await this.props.uploadPhoto(image)
            this.props.updatePhoto(url)
          }
          this.setState({showModalPhoto: false});
        }
      }
      // uploading photo from phone library

    //   setLocation = (location) => {
    //     this.setState({ showModal: false })
    //     this.props.updateLocation(location)
    //   }
    
    //   modal = () => {
    //     return (
    //       <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
    //         <SafeAreaView style={[styles.container, styles.center]}>
    //           <TouchableOpacity style={styles.border} onPress={() => this.setLocation('Philadelphia')}>
    //             <Text style={styles.gray}>Philadelphia</Text>
    //           </TouchableOpacity>
    //         </SafeAreaView>
    //       </Modal>
    //     )
    //   }

      setLocation = (location) => {
        this.getLocations();
          const place = {
            name: location.name,
            coords: {
                lat: location.geometry.location.lat,
                lng: location.geometry.location.lng
            }
            }
            this.setState({showModal: false})
            this.props.updateLocation(place)
      }

      setCategory = (category) => {
        const option = {
          category: category.category
          }
          this.setState({showModalCategory: false})
          this.props.updateCategory(option)
      }

      setPhoto = () => {
          this.setState({showModalPhoto: false})
      }
    
      goCamera = () => {
        this.setState({showModalPhoto: false})
        this.props.navigation.navigate('Camera')
      }

      

      getLocations = async () =>{
        this.setState({showModal: true})
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if(permission.status === 'granted'){
          const location = await Location.getCurrentPositionAsync();
          //const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${ENV.googleApiKey}`
          const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=AIzaSyCORYOMnLHssQ52z1le5FWLzn5A0cAftpY`
          
          const response = await fetch(url)
          const data = await response.json()
          this.setState({locations: data.results})
        }
    
      }

      modal = () => {
       return(
      <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
        <SafeAreaView  style={[styles.container, styles.center]}>
          <FlatList 
            keyExtractor={(item) => item.id}
            data = {this.state.locations}
            renderItem= {({item}) =>(
                <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text style={styles.gray}>{item.name}</Text>
                <Text style={styles.gray}>{item.vicinity}</Text>
                </TouchableOpacity>
            )}/>
        </SafeAreaView>
      </Modal>
        )
      }

     
      modalCategory = () => {
        return(
       <Modal animationType='slide' transparent={false} visible={this.state.showModalCategory}>
         <SafeAreaView  style={[styles.container, styles.center]}>
           <FlatList 
              keyExtractor={(item) => item.id}
              data = {DATA}
              renderItem= {({item}) =>(
              <TouchableOpacity style={styles.border} onPress={() => this.setCategory(item)}>
              <Text style={styles.gray}>{item.category}</Text>
              </TouchableOpacity>
            )}
            />
         </SafeAreaView>
       </Modal>
         )
       }

       modalPhoto = () => {
        return(
       <Modal animationType='slide' transparent={false} visible={this.state.showModalPhoto}>
         <SafeAreaView  style={[styles.container]}>
           
              <TouchableOpacity style={styles.border} onPress={() => this.goCamera()} >
                <Text style={styles.gray}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.openLibrary()}}>
                <Text style={styles.gray}>Library</Text>
              </TouchableOpacity>
           
         </SafeAreaView>
       </Modal>
         )
       }
    

    render() {
        
        return (
            <View style={styles.container}>
            
            
            {this.modal()}{this.modalCategory()}
                <View style={[styles.row,styles.space]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')} >
                     <Ionicons style={{marginRight: 20}} name={'ios-camera'} size={50} color='#e63b7a'/>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => this.openLibrary()} >
                     <MaterialCommunityIcons style={{marginLeft: 20}} name={'image'} size={50} color='#e63b7a'/>
                 </TouchableOpacity>
              </View>

                
                  <Image style={styles.postPhoto} source={{uri: this.props.post.postPhoto}}/>
              
                <TextInput
                    style={styles.border} //to set input border
                    value={this.props.post.description}
                    onChangeText={text => this.props.updateDescription(text)}
                    placeholder ='Description'
                    autoCapitalize = 'none'
                />
            
                <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
                    <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModalCategory: true })}>
                    <Text style={styles.gray}placeholder ='Selectt a Category' >{this.props.post.category ? this.props.post.category.category : 'Select a Category'}</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.button} onPress={this.post}>
                    <Text style={{color:'#FFF'}}>Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
     
// {/* <TouchableOpacity style={styles.border} onPress={() => this.setState({showModal: true})}>
// <Text style={styles.gray}>{this.props.post.location ? this.props.post.location : 'Add a Location'}</Text>
// </TouchableOpacity> */}

//<TouchableOpacity style={styles.button} onPress={this.props.uploadPost}></TouchableOpacity> <-- without passing a value
//<TouchableOpacity style={styles.button} onPress={(test)=> this.props.uploadPost}></TouchableOpacity> <-- passing a value


//redux - global state/variable (passing of variables)
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({updateDescription,updateCategory,uploadPost, updateLocation, uploadPhoto, updatePhoto},dispatch)
}

const mapStateToProps = (state) => {
    return {
        post:state.post,
        user:state.user
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Post) 


//<NavigationEvents onWillFocus={this.onWillFocus}/>
//{this.modal()}{this.modalCategory()}