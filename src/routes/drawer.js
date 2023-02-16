import { DrawerContent } from '../components/Drawer';
import Home from '../pages/Inicio/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';

const { Screen, Navigator } = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
};

export const Drawer = () => {
  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
