import React from 'react';
import { StyleSheet, Text, View, Image , TouchableOpacity, ScrollView, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Notification() {
  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={styles.notification}>
        <Image 
          resizeMode='contain'
          source={require('../assets/ppexemple.jpg')}
          style={{
            height:80,
            width:80,
            borderRadius: 80 / 2,
            overflow: "hidden",
            borderWidth: 1,
            borderColor:'#F2F3F5'
          }}
        />  
        <View style={styles.info}>
          <Text style={{fontSize:30, fontWeight:'600', marginBottom: 7}}>Oumar CISSE</Text>
          <Text style={{fontSize:17, fontWeight:'400', color:'#919293'}}>Vous à envoyé une demande</Text>
          <View style={styles.button}>
            <TouchableOpacity style={{borderColor: '#5CFF5C', borderWidth: 2, width: 100, height: 40,justifyContent:'center', alignItems:'center', marginRight:20, borderRadius:30}}>
              <Text style={{fontSize:17, fontWeight:'500', color:'#303131'}}>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor: '#FF6347', borderWidth: 2, width: 100, height: 40,justifyContent:'center', alignItems:'center', borderRadius:30}}>
              <Text style={{fontSize:17, fontWeight:'500', color:'#303131'}}>Réfuser</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.notification}>
        <Image 
          resizeMode='contain'
          source={require('../assets/ppexemple.jpg')}
          style={{
            height:80,
            width:80,
            borderRadius: 80 / 2,
            overflow: "hidden",
            borderWidth: 1,
            borderColor:'#F2F3F5'
          }}
        />  
        <View style={styles.info}>
          <Text style={{fontSize:30, fontWeight:'600', marginBottom: 3}}>Oumar CISSE</Text>
          <Text style={{fontSize:17, fontWeight:'400', color:'#919293', marginBottom: 7}}>Vous invite a participer a un match</Text>
          <Text style={{fontSize:18, fontWeight:'700', color:'#08313A'}}>Dakar, Magic-Land</Text>
          <Text style={{fontSize:18, fontWeight:'700', color:'#08313A'}}>Samedi 22 à 16:00- 1500CFA</Text>
          <View style={styles.button}>
            <TouchableOpacity style={{borderColor: '#5CFF5C', borderWidth: 2, width: 100, height: 40,justifyContent:'center', alignItems:'center', marginRight:20, borderRadius:30}}>
              <Text style={{fontSize:17, fontWeight:'500', color:'#303131'}}>Participer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor: '#FF6347', borderWidth: 2, width: 100, height: 40,justifyContent:'center', alignItems:'center', borderRadius:30}}>
              <Text style={{fontSize:17, fontWeight:'500', color:'#303131'}}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  notification:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    margin:15,
    padding:10,
    borderRadius:15,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    elevation: 5,
  },

  info:{
    margin:10,
    
  },

  button:{
    flexDirection:'row',
    justifyContent:'space-around',
    margin:5
  }

});
