import React, { useState, useEffect } from 'react';
import {
    Text, View, Button, TextInput, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import styles from '../helpers/styles';
import { addList, getAllTags } from '../helpers/api';

export default function AddListScreen({ navigation: { goBack } }) {
    const [name, onNameChange] = useState('');
    const [desc, onDescChange] = useState('');
    const [selectedTags, setSelectedTags] = useState([])
    const [allTags, setAllTags] = useState(null);

    async function addNewList() {
        await addList(name, desc, selectedTags)
        goBack()
    }

    useEffect(() => {
      async function getTags() {
        let tags = await getAllTags()

        setAllTags(tags)
      }

      getTags()
    
    }, [])

    function updateSelectedTags(newTag) {
        if (selectedTags.length === 0 || !selectedTags.includes(newTag)) {
            let tags = selectedTags.slice()
            tags.push(newTag)
            setSelectedTags(tags)
        } else if (selectedTags.includes(newTag)) {
            let tags = selectedTags.slice()
            let index = tags.indexOf(newTag)
            tags.splice(index, 1)
            setSelectedTags(tags)
        }
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
                <Text style={{marginBottom: 8}}>Tags:</Text>
                <View style={{display: 'flex', flexWrap: 'wrap'}}>
                    {allTags && allTags.map((tag) => (
                        <TouchableOpacity 
                            style={{...styles.tags, borderWidth: selectedTags.includes(tag) ? '2' : '1'}}
                            onPress={() => updateSelectedTags(tag)}
                            key={tag.id}
                        >
                            <Text>{tag.data.name}</Text>
                        </TouchableOpacity>
                    ))}                    
                </View>
            </View>
            <TouchableOpacity
                onPress={() => { addNewList(); }}
                style={{
                    borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Text>Add New List</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
