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
        async function getTagData(tagRef) {
            let tag = await getTag(tagRef)
            return tag
        }

        if (list.data.tags) {
            let allTags = []

            list.data.tags.forEach((tagRef) => {
                let tag = getTagData(tagRef);
                allTags.push(tag)
            });

            Promise.all(allTags).then((res)=> {
                setTags(res)
            })
        }
    }, []);

    return (
        <TouchableOpacity
            style={{borderBottomWidth: 1, padding: 6, paddingVertical: 15,}}
            onPress={() => navigation.navigate('List', {
                id: list.id,
                name: list.data.name,
                tags: tags
              })
            }
        >
            <Text style={styles.listTitle}>{list.data.name}</Text>
            <Text>{list.data.desc}</Text>
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
