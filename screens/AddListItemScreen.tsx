import React, { useState, useEffect } from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';
import { Props } from '../App';
import { addListItem, editListItem } from '../helpers/api';

export default function AddListItemScreen({ navigation, route }:Props) {
    const { parentID, currentData, mode } = route.params;
    // const [mode, setMode] = useState<string>('new');
    const [name, onNameChange] = useState<string>('');
    const [desc, onDescChange] = useState<string>('');
    const [location, onLocationChange] = useState<string>('');
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    async function addNewListItem() {
        await addListItem(name, desc, location, isEnabled, parentID);
        navigation.goBack();
    }

    async function editCurrentListItem() {
        await editListItem(currentData.id, name, desc, location, isEnabled, parentID);
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            title: mode === 'new' ? 'Add New' : `Edit ${name}`,
        });
    }, []);

    useEffect(() => {
        if (currentData) {
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
                    <Text style={{ marginBottom: 6 }}>Currently Consuming?</Text>
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
                        onPress={() => {
                            editCurrentListItem().catch((error) => console.log(error));
                        }}
                        style={{
                            borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <Text>Edit List Item</Text>
                    </TouchableOpacity>
                )
                : (
                    <TouchableOpacity
                        onPress={() => {
                            addNewListItem().catch((error) => console.log(error));
                        }}
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
