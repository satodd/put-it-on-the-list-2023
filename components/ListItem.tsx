import React from 'react';
import {
    TouchableOpacity, View, Text, useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from '../helpers/styles';
import Tag from './Tag';

function ListItem() {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    // 28 = 12*2 from padding, + 2*2 from border
    return (
        <TouchableOpacity
            style={{ width: width - 28, padding: 6, ...styles.list }}
            onPress={() => navigation.navigate('Item')}
        >
            <Text style={styles.listTitle}>Item</Text>
            <View style={{
                display: 'flex', paddingTop: 8, flexDirection: 'row', flexWrap: 'wrap',
            }}
            >
                {/* <Tag />
          <Tag /> */}
            </View>
        </TouchableOpacity>
    );
}

export default ListItem;
