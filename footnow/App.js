import React from 'react';
import { View, Text, TextInput , StyleSheet } from 'react-native';
import Acceuil from './screen/Acceuil';
import MesMatchs from './screen/MesMatchs';
import Recherche from './screen/Recherche';
import Reserver from './screen/Reserver';
import Profile from './screen/Profile';
import Notification from './screen/Notification';
import MakeMatch from './underScreen/makeMatch';
import infoMatch from './underScreen/infoMatch';
import NoteFriend from './underScreen/noteFriend';
import FriendProfil from './underScreen/friendProfil';
import InviteFriends from './underScreen/inviteFriends';
import Login from './screen/Auth/login'
import Register from './screen/Auth/register'
import SplashScreen from './screen/SplashScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditPtofile from './underScreen/editProfile';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const Auth = ({navigation}) =>{

  return(
    <Stack.Navigator initialRouteName="loginScreen">
      <Stack.Screen
        name = "loginScreen"
        component = {Login}
        options = {{headerShown : false}}
      />

      <Stack.Screen
        name = "registerScreen"
        component = {Register}
        
        options={{

          headerShown:false,

          headerTitle: "",
          
          headerLeft: () =>(
            <MaterialIcons onPress={() => navigation.navigate('loginScreen')} name="arrow-back-ios" size={25} style={{paddingLeft : 12}} />
          )
        }}
      />
    </Stack.Navigator>
  )

}

const Me = ({navigation}) =>{

  return(
    <Stack.Navigator initialRouteName="Me">
      <Stack.Screen
            name="Me"
            component={Profile}
            options={{
              headerTitle : "",
              headerStyle :{
                backgroundColor : 'orange',
                height : 120
              },

              headerRight: ()=>(
                <MaterialIcons name='logout' onPress={()=>{
                  AsyncStorage.removeItem('data')
                  navigation.navigate('SplashScreen')
                }} 
                style={{margin:10}} size={32} color={'#E43D40'}/>
              ),
              headerLeft: ()=>(
                <Ionicons name='md-arrow-back-circle' style={{margin:10}} size={40} color={'#F9F1F0'} />
              ),
              headerBackTitleVisible : false,
            }}
        />
    </Stack.Navigator>
  )

}

