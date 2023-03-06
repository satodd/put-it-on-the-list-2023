import React from 'react';
import { View, Text } from 'react-native';

function FormSubmission() {
    return (
        <View style={{
            position: 'absolute', bottom: 12, left: '40%', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: 'green', borderRadius: '100%',
        }}
        >
            <Text style={{ color: 'white' }}>Success</Text>
        </View>
    );
}

export default FormSubmission;
