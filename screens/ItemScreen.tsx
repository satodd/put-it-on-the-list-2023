import React, { useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';

export default function ItemScreen({ navigation, route }) {
    const {id, item} = route.params

    useEffect(() => {
        navigation.setOptions({
            title: item.data.name,
        });
      }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <Text>{item.data.name}</Text>
            <Text>{item.data.desc}</Text>
        </SafeAreaView>
    );
}
