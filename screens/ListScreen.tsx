import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from '../helpers/styles';
import ListItem from '../components/ListItem';
import { getListItems, deleteListItem } from '../helpers/api';

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
                        parentID: id,
                        currentData: null
                    })}
                    style={styles.addButton}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            ),
        });
      }, [navigation]);
    
    async function deleteItem(id) {
        await deleteListItem(id)
    }

    function confirmDelete(id) {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete this item?', [
            {
                text: 'No, keep it',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes, delete it', 
                onPress: () => deleteItem(id)
            }
        ]);
    }

    function updateItem(item) {
        navigation.navigate('Add List Item', {
            parentID: id,
            currentData: item
        })
    }

    const renderItem = (data) => (
        <View style={{borderWidth: 1}}>
            <ListItem item={data.item} key={data.id}/>
        </View>
    );

    const renderHiddenItem = (data) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => updateItem(data.item)}
            >
                <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => confirmDelete(data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {currentlyConsuming && currentlyConsuming.length > 0 &&
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
            
            <SwipeListView
                data={listItems}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />

            {!listItems || listItems.length === 0 &&
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Looks like you have nothing on this list :( </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Add List Item', {
                            parentID: id
                        })}
                        style={{}}
                    >
                        <Text style={{}}>Add an Item</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    );
}
