import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../helpers/styles';
import ListItem from '../components/ListItem';
import { getListItems } from '../helpers/api';

export default function ListScreen({ route, navigation }) {
    const {id, name, tags} = route.params
    const [currentlyConsuming, setCurrentlyConsuming] = useState(null)
    const [listItems, setListItems] = useState(null)

    useEffect(() => {
        async function getItems() {
            let allItems = await getListItems(id)
                .catch((error) => console.log(error))
            
            let currentlyConsumingRaw = allItems.filter((item) => {
                if (item.data.currentlyConsuming) return item
            })

            setCurrentlyConsuming(currentlyConsumingRaw ? currentlyConsumingRaw : null)
            setListItems(allItems);
        }

        getItems()
    
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Add List Item', {
                        parentID: id
                    })}
                    style={styles.addButton}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            ),
        });
      }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {currentlyConsuming &&
                <View style={{ borderBottomWidth: 2, paddingBottom: 12 }}>
                    <Text style={{ paddingBottom: 12, ...styles.listTitle }}>Currerntly consuming</Text>
                    <ScrollView
                        pagingEnabled
                        horizontal
                    >
                        {currentlyConsuming.map((item) => (
                            <View style={{ borderWidth: 1, borderStyle: 'dashed' }} key={item.id}>
                                <ListItem item={item} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            }

            <ScrollView>
                {listItems && listItems.map((item, index) => (
                    <ListItem item={item} key={item.id}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
