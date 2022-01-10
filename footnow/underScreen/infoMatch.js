import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function infoMatch({route, navigation}) {
   /* 2. Get the param */
  const { id } = route.params;
  const [ token , setToken ] = useState(null)
  const [ data, setData ] = useState(null)
  const [ participant, setParticipant ] = useState(0)

  useEffect(() => {
    AsyncStorage.getItem('data').then((value) =>{
      value = JSON.parse(value)
      setToken(value.token)
    })

    
    let data = { "id" : id } 

    fetch('http://192.168.1.5:19002/getmatch', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data){
          setData(responseJson.data)
         
          let data = { "matchId" : responseJson.data[0].id } 
        
          fetch('http://192.168.1.5:19002/getnumberofparticipant', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          })
          .then((response) => response.json())
          .then((responseJson) => {
            
            setParticipant(responseJson.data[0].nb)
          })
        }
      })

  },[token])

  const handleQuitMatch=()=>{
      
    let data = { "matchId" : id } 
        
    fetch('http://192.168.1.5:19002/quitmatch', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      navigation.navigate("MesMatchs")
    })
  }
  
  if(data){
    return (
      <View style={styles.container}>
          <View>
              <Image 
                  source={require('../assets/area.jpg')}
                  resizeMode='contain'
                  style={{
                      width:500,
                      height:200,
                      marginRight: 10
                  }}
              />
          </View>
  
          <TouchableOpacity style={styles.inviteFriends} onPress={() => navigation.navigate('inviteFriends')}>
              <FontAwesome5 name="user-friends" color="white" size={20}/>
              <Text style={{color:'white', fontSize:20, fontWeight:'400'}}>Inviter un amis</Text>
          </TouchableOpacity>
      
          <View style={styles.infoCard}>
              <View style={styles.placeAndDate}>
                  <Text style={{fontSize:30, fontWeight:'500'}}>{data[0].lieux}</Text>
                  <Text style={{fontSize:27, fontWeight:'500'}}>{data[0].date}</Text>
              </View>
  
              <View style={styles.hourAndPrice}>
                  <View style={styles.time}>
                      <MaterialCommunityIcons name="clock-time-three-outline" size={27}/>
                      <Text style={{marginLeft:10,fontSize:27, fontWeight:'400'}}>11:30</Text>
                  </View>
                  <View style={styles.hour}>
                      <MaterialCommunityIcons name="timer-sand-empty" size={27}/>
                      <Text style={{marginLeft:10,fontSize:27, fontWeight:'400'}}>{data[0].duree}</Text>
                  </View>
                  <View style={styles.price}>
                      <Fontisto name="money-symbol" size={27}/>
                      <Text style={{marginLeft:10,fontSize:27, fontWeight:'400'}}>{data[0].prix}</Text>
                  </View>
              </View>
              <View style={styles.restInfo}>
                 
                  <Text style={{marginLeft:10,fontSize:27, fontWeight:'400',margin:10}}>Organisateur: <Text style={{marginLeft:10,fontSize:20, fontWeight:'400',margin:10}}>{data[0].user.prenom} {data[0].user.nom}</Text></Text>
                  <Text style={{marginLeft:10,fontSize:27, fontWeight:'400',margin:10}}>Participant: <Text style={{marginLeft:10,fontSize:25, fontWeight:'400',margin:10}}>{participant}</Text></Text>
              </View>
          <TouchableOpacity onPress={handleQuitMatch} style={styles.cancelMatch}>
              <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>Annuler le match</Text>
          </TouchableOpacity>
          </View>
         
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <Text>Chargement</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  inviteFriends:{
      backgroundColor: 'black',
      flexDirection: 'row',
      height: 35,
      width: 170,
      justifyContent:'space-around',
      alignItems: 'center',
      position:'absolute',
      top: 110,
      left:200,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.7,
      elevation: 5,
      borderRadius : 15,
      
  },

  infoCard:{
        backgroundColor : 'white',
        width : 350,
        height : 440,
        marginTop : 10,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        elevation: 5,
        padding:20,
        borderRadius : 15,
        position:'absolute',
        top: 140
  },
  placeAndDate: {
      alignItems: 'center',
      paddingBottom:50,
      borderBottomColor : 'gray',
      borderBottomWidth:1
  },
  hourAndPrice:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingBottom:30,
      borderBottomColor : 'gray',
      borderBottomWidth:1,
      marginTop:30
  },
  time:{
    flexDirection:'row',
    margin:6
  },
  hour:{
    flexDirection:'row',
    margin:6
  },
  price:{
    flexDirection:'row',
    margin:6
  },
  restInfo:{
    justifyContent:'center',
    paddingBottom:30,
    marginTop:30
  },
  cancelMatch:{
      alignItems:'center',
      backgroundColor:'#f66',
      height:35,
      borderRadius:15,
      justifyContent:'center'
  }
});
