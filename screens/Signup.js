import React from 'react';
import { Text, View, Image } from 'react-native';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {updatePhoto,updateEmail,updatePassword,updateUsername,updateBio,updatePetname,updateBreed, signup, updateUser} from '../actions/user.js'
import { uploadPhoto } from '../actions'
import styles from '../styles.js'
import { TextInput, TouchableOpacity  } from 'react-native-gesture-handler';
import { Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

class Signup extends React.Component {
  // signup = () => {
  //   this.props.signup()
  //   this.props.navigation.navigate('Home')
  // }

  onPress = () => {
    const { routeName } = this.props.navigation.state
    if(routeName === 'Signup'){
      this.props.signup() //register to database
      this.props.navigation.navigate('Home')
    } else { //update on edit profile
      this.props.updateUser()
      this.props.navigation.goBack()
    }
  }



  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    console.log("signup upload photo from library " + status)
    if (status === 'granted') {
      //const image = await ImagePicker.launchImageLibraryAsync({allowsEditing: true})
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled){
        const url = await this.props.uploadPhoto(image)
        console.log("signup.js : done (keypress) " + url)
        this.props.updatePhoto(url)

      }
    }
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //     <Text>Signup</Text>
  //     <TextInput
  //        style={styles.border} //to set input border
  //         value= {this.props.user.email}
  //         onChangeText = {input => this.props.updateEmail(input)}
  //         placeholder='Email'
  //         autoCapitalize = 'none'
  //     />
  //     <TextInput
  //         style={styles.border} //to set input border
  //         value= {this.props.user.password}
  //         onChangeText = {input => this.props.updatePassword(input)}
  //         placeholder='Password'
  //         autoCapitalize = 'none'
  //         secureTextEntry={true}
  //     />
  //     <TextInput
  //         style={styles.border} //to set input border
  //         value= {this.props.user.username}
  //         onChangeText = {input => this.props.updateUsername(input)}
  //         placeholder='Username'
  //         autoCapitalize = 'none'
  //     />
  //     <TextInput
  //         style={styles.border} //to set input border
  //         value= {this.props.user.bio}
  //         onChangeText = {input => this.props.updateBio(input)}
  //         placeholder='Bio'
  //         autoCapitalize = 'none'
  //     />
  //      <TouchableOpacity style = {styles.button} onPress={()=> this.signup()}>
  //           <Text>Signup</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  render() {
    const { routeName } = this.props.navigation.state
    return (
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary} >
          <Image style={styles.roundImage} source={{uri: this.props.user.photo}}/>
          <Text>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.border}
          editable={routeName === 'Signup' ? true : false}
          value={this.props.user.email}
          onChangeText={input => this.props.updateEmail(input)}
          placeholder='Email'
          autoCapitalize = 'none'
        />
        <TextInput
          style={styles.border}
          editable={routeName === 'Signup' ? true : false}
          value={this.props.user.password}
          onChangeText={input => this.props.updatePassword(input)}
          placeholder='Password'
          autoCapitalize = 'none'
          secureTextEntry={true}
        />
        <TextInput
        	style={styles.border}
        	value={this.props.user.username}
        	onChangeText={input => this.props.updateUsername(input)}
        	placeholder='Username'
          autoCapitalize = 'none'
        />
        <TextInput
        	style={styles.border}
        	value={this.props.user.petname}
        	onChangeText={input => this.props.updatePetname(input)}
        	placeholder='Petname'
          autoCapitalize = 'none'
        />
        <TextInput
        	style={styles.border}
        	value={this.props.user.breed}
        	onChangeText={input => this.props.updateBreed(input)}
        	placeholder='Breed'
          autoCapitalize = 'none'
        />
        <TextInput
        	style={styles.border}
        	value={this.props.user.bio}
        	onChangeText={input => this.props.updateBio(input)}
        	placeholder='Bio'
          autoCapitalize = 'none'
        />
      	<TouchableOpacity style={styles.button} onPress={this.onPress}>
      		<Text>Done</Text>
      	</TouchableOpacity>
      </View>
    );
  }

}

//redux - global state/variable (passing of variables)
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername,updatePetname,updateBreed, updateBio, signup }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user:state.user //accessing items in the state else state.user(for user only)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup) 

