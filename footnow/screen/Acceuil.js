import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ModalPoup = ({visible, children}) =>{
  return ( 
    <Modal transparent visible={visible}>
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
    )
}

var dateArr = []

const dayOfWeek = ['dim','lun', 'mar', 'mer', 'jeu', 'ven', 'sam']
var day = new Date();

for (let i = 1; i < 7; i++) {
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + i);
  dateArr.push(nextDay)
}

export default function Acceuil({navigation}) {
  
  const isFocused = useIsFocused();
  const [visible , setVisible] = useState(false)
  const [modalData , setModalData] = useState()
  const [data, setData] = useState([]);
  const [ token , setToken ] = useState(null)

  const dateRef = useRef()

  useEffect(() => {

    AsyncStorage.getItem('data').then((value) =>{
      value = JSON.parse(value)
      setToken(value.token)
    })

    var date = new Date()
    var month = date.getMonth()+1
    var ofZe = date.getFullYear()+'-'+month+'-'+date.getDate()

    let data = {date: ofZe};

    fetch('http://192.168.1.2:19002/listmatch', {
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
        setData(responseJson.data)
      })

  },[token, isFocused])

  const handleDate = (date) =>{
    
    var month = date.getMonth()+1
    var ofZe = date.getFullYear()+'-'+month+'-'+date.getDate()

    let data = {date: ofZe};

    fetch('http://192.168.1.2:19002/listmatch', {
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
        setData(responseJson.data)
      })
    
  }
  //
  return (
    <View style={styles.container}>
      
      <ModalPoup visible={visible}>
        <View style={{}}>
          <View style={styles.header}>
            <Text style={{fontSize : 20, fontWeight :'500'}}>Confirmer votre Participation</Text>
            <AntDesign onPress={() => setVisible(false) } style={{ width :30}} name="close" size={15}/>
          </View>

          <View style={{}}>
            <View style={styles.poupBody}>
              <View style={{flexDirection:'row', justifyContent:"space-around"}}>
                <View>
                  <Fontisto name="date"  size={20} style={{margin:8}}/>
                  <MaterialIcons name="place" size={20} style={{margin:8}}/>
                  <Fontisto name="money-symbol" size={20} style={{margin:8}}/>
                  <MaterialCommunityIcons name="timer-outline" size={20} style={{margin:8}}/>
                </View>
                <View>
                  <Text style={{fontSize : 20, fontWeight :'500', color: '#08313A',margin:8}}>{modalData && modalData.date} - {modalData && modalData.timeStart}</Text>
                  <Text style={{fontSize : 20, fontWeight :'500', color: '#08313A',margin:8}}>{modalData && modalData.lieux}</Text>
                  <Text style={{fontSize : 20, fontWeight :'500', color: '#08313A',margin:8}}>{modalData && modalData.prix}</Text>
                  <Text style={{fontSize : 20, fontWeight :'500', color: '#08313A',margin:8}}>{modalData && modalData.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buttonGo}>
                <Text style={{fontSize : 26, fontWeight :'600', color : 'white', position : 'absolute'}}>Participer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPoup>
    
      <View style={{flexDirection: 'row'}}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.dateCard} onPress={()=> handleDate(new Date())}>
            <Text style={{fontSize:20, fontWeight : '500', color : 'green'}}>{day.getDate()}</Text>
            <Text style={{fontSize:20}}style={{fontSize:20, color : 'green'}}>{dayOfWeek[day.getDay()]}</Text>
          </TouchableOpacity>
         {
           dateArr.map(date =>(
            <TouchableOpacity ref={dateRef} style={styles.dateCard}  onPress={()=> handleDate(date)} >
              <Text style={{fontSize:20, fontWeight : '500'}}>{date.getDate()}</Text>
              <Text style={{fontSize:20}}style={{fontSize:20}}>{dayOfWeek[date.getDay()]}</Text>
            </TouchableOpacity>
           ))
         }
        </ScrollView>
    </View>
    <TouchableOpacity style={styles.makeFoot} onPress={() => navigation.navigate('makeMatch')}>
      <AntDesign name="pluscircleo" size={27} color={'white'} />
      <Text style={{left : 5,fontSize:23, fontWeight : '500', color: 'white'}}>CREER UN FOOT</Text>
    </TouchableOpacity>
    <ScrollView  showsVerticalScrollIndicator={false}>
      {data ?
        data.map(item =>(
          <TouchableOpacity style={styles.card} onPress={() => {
            setVisible(true)
            setModalData(item)
          } }>
            <View style={styles.hour}>
              <Text style={{color : 'black', fontSize : 22, fontWeight : '500'}}>10:00</Text>
            </View>
            <View style={styles.info}>
              <Text style={{fontSize : 20, fontWeight : '600', color : 'black', margin : 5}}>recherche {item.nbJoueur} joueur(s)</Text>
              <Text style={{fontSize : 17, margin : 5, fontWeight:'500'}}>{item.lieux}</Text>
              <Text style={{fontSize : 17, margin : 5}}>{item.prix}CFA / {item.duree}</Text>
              <View style={styles.friend}>
                <FontAwesome5 name="user-friends" size={20} color={'#448dee'}/>
                <Text style={{fontSize : 20, fontWeight : '500',  margin : 5, color : '#448dee'}}>0 relations participent</Text>
              </View>
            </View> 
            <View style={styles.next}>
            <MaterialIcons name="navigate-next" size={'40'} color={"#808080c7"} style={{position : 'absolute', left : 6}} />
          </View>
        </TouchableOpacity>
        )):
        (
          <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image 
                  source={require('../assets/noPlay.png')}
                  resizeMode='contain'
                  style={{
                      width:200,
                      height:200,
                      marginRight: 10,
                      justifyContent:'center',
                      tintColor:'#FF7F50'
                  }}
              />
              <Text style={{fontSize:30, fontWeight:'500', color:'tomato'}}>Pas de match ce jour.</Text>
          </View>
        )
      }
    
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : 'center'
  },

  dateCard:{
    width : 60,
    height : 60,
    justifyContent : 'center',
    alignItems : 'center'
  },
  
  makeFoot : {
    backgroundColor : 'rgb(75,158,247)',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    width : 230,
    height : 42,
    margin : 10,
    borderRadius : 30
  },

  card : {
    flexDirection : 'row',
    backgroundColor : 'white',
    width : 350,
    height : 130,
    marginTop : 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    elevation: 5,
    
    borderRadius : 15
  },

  hour : {
    backgroundColor : 'white',
    width : '18%',
    justifyContent : 'center',
    alignItems : 'center',
    borderTopLeftRadius : 15,
    borderBottomLeftRadius : 15,
    margin: 10
  },

  info : {
    margin : 3
  },

  friend : {
    margin : 5,
    flexDirection : 'row',
    alignItems : 'center'
  },

  next : {
    alignItems : 'center',
    justifyContent : 'center',
  },

  scrollComponent : {
    backgroundColor : 'red'
  },

  modalBackGround : {
    flex : 1,
    backgroundColor : 'rgba(0,0,0,0.5)',
    justifyContent : 'flex-end',
    alignItems : 'center'
  },

  modalContainer : {
    width : '100%',
    backgroundColor : 'white',
    paddingHorizontal : 20,
    paddingVertical : 30,
    borderRadius :20, 
    elevation : 20
  },

  header : {
    width : '100%',
    height : 40,
    flexDirection : 'row',
    justifyContent : 'space-around'
  },

  poupBody : {
   
  },

  date : {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 10
  },

  lieu : {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 10
  },

  temp : {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 10
  },

  prix : {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 10
  },

  buttonGo : {
    backgroundColor : '#448dee',
    justifyContent : 'center',
    alignItems : 'center',
    height : 40,
    
    borderRadius : 20
  }
});
