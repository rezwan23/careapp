import React from "react"


import {StyleSheet, Text, View} from 'react-native'


export const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <Text style={styles.text}>Welcome!</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center',
        height : 100,
        backgroundColor : 'blue',
        width : '100%',
        alignContent : 'flex-start',
        flexDirection : 'column'
    },
    text : {
        fontWeight : 'bold',
        fontSize : 40,
        color : '#fff',
        flex : 2
    },
    top : {
        flex : 1,
        backgroundColor : '#ededed',
        width : '100%'
    }
})


export default Header