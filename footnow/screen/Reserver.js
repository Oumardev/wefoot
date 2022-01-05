import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import call from 'react-native-phone-call';
import { TouchableOpacity } from 'react-native-gesture-handler';

const triggerCall = (inputValue) => {
  if (inputValue.length != 13) {
      alert('Please insert correct contact number');
      return;
  }

  const args = {
      number: inputValue,
      prompt: true,
  };
  
  call(args).catch(console.error);
};

export default function Recherche() {
  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
              <View style={styles.info}>
                  <Text style={{fontSize:20, fontWeight: '500',marginBottom:10}}>Gymnase Stanislas - <Text style={{fontWeight: '400'}}>Dakar, Ouakam</Text></Text>
                  <Text style={{fontSize:20, fontWeight: '500'}}>Jeudi 23 Juin - <Text>14h à 17h</Text></Text>
                  {/*<MaterialCommunityIcons name='map-marker-outline'/>*/}
              </View>

              <View style={styles.buttomInfo}>
                <View style={styles.price}>
                  <MaterialIcons name="terrain" size={22} color={"green"}/>
                  <Text style={{fontSize:22, fontWeight: '500', color:'green'}}>25 k</Text>
                </View>
                <View style={styles.versus}>
                  <Fontisto name="persons" size={20} />
                  <Text style={{fontSize:22, fontWeight: '500'}}>8 / 8</Text>
                </View>
                <TouchableOpacity style={styles.reserverButton}  onPress={ () => triggerCall('+221781485935') }>
                  <Text style={{fontSize:22, fontWeight: '500', color:'gray'}}>Réserver</Text>
                </TouchableOpacity>
              </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card:{
    marginTop : 20,
    marginBottom : 20,
    backgroundColor: 'white',
    height : 120,
    width :320, 
    alignSelf:'center',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    elevation: 3,
    
    borderRadius : 5
  },

  info :{
    margin: 10
  },

  price:{
    flexDirection : 'row'
  },

  versus:{
    flexDirection : 'row'
  },

  reserverButton:{
    
  },

  buttomInfo:{
    flexDirection : 'row',
    justifyContent:'space-around',
    marginTop:20
  }
});
