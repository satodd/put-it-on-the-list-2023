import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';
import ListItem from '../components/ListItem';

export default function ListScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ borderBottomWidth: 2, paddingBottom: 12 }}>
                <Text style={{ paddingBottom: 12, ...styles.listTitle }}>Currerntly consuming</Text>
                <ScrollView
                    pagingEnabled
                    horizontal
                >
                    <View style={{ borderWidth: 1, borderStyle: 'dashed' }}>
                        <ListItem />
                    </View>
                    <View style={{ borderWidth: 1, borderStyle: 'dashed' }}>
                        <ListItem />
                    </View>
                    <View style={{ borderWidth: 1, borderStyle: 'dashed' }}>
                        <ListItem />
                    </View>
                </ScrollView>
            </View>
            <ScrollView>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </ScrollView>
        </SafeAreaView>
    );
}
