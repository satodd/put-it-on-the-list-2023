import React from 'react';
import { View, Text } from 'react-native';
import styles from '../helpers/styles';

interface TagProps {
    tag: {
        name: string
    }
}

function Tag({ tag }:TagProps) {
    return (
        <View style={styles.tag}>
            <Text>{tag.name ? tag.name : 'fix me'}</Text>
        </View>
    );
}

export default Tag;
