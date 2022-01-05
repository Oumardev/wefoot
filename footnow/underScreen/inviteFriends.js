import React from 'react';
import { StyleSheet, View , TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListFriend from './ListFriend';

export default function InviteFriends({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <AntDesign name="search1"  style={styles.searchIcon} size={20} />
            <TextInput style={styles.searchTest} placeholder="Rechercher un amis" />
        </View>

        <ListFriend/>
    </View>
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
