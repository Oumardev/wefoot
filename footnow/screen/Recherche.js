import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddList from '../underScreen/addList';

export default function Recherche({navigation}) {
  const [ search, setSearch ] = useState("")

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <AntDesign name="search1"  style={styles.searchIcon} size={20} />
            <TextInput style={styles.searchTest} onChangeText={(text)=> setSearch(text)} placeholder="Rechercher un amis" />
        </View>

        <AddList search={search} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    width: '100%',
    borderBottomColor : '#141313b3',
    borderBottomWidth: 1,
    paddingBottom: 5,
    margin : 10
  },
  nom:{
    fontSize:22,
    fontWeight:'500',
    marginLeft: 10
  },
  iconfriend:{
      marginLeft: 70
  }
});
