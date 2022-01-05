import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker , TextInput, Keyboard, TouchableOpacity} from 'react-native';

export default function NoteFriend({navigation}) {
    const [selectedValue, setSelectedValue] = useState("Assituité");
    const [selectedValueNote, setSelectedValueNote] = useState("06");
    const [value, showValue] = useState(false)

    const [note, showNote] = useState(false)
    return (
        <View style={styles.container}>
            <View style={{justifyContent : 'center', alignItems : 'center', paddingBottom:40}}>
                    <TextInput style={styles.inputStyles} value={selectedValue} 
                        onPressIn={() => {
                            showNote(!note) 
                            Keyboard.dismiss()
                        }} 
                        editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}
                    />
                    {
                    note && 
                    <Picker selectedValue={selectedValue} style={{ width: 250}}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue)
                            showNote(!note)
                        }}
                    >
                        <Picker.Item label="Physique" value="Physique" />
                        <Picker.Item label="Frappe" value="Frappe" />
                        <Picker.Item label="Technique" value="Technique" />
                        <Picker.Item label="Assituité" value="Assituité" />
                        <Picker.Item label="Fair-Play" value="Fair-Play" />
                    </Picker>
                    }
                   
            </View>

            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{fontSize: 20, fontWeight:'500'}}>NOTE</Text>
                    <TextInput style={styles.inputStyles} value={selectedValueNote} 
                        onPressIn={() => {
                            showValue(!value) 
                            Keyboard.dismiss()
                        }} 
                        editable={false} placeholder="Durée" autoComplete={false} autoCorrect={false}
                    />
                    {
                    value && 
                    <Picker selectedValue={selectedValueNote} style={{ width: 250}}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValueNote(itemValue)
                            showValue(!value)
                        }}
                    >
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="04" value="04" />
                    </Picker>
                    }
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('friendProfil')} style={styles.makeMatch}>
                <Text style={styles.makeText}>Valider</Text>
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
