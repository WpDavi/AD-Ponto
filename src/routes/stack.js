//import GestorSolicitacoes from "~/pages/Inicio/config/GestorSolicitações";
import { createStackNavigator } from '@react-navigation/stack';

import { GoBack } from '~/components/GoBack/index';
import BancodeHoras from '~/pages/Inicio/BancodeHoras/index.js';
import EnviodeAtestado from '~/pages/Inicio/EnviodeAtestado';
import HistoricoDePonto from '~/pages/Inicio/HistoricoDePonto';
import Mapa from '~/pages/Inicio/Mapa';
import Assinatura from '~/pages/Inicio/Mapa/Assinatura';
import VisiitasEmAndamento from '~/pages/Inicio/Mapa/VisiitasEmAndamento';
import Notification from '~/pages/Inicio/Notification';
import PontoCamera from '~/pages/Inicio/Ponto/PontoCamera';
import Ponto from '~/pages/Inicio/Ponto/index';
import PontoQrCode from '~/pages/Inicio/Ponto/qrcode.js';
import PontoEmEspera from '~/pages/Inicio/PontoEmEspera';
import { RegisterPointDisconnected } from '~/pages/Inicio/RegisterPointDisconnected';
import HistoricoDeAtestado from '~/pages/Inicio/RelatorioDeAtestado';
import { Support } from '~/pages/Inicio/Support';
import SolicitaçãoDeVisitas from '~/pages/Inicio/Visitas';
import EnvioDeNoification from '~/pages/Inicio/config/EnvioDeNotification';
import GestorGPonto from '~/pages/Inicio/config/GestorAllPontos/GestorGPonto';
import GestorBaterPonto from '~/pages/Inicio/config/GestorBaterPonto';
import GestorCadastroVisita from '~/pages/Inicio/config/GestorCadastroVisita';
import PontoFaceId from '~/pages/Inicio/config/GestorPontoFaceId';
import PontoFaceId2 from '~/pages/Inicio/config/GestorPontoFaceId2';
import MeuQRCode from '~/pages/Inicio/config/MeuQRCode';
//Drawer
import Senha from '~/pages/Inicio/config/Senha';
import Solicitacoes from '~/pages/Inicio/config/Solicitacoes';
import SolicitarFerias from '~/pages/Inicio/config/SolicitarFerias';
import SolicitaçõesPonto from '~/pages/Inicio/config/solicitacoesPonto';
import ImgAssinatura from '~/pages/Inicio/config/visitas/Assinatura';
//import SolicitaçãoDeVisitas from "~/pages/Inicio/Mapa/SolicitaçãoDeVisitas";
import HistoricoSolicitaçãoDeVisitas from '~/pages/Inicio/config/visitas/HistoricoSolicitacoes';
import HistoricoDeVisitas from '~/pages/Inicio/config/visitas/HistricoVisitas';
import GestorSolicitaçõesdePonto from '~/pages/Inicio/gestorSPont';
//import GestorSolicitaçõesdePonto from "~/pages/Inicio/config/GestorSolicitaçõesPonto";
import GestorSolicitacoes from '~/pages/Inicio/gestorSolic';
import { Login } from '~/pages/Login';
import Preload from '~/pages/Preload';
import { Drawer } from '~/routes/drawer';
import { Tabs } from '~/routes/tabs';

const { Screen, Navigator } = createStackNavigator();

const screenOptions = {
  process: true,
  gestureEnabled: true,
  animationEnabled: true,
  headerMode: 'float',
  headerStyle: {
    backgroundColor: '#1CADE2',
  },
  headerTitleAlign: 'center',
  headerTintColor: '#ffffff',
  headerBackImage: () => <GoBack />,
};

export const Stack = () => {
  return (
    <Navigator
      initialRouteName="Preload"
      screenOptions={screenOptions}
    >
      <Screen
        options={{ headerShown: false }}
        name="Preload"
        component={Preload}
      />
      <Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Screen
        options={{ headerShown: false }}
        name="Home"
        component={Tabs}
      />
      <Screen
        name="Ponto"
        component={Ponto}
      />
      <Screen
        name="PontoCamera"
        component={PontoCamera}
      />
      <Screen
        name="PontoQrCode"
        component={PontoQrCode}
      />
      <Screen
        name="EnviodeAtestado"
        component={EnviodeAtestado}
      />
      <Screen
        name="BancodeHoras"
        component={BancodeHoras}
      />
      <Screen
        name="HistoricoDePonto"
        component={HistoricoDePonto}
      />
      <Screen
        name="HistoricoDeAtestado"
        component={HistoricoDeAtestado}
      />
      <Screen
        name="Notification"
        component={Notification}
      />
      <Screen
        name="Drawer"
        component={Drawer}
      />
      <Screen
        name="Support"
        component={Support}
      />
      <Screen
        name="PontoEmEspera"
        component={PontoEmEspera}
      />
      <Screen
        options={{ title: 'Bater Ponto' }}
        name="RegisterPointDisconnected"
        component={RegisterPointDisconnected}
      />
      <Screen
        name="Mapa"
        component={Mapa}
      />
      <Screen
        name="VisiitasEmAndamento"
        component={VisiitasEmAndamento}
      />
      <Screen
        name="SolicitaçãoDeVisitas"
        component={SolicitaçãoDeVisitas}
      />
      <Screen
        name="HistoricoDeVisitas"
        component={HistoricoDeVisitas}
      />
      <Screen
        name="Assinatura"
        component={Assinatura}
      />
      <Screen
        name="ImgAssinatura"
        component={ImgAssinatura}
      />

      <Screen
        name="SolicitarFerias"
        component={SolicitarFerias}
      />
      <Screen
        name="Senha"
        component={Senha}
      />
      <Screen
        name="Solicitacoes"
        component={Solicitacoes}
      />
      <Screen
        name="SolicitaçõesPonto"
        component={SolicitaçõesPonto}
      />
      <Screen
        name="GestorSolicitacoes"
        component={GestorSolicitacoes}
      />
      <Screen
        name="GestorSolicitaçõesdePonto"
        component={GestorSolicitaçõesdePonto}
      />
      <Screen
        name="GestorGPonto"
        component={GestorGPonto}
      />
      <Screen
        name="GestorBaterPonto"
        component={GestorBaterPonto}
      />
      <Screen
        name="EnvioDeNoification"
        component={EnvioDeNoification}
      />
      <Screen
        name="MeuQRCode"
        component={MeuQRCode}
      />
      <Screen
        name="GestorCadastroVisita"
        component={GestorCadastroVisita}
      />
      <Screen
        name="HistoricoSolicitaçãoDeVisitas"
        component={HistoricoSolicitaçãoDeVisitas}
      />
      <Screen
        name="PontoFaceId"
        component={PontoFaceId}
      />
      <Screen
        name="PontoFaceId2"
        component={PontoFaceId2}
      />
    </Navigator>
  );
};
