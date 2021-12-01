import React from 'react'
import {
    Pressable,
    Text,
    StyleSheet
} from 'react-native'


export const CustomButton = (props) => {
    return (
        <Pressable
            title="Close"
            onPress={props.onPressFunction}
            style={{ width: '100%', alignItems: 'center', height: '100%' }}
        >
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },
})

export default CustomButton;