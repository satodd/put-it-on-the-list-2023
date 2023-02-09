import React, { useState, useEffect } from 'react';
import {
    Text, View, Button, TextInput, TouchableOpacity, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    getFirestore, collection, addDoc, updateDoc, doc,
} from 'firebase/firestore';

import styles from '../helpers/styles';
import { AddListItemScreenProps } from '../helpers/types';

export default function AddListItemScreen({ navigation, route }:AddListItemScreenProps) {
    const { parentID, currentData } = route.params;
    const [mode, setMode] = useState<string>('new');
    const [name, onNameChange] = useState<string>('');
    const [desc, onDescChange] = useState<string>('');
    const [location, onLocationChange] = useState<string>('');
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    // TODO move to api doc with useEffect
    async function addListItem() {
        const db = getFirestore();
        const creationDateTime = Date.now();

        await addDoc(collection(db, 'listItems'), {
            name,
            desc,
            creationDateTime,
            currentlyConsuming: isEnabled,
            parent: parentID,
        });

        navigation.navigate.goBack();
        // goBack();
    }

    // TODO move to api doc with useEffect
    async function editListItem() {
        const db = getFirestore();
        const listItemRef = doc(db, 'listItems', currentData.id);

        await updateDoc(listItemRef, {
            name,
            desc,
            location,
            currentlyConsuming: isEnabled,
            parent: parentID,
        });

        setMode(null);

        navigation.navigate.goBack();
        // goBack();
    }

    useEffect(() => {
        if (currentData) {
            setMode('edit');
            onNameChange(currentData.data.name);
            onDescChange(currentData.data.desc);
            onLocationChange(currentData.data.location);
            setIsEnabled(currentData.data.currentlyConsuming);
        }
    }, []);

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
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

            </View>
            {mode === 'edit'
                ? (
                    <TouchableOpacity
                        onPress={() => { editListItem(); }}
                        style={{
                            borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <Text>Edit List Item</Text>
                    </TouchableOpacity>
                )
                : (
                    <TouchableOpacity
                        onPress={() => { addListItem(); }}
                        style={{
                            borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <Text>Add New List Item</Text>
                    </TouchableOpacity>
                )}

        </SafeAreaView>
    );
}
