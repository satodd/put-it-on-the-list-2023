import react from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#fff'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative', 
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingTop: 12,
        paddingBottom: 24,
        borderBottomWidth: 2
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    list: {
        paddingVertical: 15,
        padding: 6,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    tag: {
        borderWidth: 1, 
        borderRadius: 100, 
        paddingHorizontal:6, 
        alignSelf: 'flex-start'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 2, 
        borderRadius: 2
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 24,
    },
    input: {
        height: 40,
        marginVertical: 6,
        borderWidth: 1,
        padding: 10,
    },
    tags: {
        paddingVertical: 4, 
        paddingHorizontal: 8, 
        borderRadius: 100
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
