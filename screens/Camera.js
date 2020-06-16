import React from 'react';
import styles from '../styles.js'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import {Camera, Permissions} from 'expo'


import { Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {uploadPhoto} from '../actions/index'
import { updatePhoto } from '../actions/post'

class CameraUpload extends React.Component {
    snapPhoto = async ()=> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        //const status = await Permissions.askAsync(Permissions.CAMERA)
        
        if (status ==='granted') {
            const image = await this.camera.takePictureAsync()
           
            if (!image.cancelled) {
                const resize = await ImageManipulator.manipulateAsync(image.uri, [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }], { compress: 1, format: ImageManipulator.SaveFormat.PNG});
                
                console.log('url resize ' + resize.uri)
                
                //upload photo to firebase storage
                const url = await this.props.dispatch(uploadPhoto(resize))
                //alert(url)
                console.log('url final for update', url)
                this.props.dispatch(updatePhoto(url))
                this.props.navigation.navigate('Post')
                //url ? this.props.navigation.navigate('Post') : null
            }
        }
    }

    render () {
        return (
            <Camera style={{flex:1}} ref={ ref =>{ this.camera = ref} } type={Camera.Constants.Type.back}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{paddingLeft:30}} onPress={ () => this.props.navigation.navigate('Post') } >
                        <Ionicons color={'white'} name={'ios-arrow-back'} size={50}/>
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={{alignment: 'center'}}>
                    <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} >
                        <Ionicons style={{alignSelf: 'center',paddingTop: 24}} name={'ios-camera'} size={50} color='white'/>
                    </TouchableOpacity>
                </View>
            </Camera>
          );
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPhoto }, dispatch)
  }
  
const mapStateToProps = (state) => {
    return { 
    
     }
}

export default connect(mapStateToProps)(CameraUpload);