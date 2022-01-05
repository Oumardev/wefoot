import React, { useState } from 'react';
import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 

const friend = [
  {key:1, 'name': 'Cédric Henri', checked: false},
  {key:2, 'name': 'Franck Konan', checked: false},
  {key:3, 'name': 'Kouassi Willy Junior', checked: false},
]

const friendCheck = []

export default function ListFriend({navigation}) {
    const [bool , setBool] = useState(true)

    const handleInvitation =  (key) =>{
        
        if(friend[key].checked == true){
            friend[key].checked = false 

            const indice = friendCheck.findIndex(item => item === friend[key])

            if (indice > -1) {
                friendCheck.splice(indice, 1);
            }
            console.log(friendCheck.length)
        }  

        else{
            friend[key].checked = true
            friendCheck.push(friend[key])
        }
           
        setBool(!bool)
    }

  return (
    <>
        <ScrollView style={{margin:0, width:'96%'}} showsVerticalScrollIndicator={false}>
          {
            friend.map((item, key) => (
              <View key={key} style={styles.friend}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image 
                      source={require('../assets/user.png')}
                      resizeMode='contain'
                      style={{
                          width:47,
                          height:47
                      }}
                  />
                  <Text style={styles.nom}>{item.name}</Text>
                </View>
                <TouchableOpacity style={styles.iconCheck} onPressOut={()=> handleInvitation(key)}>
                    <FontAwesome name={friend[key].checked == true ? "check-circle" : "circle-thin"} size={30} color={friend[key].checked == true ? "#f66" : "gray"} />
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        {
            friendCheck.length !=0
            &&
            <TouchableOpacity style={{borderRadius: 20 , margin:20 ,backgroundColor:'#f66', width:'90%', height: '7%' ,justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:23, fontWeight: '700', color:'white'}}>Inviter ({friendCheck.length})</Text>
            </TouchableOpacity>
        }
        
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  searchBar : {
    padding : 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 3,
  },

  searchTest : {
    backgroundColor : 'white',
    width : 320,
    height : 40,
    paddingLeft : 20,
    fontSize : 20,
    borderRadius : 10
  },

  searchIcon : {
    color : "black",
    position : 'absolute',
    zIndex : 1,
    top : 20,
    left : 300
  },

  friend:{
    flexDirection:'row',
    alignItems:'center',
    paddingBottom: 5,
    margin : 10,
    justifyContent: 'space-between'
  },
  nom:{
    fontSize:22,
    fontWeight:'700',
    marginLeft: 10
  },
  iconCheck:{
      
  }
});
