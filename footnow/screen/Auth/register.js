import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {

  const [login, setLogin] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf , setPasswordConf] = useState('');
  const [telephone, setTelephone] = useState('');
  const [errortext, setErrortext] = useState('');

  const handleSubmitButton = () => {
    setErrortext('');
    
    if (!login || !lastName || !firstName || !telephone || !password || !passwordConf ) {
      setErrortext('Veuillez remplir tout les champs');
      return;
    }
  
    if(lastName.match(/^([^0-9]*)$/) == null){
      setErrortext('Nom invalide');
      return;
    }

    if(firstName.match(/^([^0-9]*)$/) == null){
      setErrortext('Prénom invalide');
      return;
    }

    if(telephone.match(/^\d+$/) == null){
      setErrortext('Téléphone invalide');
      return;
    }

    if(telephone.length < 9){
      setErrortext('Veuillez entrer un numéro valide');
      return;
    }

    if( password!=passwordConf ){
      setErrortext('Les deux mots de passe ne correspondent pas');
      return;
    }

    if(password.length < 8){
      setErrortext('Mot de passe court min.8');
      return;
    }

    if(telephone.slice(0,2) != "77" && telephone.slice(0,2) != "78"){
      setErrortext('Téléphone invalide');
      setModalVisible(true)
      return;
    }
   
    //Show Loader
    
    var data = {
      login: login,
      nom: lastName,
      prenom: firstName,
      telephone: telephone,
      password: password
    };

    fetch('http://192.168.1.2:19002/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
      .then((responseJson) => {
          
        if(responseJson.message){
            setErrortext(responseJson.message);
          }

          if (responseJson.token) {
            console.log(responseJson)
            AsyncStorage.setItem('data', JSON.stringify(responseJson),); //token
            navigation.replace('ScreenConnected');
          }

    }).catch((error) => {
        //Hide Loader
        console.error(error);
      });
  };
 
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
       <View style={styles.bienvenue}>
        <Text style={{color : 'white', fontSize : 50, fontWeight : 'bold'}}>Inscription</Text>
      </View>
            
        <ScrollView  
          keyboardShouldPersistTaps="never"
          contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }} >
        
        <KeyboardAvoidingView behavior={"position"}>
        <Text style={{color : 'red', fontSize : 20, fontWeight : 'bold', marginLeft:20}}>{errortext}</Text>
          <View style={styles.SectionStyle}>
            <FontAwesome name='user' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Login' 
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(login) => setLogin(login)}
                maxLength={10}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
            <Entypo name='text' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Nom' 
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(lastName) => setLastName(lastName)}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
          <Entypo name='text' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Prenom' 
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(firstName) => setFirstName(firstName)}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
            <Fontisto name='key' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Mot de passe' 
                secureTextEntry={true}
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(password) => setPassword(password)}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
            <Fontisto name='key' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Confirmer mot de passe' 
                secureTextEntry={true}
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(password) => setPasswordConf(password)}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
            <Fontisto name='phone' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Telephone' 
                keyboardType="numeric"
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(telephone) => setTelephone(telephone)}
                autoCorrect={false}
                autoCapitalize="sentences"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                maxLength={9}
              />
            </View>   
          </View>
          <TouchableOpacity
              style={styles.connectButton}
              activeOpacity={0.8}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>INSCRIPTION</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
        
      
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  SectionStyle: {
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    height: 43,
    margin:10,
    borderRadius:20
  },
  buttonStyle: {
    flex:1
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 19,
    fontWeight : '600'
  },
  inputStyle: {
    fontSize:20,
    fontWeight:'500',
    backgroundColor:'white',
    flex:1,
     borderRadius:20
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },

  indicatif : {
    position : 'absolute',
    zIndex : 1,
    fontSize : 15,
    fontWeight : '900',
    backgroundColor : '#d6cacadb',
    width : 50,
    color : '#907d7dd9',
    paddingLeft : 8,
    height : 40,
    paddingTop : 12,
    borderRadius: 3,
  },

  iconRegister : {
    position : 'absolute',
    zIndex : 1,
    backgroundColor : 'white',
    width : 50,
    color : 'black',
    paddingLeft : 12,
    height : 40,
    paddingTop : 7,
    borderRadius: 3,
  },

  childStyle : {
    backgroundColor: "#000000db",
    borderRadius: 12,
    paddingTop: 2,
    justifyContent : 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height : 80,
    width : 280
  },
  connectButton:{
    backgroundColor: '#0096FF',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 45,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 25,
  },
  bienvenue:{
    marginLeft: 30,
    marginTop:50,
    
  },
});