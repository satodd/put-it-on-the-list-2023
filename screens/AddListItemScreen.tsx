import React, { useState } from 'react';
import {
    Text, View, Button, TextInput, TouchableOpacity, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import styles from '../helpers/styles';

export default function AddListItemScreen({ navigation, route }) {
    const {parentID} = route.params
    const [name, onNameChange] = useState('');
    const [desc, onDescChange] = useState('');
    const [location, onLocationChange] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //TODO move to api doc with useEffect
    async function addList() {
        const db = getFirestore();
        let creationDateTime = Date.now()
        
        const docRef = await addDoc(collection(db, 'listItems'), {
            name: name,
            desc: desc,
            creationDateTime: creationDateTime,
            currentlyConsuming: isEnabled,
            parent: parentID
        });

        navigation.navigate.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingBottom: 24 }}>
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
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={location}
                    onChangeText={onLocationChange}
                />
                <View>
                    <Text>Currently Consuming?</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

            </View>
            <TouchableOpacity
                onPress={() => { addList(); }}
                style={{
                    borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Text>Add New List Item</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
