import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { render } from 'react-dom';

export default class App extends React.Component {
state = {
  count: 10
}

add =() => {
  console.log("adding")
  let num = this.state.count +1
  this.setState({count: num})
}

minus=() => {
  console.log("adding")
  let num = this.state.count -1
  this.setState({count: num})
}
  render() {
    return (
      <View style={styles.container}>
        <Text>How many are we going to build? {this.state.count} </Text>
        <Button title='Add' onPress={()=> this.add()}/>
        <Button title='Minus' onPress={()=> this.minus()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
