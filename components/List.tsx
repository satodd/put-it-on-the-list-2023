import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, View, Text } from 'react-native';

import Tag from './Tag';

import styles from '../helpers/styles';
import { getTag } from '../helpers/api';

function List({ list }) {
    const [tags, setTags] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        async function getTagsData(tagRef) {
            const allTags = [];

            await getTag(tagRef)
                .catch((error) => console.log(error))
                .then((res) => allTags.push(res));

            setTags(allTags);
        }

        list.tags.forEach((tagRef) => {
            getTagsData(tagRef);
        });
    }, []);

    return (
        <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate('List')}
        >
            <Text style={styles.listTitle}>{list.name}</Text>
            <Text>{list.desc}</Text>
            <View style={{
                display: 'flex', paddingTop: 8, flexDirection: 'row', flexWrap: 'wrap',
            }}
            >
                {tags?.length > 0 && tags.map((tag) => (
                    <Tag tag={tag} key={tag.name} />
                ))}
            </View>
        </TouchableOpacity>
    );
}

export default List;
