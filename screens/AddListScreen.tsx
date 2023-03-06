import React, { useState, useEffect } from 'react';
import {
    Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';
import { addList, getAllTags, getDataFromReference } from '../helpers/api';
import { TagProps } from '../helpers/types';

export default function AddListScreen({ navigation }) {
    const [name, onNameChange] = useState('');
    const [desc, onDescChange] = useState('');
    const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
    const [allTags, setAllTags] = useState<TagProps[]>(null);

    async function addNewList() {
        await addList(name, desc, selectedTags);
        navigation.goBack();
    }

    useEffect(() => {
        async function getTags() {
            const rawTags = await getAllTags();
            const tags:TagProps[] = getDataFromReference(rawTags);

            setAllTags(tags);
        }

        getTags()
            .catch((error) => console.log('error', error));
    }, []);

    function updateSelectedTags(newTag) {
        if (selectedTags.length === 0 || !selectedTags.includes(newTag)) {
            const tags = selectedTags.slice();
            tags.push(newTag);
            setSelectedTags(tags);
        } else if (selectedTags.includes(newTag)) {
            const tags = selectedTags.slice();
            const index = tags.indexOf(newTag);
            tags.splice(index, 1);
            setSelectedTags(tags);
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
                <Text style={{ marginBottom: 8 }}>Tags:</Text>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {allTags && allTags.map((tag) => (
                        <TouchableOpacity
                            style={{ ...styles.tags, borderWidth: selectedTags.includes(tag) ? '2' : '1' }}
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
