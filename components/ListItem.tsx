import React from 'react';
import {
    TouchableOpacity, View, Text, useWindowDimensions, TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from '../helpers/styles';
import Tag from './Tag';
import EyeIcon from './icons/EyeIcon';

interface ItemProps {
    item: {
        id: string
        data: {
            name: string
            desc: string
            location: string
            currentlyConsuming: boolean
        }
    }
}

function ListItem({ item }: ItemProps) {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    // width: 28 = 12*2 from padding, + 2*1 from border
    return (
        <TouchableHighlight
            style={{ width: width - 26, padding: 6, ...styles.list }}
            onPress={() => navigation.navigate('Item', {
                item,
            })}
        >
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 8 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginBottom: 4,
                }}
                >
                    <Text style={{ marginRight: 8, ...styles.listTitle }}>{item?.data ? item.data.name : 'fix me'}</Text>
                    <EyeIcon currentlyConsuming={item.data.currentlyConsuming} />

                </View>
                <Text>{item.data.location}</Text>
                <Text>{item.data.desc}</Text>

                <View style={{
                    display: 'flex', paddingTop: 8, flexDirection: 'row', flexWrap: 'wrap',
                }}
                >
                    {/* <Tag />
            <Tag /> */}
                </View>
            </View>

        </TouchableHighlight>
    );
}

export default ListItem;
