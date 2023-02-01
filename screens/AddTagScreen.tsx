import React, { useEffect, useState } from 'react';
import {
    Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';

import styles from '../helpers/styles';
import { getAllTags } from '../helpers/api';

export default function AddTagScreen({ navigation, route }) {
    const [name, onNameChange] = useState('');
    const [mode, setMode] = useState('');
    const [color, onColorChange] = useState('');
    const [tags, setTags] = useState(null);
    const [currentTag, setCurrentTag] = useState(null);

    //TODO move to api doc with useEffect
    async function addTag() {
        const db = getFirestore();
        let creationDateTime = Date.now()
        
        const docRef = await addDoc(collection(db, 'tags'), {
            name: name,
            color: color,
            creationDateTime: creationDateTime,
        });

        setMode(null)

        //need success state - potentially an alert bar on bottom?
    }

     //TODO move to api doc with useEffect
    async function editTag() {
        const db = getFirestore();
        const tagRef = doc(db, "tags", currentTag.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(tagRef, {
            name: name,
            color: color,
        });

        setMode(null)

        //need success state - potentially an alert bar on bottom?

    }

    useEffect(() => {
        async function getTags() {
            let tags = await getAllTags()
            setTags(tags)
          }
    
          getTags()

    }, [])

    //needs broken up - potentially move form to separate component
    return (
        <SafeAreaView style={styles.container}>
            {tags &&
                <View style={{marginBottom: 12}}>
                    <Text style={{marginBottom: 8}}>Select a Tag to edit:</Text>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} >
                        {tags.map((tag) => (
                            <TouchableOpacity 
                                style={{marginRight: 8, ...styles.tag}}
                                onPress={() => {
                                    setMode('edit');
                                    setCurrentTag(tag)
                                    onNameChange(tag.data.name);
                                    onColorChange(tag.data.color);
                                }}
                                key={tag.id}
                            >
                                <Text>{tag.data.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            }
            {!mode &&
                <>
                    <Text>Or add a new Tag</Text>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                        onPress={() => setMode('new')}
                    >
                        <Text>Add new Tag</Text>
                    </TouchableOpacity>          
                </>          
            }

            {mode &&
                <>
                    <TouchableOpacity
                        onPress={() => {
                            setMode(null)
                            onColorChange('')
                            onNameChange('')
                        }}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                    <View style={{ paddingBottom: 24 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={onNameChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Color"
                            value={color}
                            onChangeText={onColorChange}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (mode === 'new') addTag()
                            else if (mode === 'edit') editTag()
                        }}
                        style={{
                            borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <Text>{mode === 'new' ? 'Add New Tag' : 'Update Tag'}</Text>
                    </TouchableOpacity>
                </>
            }
        </SafeAreaView>
    );
}
