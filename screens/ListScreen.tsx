import React, { useEffect, useState } from 'react';
import {
    Text, View, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';

import styles from '../helpers/styles';
import ListItem from '../components/ListItem';
import { getListItems, deleteListItem, getDataFromReference } from '../helpers/api';
import {
    ListItemProps, RootStackParamList,
} from '../helpers/types';
import { Props } from '../App';

function AddListItemButton(parentID: string) {
    // const navigation = useNavigation<ListScreenRouteProps>();
    const navigation = useNavigation<RootStackParamList>();

    return (
        (
            <TouchableOpacity
                onPress={() => navigation.navigate('AddListItem', {
                    parentID,
                    currentData: null,
                    mode: 'new',
                })}
                style={styles.addButton}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        )
    );
}

export default function ListScreen({ route, navigation }: Props) {
    const { id, name, tags } = route.params;
    const [currentlyConsuming, setCurrentlyConsuming] = useState<ListItemProps[]>(null);
    const [listItems, setListItems] = useState<ListItemProps[]>(null);

    useEffect(() => {
        async function getItems() {
            const allItems:ListItemProps[] = await getListItems(id)
                .catch((error) => console.log(error))
                .then((res) => getDataFromReference(res));

            const currentlyConsumingRaw:ListItemProps[] = allItems.filter((item):ListItemProps => {
                if (item.data.currentlyConsuming) return item;
            });

            setCurrentlyConsuming(currentlyConsumingRaw || null);
            setListItems(allItems);
        }

        getItems()
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerRight: () => (AddListItemButton(id)),
        });
    }, [navigation]);

    function deleteItem(itemID:string) {
        deleteListItem(itemID).catch((error) => console.log(error));
    }

    function confirmDelete(itemID:string) {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete this item?', [
            {
                text: 'No, keep it',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes, delete it',
                onPress: () => deleteItem(itemID),
            },
        ]);
    }

    function updateItem(item: ListItemProps) {
        navigation.navigate('AddListItem', {
            parentID: id,
            currentData: item,
            mode: 'edit',
        });
    }

    const renderItem = (data:ListItemProps) => (
        <View style={{ borderWidth: 1 }}>
            <ListItem item={data.item} key={data.id} />
        </View>
    );

    const renderHiddenItem = (data:ListItemProps) => (
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
            {currentlyConsuming?.length > 0
                && (
                    <View style={{ borderBottomWidth: 2, paddingBottom: 12 }}>
                        <Text style={{ paddingBottom: 12, ...styles.listTitle }}>
                            Currently consuming
                        </Text>
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
                )}

            {listItems?.length > 0
                && (
                    <SwipeListView
                        data={listItems}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-150}
                        previewRowKey="0"
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                    />
                )}

            {(!listItems || listItems.length === 0)
                && (
                    <View style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1,
                    }}
                    >
                        <Text>Looks like you have nothing on this list :( </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddListItem', {
                                parentID: id,
                            })}
                            style={{
                                paddingHorizontal: 12, paddingVertical: 8, marginTop: 24, backgroundColor: 'green',
                            }}
                        >
                            <Text style={{ color: 'white' }}>Add an Item</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </SafeAreaView>
    );
}
