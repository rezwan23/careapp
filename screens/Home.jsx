import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    StatusBar as SB
} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import NewsFeed from "./NewsFeed";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import Profile from "./Profile";


const Tab = createMaterialBottomTabNavigator();



export default function Home({ navigation }) {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator labeled={false}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName
                        if (route.name == 'newsFeed') {
                            iconName = 'home'
                        } else if (route.name == 'profile') {
                            iconName = 'user'
                        } else if (route.name == 'new') {
                            iconName = 'plus'
                        }else{
                            iconName = 'comments'
                        }
                        size = 20
                        color = focused ? '#4999d4' : '#000'

                        return (
                            <FontAwesome5
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        )
                    }
                })
                }
                barStyle={styles.navBar}
            >
                <Tab.Screen name="newsFeed" component={NewsFeed} initialParams={{ toFetch: true }} />
                <Tab.Screen name="new" component={NewPost} initialParams={{ toFetch: true }} />
                <Tab.Screen name="profile" component={Profile} initialParams={{ toFetch: true }} />
                <Tab.Screen name="comment" component={NewComment} initialParams={{ toFetch: true }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#EEEDE7'
    }
});