import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Text, View, TouchableOpacity, FlatList, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import List from '../components/List';
import { getDataFromReference, getLists } from '../helpers/api';
import styles from '../helpers/styles';
import { ListProps } from '../helpers/types';

export default function HomeScreen({ navigation }) {
    const [lists, setLists] = useState<ListProps[]>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function getListData() {
            const docs = await getLists();
            const rawLists = getDataFromReference(docs);
            setLists(rawLists);
        }

        getListData()
            .catch((error) => console.log(error));
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Put it on the list</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddList')}
                        style={styles.addButton}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddTag')}
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
