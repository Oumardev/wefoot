import React, {useState} from 'react';
import { StyleSheet, Text, View , Image, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalPoup = ({visible, children}) =>{
    return ( 
      <Modal transparent visible={visible}>
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>{children}</View>
        </View>
      </Modal>
      )
}

export default function FriendProfil({navigation}) {
    const [visible , setVisible] = useState(false)

  return (
    <View style={styles.container}>
        <ModalPoup visible={visible}>
            <View style={{alignItems : 'center'}}>
                <View style={styles.header}>
                    <Text style={{fontSize : 20, fontWeight :'500', color:'gray'}}>Information</Text>
                    <AntDesign onPress={() => setVisible(false) } style={{ width :30}} name="close" size={15}/>
                </View>

                <View>
                    <TouchableOpacity style={styles.signaler}>
                        <Text style={{fontSize : 27, fontWeight :'400', marginRight:50}}>Signaler</Text>
                        <Ionicons name="alert-circle-outline" size={26}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bloquer}>
                        <Text style={{fontSize : 27, fontWeight :'400', marginRight:50, color:'red'}}>Bloquer</Text>
                        <Entypo name="block" size={22} color={'red'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ModalPoup>
      <View>
        <Image 
            source={require('../assets/cover.jpg')}
            style={{
                height:200,
                marginRight: 10
            }}
        />
      </View>
      <View style={{position:'absolute', top:20}}>
        <Image 
            resizeMode='contain'
            source={require('../assets/ppexemple.jpg')}
            style={{
                height:170,
                width:170,
                borderRadius:80
            }}
        />
      </View>
      <Ionicons name="ellipsis-vertical"  onPress={() => setVisible(true) } size={28} color={'white'} style={{position:'absolute', top: 160, right: 10}} />
        <Text style={{fontSize:25, fontWeight:'500', marginTop:20}}>Oumar Alpha Yaya</Text>
        <Text style={{fontSize:25, fontWeight:'500'}}>CISSE</Text>
        <Text style={{fontSize:20, fontWeight:'400', marginTop:20}}>Notes</Text>

        <View style={styles.note}>
            <View style={styles.technique}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:40}}>
                    <Image resizeMode='contain'
                        source={require('../assets/skill.png')}
                        style={{
                            height:30,
                            width:30
                        }}
                    />
                    <Text style={{fontSize:23, fontWeight:'400'}}>Technique</Text>
                </View>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="staro" size={17}/>
            </View>

            <View style={styles.technique}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:40}}>
                    <Image resizeMode='contain'
                        source={require('../assets/frappe.png')}
                        style={{
                            height:30,
                            width:30
                        }}
                    />
                    <Text style={{fontSize:23, fontWeight:'400'}}>Frappe</Text>
                </View>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="staro" size={17}/>
            </View>
            
            <View style={styles.technique}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:40}}>
                    <Image resizeMode='contain'
                        source={require('../assets/physique.png')}
                        style={{
                            height:30,
                            width:30
                        }}
                    />
                    <Text style={{fontSize:23, fontWeight:'400'}}>Physique</Text>
                </View>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="staro" size={17}/>
            </View>

            <View style={styles.technique}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:40}}>
                    <Image resizeMode='contain'
                        source={require('../assets/regulary.jpg')}
                        style={{
                            height:30,
                            width:30
                        }}
                    />
                    <Text style={{fontSize:23, fontWeight:'400'}}>Assiduité</Text>
                </View>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="staro" size={17}/>
            </View>

            <View style={styles.technique}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:40}}>
                    <Image resizeMode='contain'
                        source={require('../assets/fairpaly.png')}
                        style={{
                            height:30,
                            width:30
                        }}
                    />
                    <Text style={{fontSize:23, fontWeight:'400'}}>Fair-Play</Text>
                </View>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="star" size={17} color={'deepskyblue'} style={{marginRight:5}}/>
                    <AntDesign name="staro" size={17}/>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('noteFriend')} style={{backgroundColor:'#4fd504c4', width:190, height:35, justifyContent:'center', alignItems:'center', borderRadius:30, marginTop:15}}>
            <Text style={{fontSize:24, fontWeight:'500', color:'white'}}>Noter le joueur</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  technique:{
      flexDirection:'row',
      alignItems:'center',
      margin:10,
      justifyContent:'space-between'
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
    justifyContent : 'space-between'
  },

  signaler:{
      flexDirection:'row',
      alignItems:'center',
      margin:10
  },

  bloquer:{
    flexDirection:'row',
    alignItems:'center',
    margin:10
  }
});
