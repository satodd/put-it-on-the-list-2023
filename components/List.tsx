import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, View, Text } from 'react-native';

import { DocumentData } from 'firebase/firestore';
import Tag from './Tag';

import styles from '../helpers/styles';
import { getTag } from '../helpers/api';
import { ListingProps, TagProps } from '../helpers/types';

function List({ list }:ListingProps) {
    const [tags, setTags] = useState<TagProps[] | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        async function getTagData(allTags:Promise<DocumentData>[]) {
            await Promise.all(allTags)
                .catch((error) => {
                    console.log('error', error);
                })
                .then((res:TagProps[]) => setTags(res));
        }

        if (list.data.tags) {
            const allTags:Promise<DocumentData>[] = [];

            list.data.tags.forEach((tagRef) => {
                const tag = getTag(tagRef);
                allTags.push(tag);
            });

            getTagData(allTags)
                .catch((error) => console.log('error', error));
        }
    }, []);

    return (
        <TouchableOpacity
            style={{ borderBottomWidth: 1, padding: 6, paddingVertical: 15 }}
            onPress={() => navigation.navigate('List', {
                id: list.id,
                name: list.data.name,
                tags,
            })}
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
