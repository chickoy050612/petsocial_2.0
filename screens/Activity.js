import React from 'react';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native'
import styles from '../styles'
import { connect } from 'react-redux'
import db from '../config/firebase'
import orderBy from 'lodash/orderBy'
import moment from 'moment' 

class Activity extends React.Component {
  state = {
    activity: []
  }

  componentDidMount = () =>{
    this.getActivity()
  }
  //flatlist keyextrator - Used to extract a unique key for a given item at the specified index. Key
  getActivity = async () => {
    let activity = []
    
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
        activity.push(response.data())
    })
    console.log("Activity:1. show activity: " + JSON.stringify(activity))
    this.setState({activity: orderBy(activity, 'date','desc')})
  }

  // render() {
  //   //if function prevents error if no activity
  //   //if (this.state.activity.length <= 0) return <ActivityIndicator style={styles.container} />
  //   return (
  //       <View style = {styles.container}>
  //         <FlatList 
  //         //onRefresh={() => this.getActivity()}
  //         //refreshing={false}
  //           data={this.state.activity}
  //           keyExtractor = {(item) => JSON.stringify(item.date)}
  //           renderItem={({ item })=>(
  //             <View style={[styles.row, styles.center]}>
  //               <Image style={styles.roundImage} source={{uri: item.likerPhoto}}/> 
  //               <View>
  //                 <Text >{item.likerName}</Text>
  //                 <Text >Liked Your Photo</Text>
  //                 <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
  //               </View>
  //               <Image style={styles.recImage} source={{uri: item.postPhoto}}/>
  //             </View>
  //           )}
  //         />
            
  //     </View>
  //   )
  // }

  renderList = (item) => {
    console.log(" type ====> " + item.type + " liker " + item.likerName)
    switch(item.type) {
      case 'LIKE':
        return (         
          <View style={[styles.row, styles.space]}>
            <Image style={styles.roundImage} source={{uri: item.likerPhoto}}/>
            
            <View style={[styles.row,styles.space]}>
              <Text style={styles.bold}>{item.likerName}</Text>
              <Text style={styles.gray}>Liked Your Photo</Text>
              <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
            </View>

            <Image style={styles.recImage} source={{uri: item.postPhoto}}/>
          </View>
        )
      case 'COMMENT':
        return (         
          <View style={[styles.row, styles.space]}>
            <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.bold}>{item.commenterName}</Text>
              <Text style={styles.gray}>{item.comment}</Text>
              <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
            </View>
            <Image style={styles.recImage} source={{uri: item.postPhoto}}/>
          </View>
        )
      default: null
    }
  }


  render() {
  	if (this.state.activity.length <= 0 ) return <ActivityIndicator style={styles.container}/>
    return (
    	<View style={styles.container}>
				<FlatList
          onRefresh={() => this.getActivity()}
          refreshing={false}
				  data={this.state.activity}
				  keyExtractor={(item) => JSON.stringify(item.date)}
				  renderItem={({ item }) => this.renderList(item)} />
			</View>
    )
  }


}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Activity);
