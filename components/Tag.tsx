import React from 'react';
import { View, Text } from 'react-native';
import styles from '../helpers/styles';

function Tag({ tag }) {
    return (
        <View style={styles.tag}>
            <Text>{tag.name ? tag.name : 'fix me'}</Text>
        </View>
    );
}

export default Tag;
