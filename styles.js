
import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window')

//export default styles = StyleSheet.create({
  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    container2: {
      flex: 1,
      backgroundColor: '#fff',
    },
    center: {
      alignItems: 'center',
      //justifyContent: 'center',
      justifyContent: 'space-between',
    },
    space: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bold: {
      fontWeight: 'bold',
    },
    left: {
      alignItems: 'flex-start',
    },
    right: {
      alignItems: 'flex-end',
    },
    row:{
      flexDirection: 'row'
    },
    column:{
      flexDirection: 'column'
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#e63b7a',
      borderColor: '#e63b7a',
      //borderColor: '#d3d3d3',
      //borderRadius: 70/2,//?
      borderWidth: 1,
      borderRadius: 20,
      width: 200
    },
    textWhite: {
      color: '#FFF'
      }
    ,
    facebookButton: {
      backgroundColor: '#3b5998',
      marginTop: 20,
      paddingVertical: 10,
      alignItems: 'center',
      borderColor: '#3b5998',
      borderWidth: 1,
      borderRadius: 20,
      width: 200
    },
    buttonSignup: {
      marginTop: 20,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderColor: '#d3d3d3',
      //borderColor: '#d3d3d3',
      borderRadius: 70/2,//?
      borderWidth: 1,
      borderRadius: 20,
      width: 200
    }
    ,
    cameraButton: {
      height: 100, 
      width: 100,
      borderRadius: 50,
      alignSelf: 'center',
      backgroundColor: '#e63b7a',
      marginBottom: 50
    },
    postPhoto:{
      height: 250,
      width: width,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: '#adadad'
    },
    roundImage:{
      width: 40, 
      height: 40,
      borderRadius: 20,
      padding: 5,
      margin: 5,
      backgroundColor: '#adadad'
    },
    recImage:{
      width: 40, 
      height: 40,
      borderRadius: 10,
      padding: 5,
      margin: 5,
      backgroundColor: '#adadad'
    },
    border: {
      width: '85%',
      margin:10,
      padding:15,
      fontSize:16,
      borderColor: '#d3d3d3',
      borderBottomWidth:1,
      textAlign:'center'
    },
    circle: {
      width:500,
      height: 500,
      borderRadius : 500 /2,
      backgroundColor: "#FFF",
      position: "absolute",
      left: -120,
      top: -20
    },
    gray: {
      color: '#adadad',
    },
    small: {
      fontSize: 12,
    },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    width: width*.90,
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
  squareLarge: {
    width: width*.33, 
    height: 125,
    margin: 1,
    backgroundColor: '#d3d3d3'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
  });