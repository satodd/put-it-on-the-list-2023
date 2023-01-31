import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './firebaseconfig';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ItemScreen';
import AddListScreen from './screens/AddListScreen';
import AddListItemScreen from './screens/AddListItemScreen';

export default function App() {
    const Stack = createNativeStackNavigator();

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
                <Stack.Screen name="Add List" component={AddListScreen} />
                <Stack.Screen name="Add List Item" component={AddListItemScreen} />
                <Stack.Screen name="Item" component={ItemScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
