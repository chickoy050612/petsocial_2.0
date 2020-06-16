import uuid from 'uuid'
import firebase from 'firebase'
import db from '../config/firebase' 
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

export const uploadPhoto = (image) =>{
    return async (dispatch) => {
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => resolve(xhr.response)
                xhr.responseType = 'blob'
                xhr.open('GET', image.uri, true)
                xhr.send(null)
            })
            const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
            const downloadURL = await uploadTask.ref.getDownloadURL()
            return downloadURL

            // const response = await fetch(resize.uri)
            // const blob = await response.blob()
            // const uploadTask = await firebase.storage().ref().child('${sessionId}').put(blob)
            // const downloadURL = await uploadTask.ref.snapshot.getDownloadURL()
            
        } catch (e) {
            console.log(e)
        }
    }
}



// export const uploadPhoto = (image) =>{
//     return async (dispatch) => {
//         try {
//             //apply resizing of image
//             const resize = await ImageManipulator.manipulateAsync(image.uri, [], {format: 'jpg', compress: 0.1 })
//             const blob = await new Promise((resolve, reject) => {
//                 const xhr = new XMLHttpRequest()
//                 xhr.onload = () => resolve(xhr.response)
//                 xhr.responseType = 'blob'
//                 //xhr.open('GET', resize.uri, true)
//                 xhr.open('GET', image.uri, true)
//                 xhr.send(null)
//             })
//             const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
//             const downloadURL = await uploadTask.ref.getDownloadURL()
//             return downloadURL

//             // const response = await fetch(resize.uri)
//             // const blob = await response.blob()
//             // const uploadTask = await firebase.storage().ref().child('${sessionId}').put(blob)
//             // const downloadURL = await uploadTask.ref.snapshot.getDownloadURL()
            
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }