import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Picker , Keyboard, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MakeMatch({navigation}) {
  
  const [selectedValue, setSelectedValue] = useState("1H");
  const [selectedValueMany, setSelectedValueMany] = useState("3");
  const [selectedValueMode, setSelectedValueMode] = useState("5/5");
  const [selectedValuePrice, setSelectedValuePrice] = useState("1000FCA");
  const [duree, showDuree] = useState(false)
  const [howMany, showHowMany] = useState(false)
  const [mode, showMode] = useState(false)
  const [price, showPrice] = useState(false)
  const [ token , setToken ] = useState(null)

  const [ date, setDate ] = useState(new Date());
  const [ lieux, setLieux ] = useState()
  const [ heure, setHeure ] = useState(new Date())

 
  useEffect(() => {

    AsyncStorage.getItem('data').then((value) =>{
      value = JSON.parse(value)
      setToken(value.token)
    })

  },[token])

  const HandleMatch = ()=>{
    console.log('Handle Match')
   
    if(!lieux || !date || !heure || !selectedValue || !selectedValueMany || !selectedValueMode || !selectedValuePrice){
      console.log("Veuillez saisir tout les champs")
      return
    }

    let data = {
      "lieux" : lieux, 
      "date" : date, 
      "heure": heure.getHours()+':'+heure.getMinutes(), 
      "duree": selectedValue, 
      "nbJoueur": selectedValueMany, 
      "mode": selectedValueMode, 
      "prix": selectedValuePrice
   } 

    fetch('http://192.168.1.5:19002/creatematch', {
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
        if(responseJson.id.id)
          navigation.navigate("infoMatch",{ id: responseJson.id.id })
      })

  
    
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputStyles} onChangeText={(lieux) =>setLieux(lieux) } onBlur={()=> Keyboard.dismiss()} placeholder="Lieux" autoComplete={false} autoCorrect={false}/>
      
      <View style={{justifyContent:'center', paddingTop : 20}}>
        <Text style={{fontSize : 20, fontWeight: '500'}}>Date</Text>
        <DateTimePicker
          style={{width : 300}}
          testID="dateTimePicker"
          value={date}
          onChange={(e,date ) => setDate(date) }
          mode={'date'}
          is24Hour={true}
          display="default"
          minimumDate={date}
        />
      </View>
      <View style={{justifyContent:'center', paddingTop : 20}}>
        <Text style={{fontSize : 20, fontWeight: '500'}}>Heure</Text>
        <DateTimePicker
          style={{width : 300}}
          testID="dateTimePicker"
          value={heure}
          onChange={(e,heure) =>setHeure(heure) }
          mode={'time'}
          is24Hour={true}
          display="default"
        />
      </View>
      <View style={{justifyContent : 'center', alignItems : 'center'}}>
        <Text style={{fontSize: 20, fontWeight:'500'}}>Durée</Text>
        <TextInput style={styles.inputStyles} value={selectedValue} 
          onPressIn={() => {
            showDuree(!duree) 
            Keyboard.dismiss()
        }} editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}/>
      {
        duree && <Picker
          selectedValue={selectedValue}
          style={{ width: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue)
            showDuree(!duree)
          }}
        >
          <Picker.Item label="30min" value="30min" />
          <Picker.Item label="3H" value="3H" />
          <Picker.Item label="2H30" value="2H30" />
          <Picker.Item label="2H" value="2H" />
          <Picker.Item label="1H30" value="1H30" />
          <Picker.Item label="1H" value="1H" />
        </Picker>
      }
      </View>
      <View style={{justifyContent : 'center', alignItems : 'center', paddingTop : 20}}>
        <Text style={{fontSize: 20, fontWeight:'500'}}>Combien de joueurs recherches tu?</Text>
        <TextInput style={styles.inputStyles} value={selectedValueMany} 
        onPressIn={() =>{ 
          showHowMany(!duree)
          Keyboard.dismiss()
        }} editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}/>
      {
        howMany && <Picker
          selectedValue={selectedValueMany}
          style={{ width: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValueMany(itemValue)
            showHowMany(!howMany)
          }}
        >
          <Picker.Item label="10" value="10" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="1" value="1" />
        </Picker>
      }
      </View>
      <View style={{justifyContent : 'center', alignItems : 'center', paddingTop : 20, paddingBottom: 20}}>
        <Text style={{fontSize: 20, fontWeight:'500'}}>Mode</Text>
        <TextInput style={styles.inputStyles} value={selectedValueMode} 
        onPressIn={() =>{ 
          showMode(!mode)
          Keyboard.dismiss()
        }} editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}/>
      {
        mode && <Picker
          selectedValue={selectedValueMode}
          style={{ width: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValueMode(itemValue)
            showMode(!mode)
          }}
        >
          <Picker.Item label="12/12" value="12/12" />
          <Picker.Item label="11/11" value="11/11" />
          <Picker.Item label="10/10" value="10/10" />
          <Picker.Item label="9/9" value="9/9" />
          <Picker.Item label="8/8" value="8/8" />
          <Picker.Item label="7/7" value="7/7" />
          <Picker.Item label="6/6" value="6/6" />
          <Picker.Item label="5/5" value="5/5" />
        </Picker>
      }
      </View>

      <View style={{justifyContent : 'center', alignItems : 'center', paddingTop : 20, paddingBottom: 20}}>
        <Text style={{fontSize: 20, fontWeight:'500'}}>Prix par joeurs</Text>
        <TextInput style={styles.inputStyles} value={selectedValuePrice} 
        onPressIn={() => {
          showPrice(!price)
          Keyboard.dismiss()
        }} editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}/>
      {
        price && <Picker
          selectedValue={selectedValuePrice}
          style={{ width: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValuePrice(itemValue)
            showPrice(!price)
          }}
        >
           <Picker.Item label="3500FCA" value="3500FCA" />
          <Picker.Item label="3000FCA" value="3000FCA" />
          <Picker.Item label="2500FCA" value="2500FCA" />
          <Picker.Item label="2000FCA" value="2000FCA" />
          <Picker.Item label="1500FCA" value="1500FCA" />
          <Picker.Item label="1000FCA" value="1000FCA" />
        </Picker>
      }
      </View>
      <TouchableOpacity onPress={()=> HandleMatch()} style={styles.makeMatch}>
        <Text style={styles.makeText}>Créer le match</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputStyles: {
    borderBottomColor : 'green',
    borderBottomWidth : 1,
    borderBottomLeftRadius : 5,
    borderBottomRightRadius : 5,
    width: 300,
    height : 30,
    fontSize : 20,
    fontWeight : '500'
  },

  makeMatch:{
    backgroundColor : '#448dee',
    height : 40,
    width : 220,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 30,
    margin : 20
  },

  makeText: {
    color : 'white',
    fontSize: 30,
    fontWeight : '500'
  }
});
