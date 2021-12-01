import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React from 'react';


import screenA from './src/ScreenA';
import screenB from './src/ScreenB';


const Tab = createBottomTabNavigator()


const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName
            if (route.name == 'Screen_A') {
              iconName = 'autoprefixer'
            } else {
              iconName = 'btc'
            }
            size = focused ? 25 : 20
            color = focused ? '#0f0' : '#000'
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
      >
        <Tab.Screen
          name="Screen_A"
          component={screenA}
        />
        <Tab.Screen
          name="Screen_B"
          component={screenB}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )

}



export default App
