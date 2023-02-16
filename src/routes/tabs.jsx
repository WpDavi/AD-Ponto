import BotaoPonto from '../components/botaoPonto';
import Inicio from '../pages/Inicio/Home';
import MinhaConta from '../pages/Inicio/MinhaConta';
import { Drawer } from './drawer';
import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

const screenOptions = {
  style: {
    borderTopColor: 'transparent',
  },
  activeTintColor: '#fff',
  tabStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  headerShown: false,
};

export const Tabs = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="Inicio"
        component={Drawer}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Ponto Eletrônico"
        component={Inicio}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <BotaoPonto color={color} />,
        }}
      />
      <Screen
        name="Minha Conta"
        component={MinhaConta}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};
