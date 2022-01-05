import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

export default function EditPtofile() {
  return (
    <View style={styles.container}>
        <View style={{margin: 30, justifyContent:'center', alignItems:'center'}}>
            <Image 
                resizeMode='contain'
                source={require('../assets/ppexemple.jpg')}
                style={{
                  height:140,
                  width:140,
                  borderRadius:20
                }}
            />
        <TouchableOpacity style={{backgroundColor:'white', padding:5, borderRadius: 30, position:'absolute', bottom: 20, zIndex:1}}>
            <Entypo name='edit' size={25} color={'black'}/>
        </TouchableOpacity>
        </View>

        <View style={styles.PersonnalInfo}>
            <Text style={{fontSize: 26, fontWeight:'700'}}>Information personnel</Text>
            
            <View style={styles.info}>
                <View style={{margin:10}}>
                    <Text style={{fontWeight: '200', fontSize: 20, marginBottom:15}}>Nom</Text>
                    <Text style={{fontWeight: '200', fontSize: 20, marginBottom:15}}>Email</Text>
                    <Text style={{fontWeight: '200', fontSize: 20, marginBottom:15}}>Phone</Text>
                </View>

                <View style={{margin:10}}>
                    <TextInput style={{fontWeight: '600', fontSize: 20, borderBottomColor:'#eee', borderBottomWidth:1, marginBottom:15}} value='Oumar Alpha Yaya CISSE'/>
                    <TextInput style={{fontWeight: '600', fontSize: 20, borderBottomColor:'#eee', borderBottomWidth:1, marginBottom:15}} value='oumarcisse644@gmail.com'/>
                    <TextInput style={{fontWeight: '600', fontSize: 20, borderBottomColor:'#eee', borderBottomWidth:1, marginBottom:15}} value='+221 778143610'/>
                </View>
            </View>


            


           {/* <View style={{flexDirection : 'row', marginTop:25}}>
                <Text style={{fontWeight: '200', fontSize: 20}}>Email</Text>
                <TextInput style={{fontWeight: '600', fontSize: 20, borderBottomColor:'#eee', borderBottomWidth:1, paddingBottom:17}} value='oumarcisse644@gmail.com'/>
            </View>
            <View style={{flexDirection : 'row', marginTop:25}}>
                <Text style={{fontWeight: '200', fontSize: 20}}>Phone</Text>
                <TextInput style={{fontWeight: '600', fontSize: 20, borderBottomColor:'#eee', borderBottomWidth:1, paddingBottom:17}} value='+221 778143610'/>
            </View>*/}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    
    },

    PersonnalInfo:{
        margin: 20
    },
    info:{
        flexDirection:'row',
        marginTop:25
    }
})