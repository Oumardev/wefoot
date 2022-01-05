import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MesMatchs({navigation}) {

  const [ token , setToken ] = useState(null)
  const [ data, setData ] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('data').then((value) =>{
      value = JSON.parse(value)
      setToken(value.token)
    })

    fetch('http://192.168.1.2:19002/getallmymatch', {
      method: 'POST',
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
          console.log(responseJson)
        }
      })

  },[token])

  if(data){
    return (
      <View style={styles.container}>
        <ScrollView style={{marginTop:10}} showsVerticalScrollIndicator={false}>
          {
            data.map(item =>(
              <View style={styles.history}>
                <TouchableOpacity style={styles.historySyle} onPress={() => navigation.navigate('infoMatch',{ id: item.matchId })}>
                  <View style={styles.imageSyle}>
                    <Image 
                      source={require('../assets/matchhistory.png')}
                      resizeMode='contain'
                      style={{
                        width:70,
                        height:70,
                        marginRight: 10
                      }}
                    />
                  </View>
             
                  <View style={styles.information}>
                    <Text style={{...styles.informationText, color:'gray', marginBottom:10}}>En attende...</Text>
                    <Text style={styles.informationText}>{item.lieux}</Text>
                    <Text style={styles.informationText}>{item.prix}</Text>
                  </View>
                  
                  <View style={styles.date}>
                    <Text>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
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

  historySyle :{
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginRight: 10
  },

  informationText: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 5
  },

  information: {
    marginRight: 10
  },

  history: {
    backgroundColor : 'white',
    height : 100,
    justifyContent : 'center',
    width: 320,
    maxWidth: 320,
    borderRadius: 10,
    marginBottom:10
  }
});
