import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import './firebaseconfig';

import { DocumentReference } from 'firebase/firestore';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ItemScreen';
import AddListScreen from './screens/AddListScreen';
import AddListItemScreen from './screens/AddListItemScreen';
import AddTagScreen from './screens/AddTagScreen';
import { ListItemProps } from './helpers/types';

type RootStackParamList = {
    Home: undefined;
    List: {
        id: string
        name: string
        tags: DocumentReference[],
        currentData?: ListItemProps,
        parentID?: string
        mode?: string
    };
    AddListItem: {
        parentID: string
        currentData?: ListItemProps,
        mode: string
    };
  };

export type Props = NativeStackScreenProps<RootStackParamList, 'List', 'AddListItem'>;

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{

                        headerShown: false,
                    }}
                />
                <Stack.Screen name="List" component={ListScreen} />
                <Stack.Screen name="AddList" component={AddListScreen} />
                <Stack.Screen name="AddListItem" component={AddListItemScreen} />
                <Stack.Screen name="AddTag" component={AddTagScreen} />
                <Stack.Screen name="Item" component={ItemScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
