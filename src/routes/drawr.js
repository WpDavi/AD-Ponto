import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from '../pages/Inicio/Home';
import MinhaConta from '../pages/Inicio/MinhaConta';

import { DrawerContent } from '../components/Drawer';

const Drawer = createDrawerNavigator();

const Tabs = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default Tabs;