const ScreenConnected = ({navigation}) =>{
    
    return (
      <Tab.Navigator 
      tabBarOptions={{
        showLabel : false,
      }}
    >
      <Tab.Screen name="Acceuil" component={Acceuil} 
        options={{
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <MaterialCommunityIcons name={'home'} size={'25'} color={focused ? 'tomato' : 'gray'} />
              <Text style={{color :  focused ? 'tomato' : 'gray', fontSize : 15, fontWeight : '500'}} >Acceuil</Text>
            </View>)
          },

          headerStyle : {
            backgroundColor : 'rgb(26,53,88)',
            justifyContent : 'center',
            alignItems : 'center',
            height : 86,
          },

          headerRight : () =>(
            <Ionicons onPress={()=> navigation.navigate('Notification')} name="notifications-outline" size={'25'} style={{right : 15,  color:'white'}}/>
          ),
          headerLeft : () =>(
            <FontAwesome onPress={()=> navigation.navigate('Profile')} name="user-circle" size={'25'} style={{left : 15,  color:'white'}}/>
          ),
          
          headerTitle : () =>(
            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
              <AntDesign name="filter" size={'20'} color={'white'} />
              <Text style={{fontSize : 20, fontWeight : '700', color: 'white'}}>Filtrer</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="MesMatchs" component={MesMatchs} 
       options={{
        tabBarIcon: ({focused}) =>{
          return(
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            <Ionicons name={'ios-football-sharp'} size={'25'} color={focused ? 'tomato' : 'gray'} />
            <Text style={{color :  focused ? 'tomato' : 'gray', fontSize : 15, fontWeight : '500'}} >Mes matchs</Text>
          </View>)
        },
        headerTitle : ()=>(
          <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Mes matchs</Text>
        ),
        headerStyle :{
          backgroundColor : 'rgb(26,53,88)',
          height : 86
        }
      }}
      />
      <Tab.Screen name="makeMatch" component={MakeMatch} 
       options={{
        tabBarIcon: ({focused}) =>{
          return(
          <View style={{alignItems : 'center', justifyContent : 'center', bottom: 20}}>
            <AntDesign name={'pluscircle'} size={'44'} color={'#448dee'} />
          </View>)
        },
        headerTitle : ()=>(
          <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Créer un match</Text>
        ),
        headerStyle :{
          backgroundColor : 'rgb(26,53,88)',
          height : 86
        }
      }}
      />
      <Tab.Screen name="Reserver" component={Reserver} 
      options={{
        tabBarIcon: ({focused}) =>{
          return(
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            <MaterialCommunityIcons name={'calendar-month'} size={'25'} color={focused ? 'tomato' : 'gray'} />
            <Text style={{color :  focused ? 'tomato' : 'gray', fontSize : 15, fontWeight : '500'}} >Réserver</Text>
          </View>)
        },
        headerTitle : ()=>(
          <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Réserver</Text>
        ),
        headerStyle :{
          backgroundColor : 'rgb(26,53,88)',
          height : 86
        }
      }}
      />
      <Tab.Screen name="Recherche" component={Recherche} 
      options={{
        headerStyle :{
          backgroundColor : 'rgb(26,53,88)',
          height : 86
        },
        headerTitle : ()=>(
          <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Trouvez des amis</Text>
        ),
        tabBarIcon: ({focused}) =>{
          return(
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            <Ionicons name={'search'} size={'25'} color={focused ? 'tomato' : 'gray'} />
            <Text style={{color :  focused ? 'tomato' : 'gray', fontSize : 15, fontWeight : '500'}} >Rechercher</Text>
          </View>)
        }
      }}
      />
    </Tab.Navigator>
    )
}

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

         {/* SplashScreen which will come once for 5 Seconds */}
         <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{headerShown: false}}
          />

          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />

        <Stack.Screen
          name="ScreenConnected"
          component={ScreenConnected}
          options={{headerShown: false}}
        />

         <Stack.Screen
            name="infoMatch"
            component={infoMatch}
            options={{
              headerTitle : ()=>(
                <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>dim. 09 juin / 11h30</Text>
              ),
              headerStyle :{
                backgroundColor : '#448dee',
                height : 86
              },

              headerBackTitleVisible : false,
            }}
          />

          <Stack.Screen
            name="inviteFriends"
            component={InviteFriends}
            options={{
              headerTitle : ()=>(
                <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Inviter un amis</Text>
              ),
              headerStyle :{
                backgroundColor : 'black',
                height : 86
              },

              headerBackTitleVisible : false,
            }}
          />

          <Stack.Screen
            name="friendProfil"
            component={FriendProfil}
            options={{
              headerTitle : ()=>(
                <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Oumar Alpha Yaya CISSE</Text>
              ),
              headerStyle :{
                backgroundColor : 'black',
                height : 86
              },

              headerBackTitleVisible : false,
            }}
          />

          <Stack.Screen
            name="noteFriend"
            component={NoteFriend}
            options={{
              headerTitle : ()=>(
                <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Oumar Alpha Yaya CISSE</Text>
              ),
              headerStyle :{
                backgroundColor : 'black',
                height : 86
              },

              headerBackTitleVisible : false,
            }}
          /> 

          <Stack.Screen
            name="Profile"
            component={Me}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="EditPtofile"
            component={EditPtofile}
            options={{
              headerTitle : ()=>(
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:18, fontWeight:'300'}}>oums</Text>
                  <Text style={{fontSize:28, fontWeight:'700'}}>Modifier</Text>
                </View>
              ),
              headerStyle :{
                backgroundColor : 'white',
                height : 120
              },

              headerRight: ()=>(
                <AntDesign name='checkcircleo' style={{margin:10}} size={32} color={'orange'}/>
              ),
              headerLeft: ()=>(
                <AntDesign name='closecircleo' style={{margin:10}} size={32} color={'black'} />
              ),
              headerBackTitleVisible : false,
            }}
          />

        <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerTitle : ()=>(
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:28, fontWeight:'700'}}>Notification</Text>
                </View>
              ),
              headerStyle :{
                backgroundColor : 'white',
                height : 120
              },

              headerLeft: ()=>(
                <Ionicons name='chevron-back-outline' style={{margin:10}} size={32} color={'black'} />
              ),
              
              headerBackTitleVisible : false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
