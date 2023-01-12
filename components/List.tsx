import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "../helpers/styles";
import Tag from "./Tag";

function List() {

  const navigation = useNavigation()
  
  return (
    <TouchableOpacity
        style={styles.list}
        onPress={() => navigation.navigate('List')}
    >
        <Text style={styles.listTitle}>List</Text>
        <View style={{display: 'flex', paddingTop: 8, flexDirection: 'row', flexWrap: 'wrap'}}>
            <Tag />
            <Tag />
            <Tag />
            <Tag />
        </View>
    </TouchableOpacity>
  )
}

export default List