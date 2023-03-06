import react from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#EBEBEB',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingTop: 12,
        paddingBottom: 24,
        borderBottomWidth: 2,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    list: {
        paddingVertical: 15,
        padding: 6,
        backgroundColor: '#fff',
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    tag: {
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 4,
        shadowOffset: { width: 4, height: 4 },
        shadowColor: '#000',
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#688B58',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 2,
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
        backgroundColor: 'white',
    },
    tags: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 100,
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
