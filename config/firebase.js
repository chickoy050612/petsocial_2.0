import firebase from 'firebase';
import ENV from '../env';
require('firebase/firestore')

const config = {
    /*apiKEY: ENV.apiKEY,
    authDomain: ENV.authDomain,
    databaseURL: ENV.databaseURL,
    projectId:ENV.projectId,
    messagingSenderId: ENV.messagingSenderId,
    appId:ENV.appId*/
    
    apiKey: 'AIzaSyDy8QtqAlhquRrVM3nccFGWNH2k8O-aIEQ',
    authDomain: 'petsocial-app.firebaseapp.com',
    databaseURL: 'https://petsocial-app.firebaseio.com"',
    projectId: 'petsocial-app',
    storageBucket: 'petsocial-app.appspot.com',
    messagingSenderId: '498119946438',
    appId: '1:498119946438:web:82c4e0795e772f87b2a7c7'
    
}



//initialize firebase with all configuration keys
//firebase.initializeApp(config)

firebase.initializeApp(config)
const db = firebase.firestore()

//need to add to forgo deprecated warnings
//db.settings({
//    timestampsInSnapshots:true
//});

export default db;

