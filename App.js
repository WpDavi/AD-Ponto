import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultTheme, Provider } from "react-native-paper";

import * as Notifications from "expo-notifications";
import { useNotification } from "./components/Pushnotificacao";

import Tabs from "./navigation/tabs";
import Deawr from "./navigation/drawr";
import Login from "./pages/Login";
import Preload from "./pages/Preload";
import Ponto from "./pages/Inicio/Ponto/index";
import PontoCamera from "./pages/Inicio/Ponto/PontoCamera";
import PontoQrCode from "./pages/Inicio/Ponto/qrcode.js";
import EnviodeAtestado from "./pages/Inicio/EnviodeAtestado";
import BancodeHoras from "./pages/Inicio/BancodeHoras/index.js";
import HistoricoDePonto from "./pages/Inicio/HistoricoDePonto";
import HistoricoDeAtestado from "./pages/Inicio/RelatorioDeAtestado";
import Notification from "./pages/Inicio/Notification";
import PontoEmEspera from "./pages/Inicio/PontoEmEspera";
import Suporte from "./pages/Inicio/Suporte";
import PontoLogin from "./pages/Inicio/Ponto-Login";
import LoginChave from "./pages/LoginChave";
import Mapa from "./pages/Inicio/Mapa";
import VisiitasEmAndamento from "./pages/Inicio/Mapa/VisiitasEmAndamento";
import SolicitaçãoDeVisitas from "./pages/Inicio/Visitas";
//import SolicitaçãoDeVisitas from "./pages/Inicio/Mapa/SolicitaçãoDeVisitas";
import HistoricoSolicitaçãoDeVisitas from "./pages/Inicio/config/visitas/HistoricoSolicitacoes";
import HistoricoDeVisitas from "./pages/Inicio/config/visitas/HistricoVisitas";
import Assinatura from "./pages/Inicio/Mapa/Assinatura";
import PontoFaceId from "./pages/Inicio/config/GestorPontoFaceId";
import ImgAssinatura from "./pages/Inicio/config/visitas/Assinatura";

//Drawer
import Senha from "./pages/Inicio/config/Senha";
import SolicitarFerias from "./pages/Inicio/config/SolicitarFerias";
import Solicitacoes from "./pages/Inicio/config/Solicitacoes";
import SolicitaçõesPonto from "./pages/Inicio/config/solicitacoesPonto";
//import GestorSolicitacoes from "./pages/Inicio/config/GestorSolicitações";
import GestorSolicitacoes from "./pages/Inicio/gestorSolic";
//import GestorSolicitaçõesdePonto from "./pages/Inicio/config/GestorSolicitaçõesPonto";
import GestorSolicitaçõesdePonto from "./pages/Inicio/gestorSPont";
import GestorGPonto from "./pages/Inicio/config/GestorAllPontos/GestorGPonto";
import GestorBaterPonto from "./pages/Inicio/config/GestorBaterPonto";
import EnvioDeNoification from "./pages/Inicio/config/EnvioDeNotification";
import MeuQRCode from "./pages/Inicio/config/MeuQRCode";
import GestorCadastroVisita from "./pages/Inicio/config/GestorCadastroVisita";
import PontoFaceId2 from "./pages/Inicio/config/GestorPontoFaceId2";

import { ThemeProvider } from "./src/thema/contexteTheme";

const theme = {
  ...DefaultTheme,
  colors: {
    background: "#fff",
    primary: "#00bbff",
    accent: "#00bbff",
  },
};

const Stack = createStackNavigator();

export default function App() {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotification();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationReceivedListener(
      handleNotificationResponse
    );

    return () => {
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Preload"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoginChave" component={LoginChave} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Preload" component={Preload} />
          <Stack.Screen name="Ponto" component={Ponto} />
          <Stack.Screen name="PontoCamera" component={PontoCamera} />
          <Stack.Screen name="PontoQrCode" component={PontoQrCode} />
          <Stack.Screen name="EnviodeAtestado" component={EnviodeAtestado} />
          <Stack.Screen name="BancodeHoras" component={BancodeHoras} />
          <Stack.Screen name="HistoricoDePonto" component={HistoricoDePonto} />
          <Stack.Screen
            name="HistoricoDeAtestado"
            component={HistoricoDeAtestado}
          />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Deawr" component={Deawr} />
          <Stack.Screen name="Suporte" component={Suporte} />
          <Stack.Screen name="PontoEmEspera" component={PontoEmEspera} />
          <Stack.Screen name="PontoLogin" component={PontoLogin} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen
            name="VisiitasEmAndamento"
            component={VisiitasEmAndamento}
          />
          <Stack.Screen
            name="SolicitaçãoDeVisitas"
            component={SolicitaçãoDeVisitas}
          />
          <Stack.Screen
            name="HistoricoDeVisitas"
            component={HistoricoDeVisitas}
          />
          <Stack.Screen name="Assinatura" component={Assinatura} />
          <Stack.Screen name="ImgAssinatura" component={ImgAssinatura} />

          <Stack.Screen name="SolicitarFerias" component={SolicitarFerias} />
          <Stack.Screen name="Senha" component={Senha} />
          <Stack.Screen name="Solicitacoes" component={Solicitacoes} />
          <Stack.Screen
            name="SolicitaçõesPonto"
            component={SolicitaçõesPonto}
          />
          <Stack.Screen
            name="GestorSolicitacoes"
            component={GestorSolicitacoes}
          />
          <Stack.Screen
            name="GestorSolicitaçõesdePonto"
            component={GestorSolicitaçõesdePonto}
          />
          <Stack.Screen name="GestorGPonto" component={GestorGPonto} />
          <Stack.Screen name="GestorBaterPonto" component={GestorBaterPonto} />
          <Stack.Screen
            name="EnvioDeNoification"
            component={EnvioDeNoification}
          />
          <Stack.Screen name="MeuQRCode" component={MeuQRCode} />
          <Stack.Screen
            name="GestorCadastroVisita"
            component={GestorCadastroVisita}
          />
          <Stack.Screen
            name="HistoricoSolicitaçãoDeVisitas"
            component={HistoricoSolicitaçãoDeVisitas}
          />
          <Stack.Screen name="PontoFaceId" component={PontoFaceId} />
          <Stack.Screen name="PontoFaceId2" component={PontoFaceId2} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
