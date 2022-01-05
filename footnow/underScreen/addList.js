import React ,{ useState , useEffect } from 'react';
import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddList({navigation, search}) {

    const [ token , setToken ] = useState(null)
    const [ friend, setFriend ] = useState([])

    const [bool , setBool] = useState(true)

    const handleAdd =(key) =>{
        if(friend[key].invited == false){
            friend[key].invited = true
        }else{
          friend[key].invited = false
        }

        setBool(!bool)
    }

    useEffect(() => {
      AsyncStorage.getItem('data').then((value) =>{
        value = JSON.parse(value)
        setToken(value.token)
      })

      const data = {search: search}
      console.log(data)
      fetch('http://192.168.1.2:19002/search', {
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
            console.log(responseJson.data)
            setFriend(responseJson.data)
          }
        })
  
    },[token, search])

    console.log('frk : ',friend)

    if(friend.length!=0){
      friend.map(item =>{
        console.log(item.id)
      })
      return (
        <>
            <ScrollView style={{margin:0, width:'96%'}} showsVerticalScrollIndicator={false}>
              {friend.length !=0 &&
                friend.map((item, key) => 
               
                (
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
                      <Text style={styles.nom} onPress={ ()=> navigation.navigate('friendProfil') }>{item.prenom} {item.nom}</Text>
                    </View>
                    {
                      (friend[key].invited && !friend[key].isfriend && !friend[key].me)?
                      (
                        <TouchableOpacity onPress={()=> handleAdd(key)} style={ (friend[key].invited && !friend[key].isfriend && !friend[key].me) && styles.buttonGray }>
                                <Text style={{fontSize: '18', color: 'white', fontWeight:'600'}}>Annuler</Text>
                        </TouchableOpacity>
                      ):null
                    }
                  </View>
                ))
              }
            </ScrollView>
    
        </>
      );
  
    }else{
      return(
        <>
          <Text>Chargement</Text>
        </>
      )
    }
    
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
  button:{
      backgroundColor : 'rgb(111,192,79)',
      padding :5
  },
  buttonGray:{
    backgroundColor : 'red',
    padding :5
}
});
