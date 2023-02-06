import React from 'react';
import {
    TouchableOpacity, View, Text, useWindowDimensions, TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from '../helpers/styles';
import Tag from './Tag';

function ListItem({ item }) {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    // width: 28 = 12*2 from padding, + 2*1 from border

    return (
        <TouchableHighlight
            style={{ width: width - 26, padding: 6, ...styles.list }}
            onPress={() => navigation.navigate('Item', {
                    item: item
                })
            }
        >
            <View>
                <Text style={styles.listTitle}>{item?.data ? item.data.name : 'fix me'}</Text>
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
