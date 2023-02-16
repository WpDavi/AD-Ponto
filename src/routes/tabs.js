import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';

import Inicio from '../pages/Inicio/Home';
import MinhaConta from '../pages/Inicio/MinhaConta';
import Drawer from './drawr';

import BotaoPonto from '../components/botaoPonto';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          borderTopColor: 'transparent',
        },
        activeTintColor: '#fff',
        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Drawer}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Ponto Eletrônico"
        component={Inicio}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <BotaoPonto color={color} />,
        }}
      />
      <Tab.Screen
        name="Minha Conta"
        component={MinhaConta}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
