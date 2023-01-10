import { StyleSheet, Text, View, Button } from 'react-native';


export default function ListScreen({navigation}) {
    return (
        <>
            <Text>List</Text>
                <Button
                title="Go to Item"
                onPress={() => navigation.navigate('Item')}
            />
        </>
    )
}