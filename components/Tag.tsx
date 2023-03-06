import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../helpers/styles';

interface TagProps {
    tag: {
        name: string
        color?: string
    }
}

function Tag({ tag }:TagProps) {
    return (
        <View style={{ backgroundColor: tag.color, ...styles.tag }}>
            <Text style={{
                color: 'white', textShadowColor: '#000', textShadowRadius: 2, fontSize: 12,
            }}
            >
                {tag.name ? tag.name : 'fix me'}
            </Text>
        </View>
    );
}

export default Tag;
