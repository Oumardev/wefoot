import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Modal,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Platform
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
  
  const [password, sePassword] = useState('');
  const [login, setLogin] = useState('');
  const passwordInputRef = createRef();
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    
    if (!login || !password) {
      setErrortext('Veuillez saisir tout les champs');
      return;
    }
   
    let data = {login: login, password: password};
    
    fetch('http://192.168.1.2:19002/login', {
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
            
            fetch('http://192.168.1.2:19002/verifyToken', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + responseJson.token
                },
            })
              .then((response) => response.json())
              .then((responseJson_) => {
                  AsyncStorage.setItem('data', JSON.stringify(responseJson_),); //token
                  navigation.replace('ScreenConnected');
              })
              .catch((error) => {
                console.error(error);
              });

          }

    }).catch((error) => {
        //Hide Loader
        console.error(error);
    });

  };

  const closeModal = ()=>{
    setModalVisible(false)
  }

  console.log(Platform.OS )

  return (
    <View style={{backgroundColor:'black', flex:1, }}>
      <View style={styles.bienvenue}>
        <Text style={{color : 'white', fontSize : 50, fontWeight : 'bold'}}>Hello,</Text>
        <Text style={{color : 'white', fontSize : 32, fontWeight : 'bold'}}>Bienvenue sur WeFoot</Text>
      </View>
    <View style={styles.mainBody}>
        
        <ScrollView  
          keyboardShouldPersistTaps="never"
          contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }} >
        
        <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={200}>
        <Text style={{color : 'red', fontSize : 20, fontWeight : 'bold', marginLeft:20}}>{errortext}</Text>
          <View style={styles.SectionStyle}>
            <FontAwesome name='user' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                placeholder='Login' 
                placeholderTextColor="#d0c8c8d6"
                onChangeText={(login) =>
                  setLogin(login)
                }
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>   
          </View>
          <View style={styles.SectionStyle}>
            <Fontisto name='key' color={'black'} style={{marginLeft:10, marginRight:10}} size={20} />
            <View style={styles.buttonStyle}>
              <TextInput style={styles.inputStyle} 
                onChangeText={(password) =>
                  sePassword(password)
                }
                placeholder='Password' 
                secureTextEntry={true}
                placeholderTextColor="#d0c8c8d6"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"

              />
            </View>   
          </View>
          
          <TouchableOpacity
              style={styles.connectButton}
              activeOpacity={0.8}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>CONNEXION</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('registerScreen')}>
              Nouveau ici ? Inscrivez-vous
            </Text>
        </KeyboardAvoidingView>
        </ScrollView>

    </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  bienvenue:{
    marginLeft: 30,
    marginTop:95,
    
  },
  mainBody: {
    backgroundColor: 'black',
    justifyContent:'center',
    flex:1
  },

  SectionStyle: {
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    height: 50,
    margin:10,
    borderRadius:20
  },
  buttonStyle: {
   flex:1
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight : '700'
  },

  inputStyle: {
    fontSize:20,
    fontWeight:'500',
    backgroundColor:'white',
    flex:1,
     borderRadius:20
  },

  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
  }
});