import React, { useEffect, useState } from 'react';
import {
    Text, View, TouchableOpacity, FlatList, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import List from '../components/List';
import { getDataFromReference, getLists } from '../helpers/api';
import styles from '../helpers/styles';

export default function HomeScreen({ navigation }) {
    const [lists, setLists] = useState(null);

    useEffect(() => {
        async function getListData() {
            const docs = await getLists();
            const rawLists = getDataFromReference(docs);
            setLists(rawLists);
        }

        getListData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Put it on the list</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Add List')}
                        style={styles.addButton}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Add Tag')}
                        style={styles.addButton}
                    >
                        <Text style={styles.buttonText}>Tag</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {lists && lists.map((list) => (
                        <List list={list} key={list.id} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
