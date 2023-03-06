import React, { useEffect, useState } from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    getFirestore, collection, addDoc, doc, updateDoc,
} from 'firebase/firestore';
import ColorPicker from 'react-native-wheel-color-picker';

import styles from '../helpers/styles';
import { getAllTags, getDataFromReference } from '../helpers/api';
import { TagProps } from '../helpers/types';
import Tag from '../components/Tag';

export default function AddTagScreen() {
    const [name, onNameChange] = useState<string>('');
    const [mode, setMode] = useState<string>('');
    const [color, onColorChange] = useState<string>('');
    const [tags, setTags] = useState<TagProps[]>(null);
    const [currentTag, setCurrentTag] = useState<TagProps>(null);
    const [colorModalVisible, setColorModalVisible] = useState<boolean>(false);

    // TODO move to api doc with useEffect
    async function addTag() {
        const db = getFirestore();
        const creationDateTime = Date.now();

        await addDoc(collection(db, 'tags'), {
            name,
            color,
            creationDateTime,
        });

        setMode(null);

        // need success state - potentially an alert bar on bottom?
    }

    // TODO move to api doc with useEffect
    async function editTag() {
        const db = getFirestore();
        const tagRef = doc(db, 'tags', currentTag.id);

        await updateDoc(tagRef, {
            name,
            color,
        });

        setMode(null);

        // need success state - potentially an alert bar on bottom?
    }

    useEffect(() => {
        async function getTags() {
            await getAllTags()
                .then((res) => {
                    const tagData = getDataFromReference(res);
                    setTags(tagData);
                });
        }

        getTags()
            .catch((error) => console.log('error', error));
    }, []);

    // needs broken up - potentially move form to separate component
    return (
        <SafeAreaView style={styles.container}>
            {tags
                && (
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 8 }}>Select a Tag to edit:</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {tags.map((tag) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setMode('edit');
                                        setCurrentTag(tag);
                                        onNameChange(tag.data.name);
                                        onColorChange(tag.data.color);
                                    }}
                                    key={tag.id}
                                >
                                    <Tag tag={tag.data} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            {!mode
                && (
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
                )}

            {mode
                && (
                    <>
                        <View style={{ paddingBottom: 24 }}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={name}
                                onChangeText={onNameChange}
                            />
                            <TouchableOpacity
                                onPress={() => setColorModalVisible(true)}
                                style={{ height: 50, backgroundColor: color }}
                            />
                            <Modal
                                animationType="slide"
                                transparent
                                visible={colorModalVisible}
                                onRequestClose={() => {
                                    setColorModalVisible(!colorModalVisible);
                                }}
                            >
                                <View style={{ flex: 1, padding: 24, backgroundColor: 'white' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setColorModalVisible(false);
                                        }}
                                    >
                                        <Text style={{ fontSize: 32 }}>X</Text>
                                    </TouchableOpacity>
                                    <ColorPicker
                                        // ref={(r) => { this.picker = r; }}
                                        color={color}
                                        onColorChange={onColorChange}
                                        // onColorChangeComplete={this.onColorChangeComplete}
                                        thumbSize={40}
                                        sliderSize={40}
                                        noSnap
                                        row={false}
                                        // swatchesLast={this.state.swatchesLast}
                                        // swatches={this.state.swatchesEnabled}
                                        // discrete={this.state.disc}
                                    />
                                </View>
                            </Modal>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (mode === 'new') addTag();
                                else if (mode === 'edit') editTag();
                            }}
                            style={{
                                borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <Text>{mode === 'new' ? 'Add New Tag' : 'Update Tag'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setMode(null);
                                onColorChange('');
                                onNameChange('');
                            }}
                            style={{
                                marginTop: 12, borderWidth: 1, width: '100%', padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </>
                )}
        </SafeAreaView>
    );
}
