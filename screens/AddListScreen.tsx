import React, {useState} from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../helpers/styles';


export default function AddListScreen({navigation}) {
    const [name, onNameChange] = React.useState('');
    const [desc, onDescChange] = React.useState('');

    function addList() {
        console.log("add new list!")
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingBottom: 24}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={onNameChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={desc}
                    onChangeText={onDescChange}
                />                
            </View>
            <TouchableOpacity
                onPress={() => addList()}
                style={{borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Text>Add New List</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}