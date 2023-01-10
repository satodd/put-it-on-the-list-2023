import { StyleSheet, Text, View, Button } from 'react-native';


export default function AddListScreen({navigation}) {

    function addList() {
        console.log("add new list!")
    }
    
    return (
        <>
            <Text>Add List</Text>
                <Button
                title="Add List"
                onPress={() => addList}
            />
        </>
    )
}