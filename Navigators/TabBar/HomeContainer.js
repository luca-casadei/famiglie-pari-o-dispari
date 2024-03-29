import * as React from 'react';
import { NavigationContainer, useNavigationParam } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../../components/Home';
import ChangePasswordContainer from '../NavigatorChangePassword/ChangePasswrodNavigator';
import Login from '../../components/Login';


//Screen names
const homeName = "Home";
const profileName = "Profilo";
const logoutName = "Disconnetti"

const Tab = createBottomTabNavigator();

//Componente per la gestione della TabBar
const HomeContainer = ({route,navigation}) =>{
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            } 
            else if(rn === logoutName){
              iconName = focused ? 'log-out' : 'log-out-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        })}
        >

        <Tab.Screen name={homeName} component={Home} initialParams={{value:route.params}}/>
        <Tab.Screen name={profileName} component={ChangePasswordContainer} initialParams={{value:route.params}}/>
        <Tab.Screen name={logoutName} component={Login} listeners={{
              tabPress: e => {
                e.preventDefault()
                Alert.alert('Attenzione', 'L\'account verrà disconnesso!', [
                  {
                    text: 'Annulla',
                    onPress: () => console.log('Logout annullato'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK', onPress: () => {console.log('Logout effettuato'); navigation.navigate('Login');}
                  },
                ]);
              }
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeContainer;