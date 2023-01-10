import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';

export default function HomeScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <View style={{ position: 'relative', paddingBottom: 24}}>
                    <TouchableOpacity
                        title="+"
                        onPress={() => navigation.navigate('Add List')}
                        style={{position: 'absolute', top:0, right:0, padding: 6, borderWidth: 2, borderColor: 'black' }}
                    >
                        <Text>+</Text>                    
                    </TouchableOpacity>   
                </View>
                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('List')}
                >
                    <Text>List 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('List')}
                >
                    <Text>List 2</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

  