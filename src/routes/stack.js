import { createStackNavigator } from '@react-navigation/stack';

import { GoBack } from '~/components/GoBack';
import EnviodeAtestado from '~/pages/Inicio/EnviodeAtestado';
import HistoricoDePonto from '~/pages/Inicio/HistoricoDePonto';
import Mapa from '~/pages/Inicio/Mapa';
import Assinatura from '~/pages/Inicio/Mapa/Assinatura';
import VisiitasEmAndamento from '~/pages/Inicio/Mapa/VisiitasEmAndamento';
import Notification from '~/pages/Inicio/Notification';
import Ponto from '~/pages/Inicio/Ponto';
import PontoCamera from '~/pages/Inicio/Ponto/PontoCamera';
import PontoQrCode from '~/pages/Inicio/Ponto/qrcode';
import PontoEmEspera from '~/pages/Inicio/PontoEmEspera';
import { RegisterPointDisconnected } from '~/pages/Inicio/RegisterPointDisconnected';
import HistoricoDeAtestado from '~/pages/Inicio/RelatorioDeAtestado';
import { Reports } from '~/pages/Inicio/Reports';
import { Support } from '~/pages/Inicio/Support';
import SolicitaçãoDeVisitas from '~/pages/Inicio/Visitas';
import EnvioDeNoification from '~/pages/Inicio/config/EnvioDeNotification';
//Drawer
import FechamentoDeFolha from '~/pages/Inicio/config/FechamentoDeFolha';
import GestorGPonto from '~/pages/Inicio/config/GestorAllPontos/GestorGPonto';
import GestorBaterPonto from '~/pages/Inicio/config/GestorBaterPonto';
import GestorCadastroVisita from '~/pages/Inicio/config/GestorCadastroVisita';
import PontoFaceId from '~/pages/Inicio/config/GestorPontoFaceId';
import PontoFaceId2 from '~/pages/Inicio/config/GestorPontoFaceId2';
import MeuQRCode from '~/pages/Inicio/config/MeuQRCode';
import FechamentoFolha from '~/pages/Inicio/config/RelatorioDePonto/Relatorio';
import RelatorioDePonto from '~/pages/Inicio/config/RelatorioDePonto/index';
import Senha from '~/pages/Inicio/config/Senha';
import Solicitacoes from '~/pages/Inicio/config/Solicitacoes';
import SolicitarFerias from '~/pages/Inicio/config/SolicitarFerias';
import SolicitaçõesPonto from '~/pages/Inicio/config/solicitacoesPonto';
import ImgAssinatura from '~/pages/Inicio/config/visitas/Assinatura';
import HistoricoSolicitaçãoDeVisitas from '~/pages/Inicio/config/visitas/HistoricoSolicitacoes';
import HistoricoDeVisitas from '~/pages/Inicio/config/visitas/HistricoVisitas';
import GestorSolicitaçõesdePonto from '~/pages/Inicio/gestorSPont';
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
        name="Support"
        component={Support}
      />
      <Screen
        options={{ title: 'Banco de Horas' }}
        name="Reports"
        component={Reports}
      />
      <Screen
        options={{ title: 'Bater Ponto' }}
        name="RegisterPointDisconnected"
        component={RegisterPointDisconnected}
      />
      <Screen
        options={{ headerShown: false }}
        name="Ponto"
        component={Ponto}
      />
      <Screen
        options={{ headerShown: false }}
        name="PontoCamera"
        component={PontoCamera}
      />
      <Screen
        options={{ headerShown: false }}
        name="PontoQrCode"
        component={PontoQrCode}
      />
      <Screen
        options={{ headerShown: false }}
        name="EnviodeAtestado"
        component={EnviodeAtestado}
      />
      <Screen
        options={{ headerShown: false }}
        name="HistoricoDePonto"
        component={HistoricoDePonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="HistoricoDeAtestado"
        component={HistoricoDeAtestado}
      />
      <Screen
        options={{ headerShown: false }}
        name="Notification"
        component={Notification}
      />
      <Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={Drawer}
      />
      <Screen
        options={{ headerShown: false }}
        name="PontoEmEspera"
        component={PontoEmEspera}
      />
      <Screen
        options={{ headerShown: false }}
        name="Mapa"
        component={Mapa}
      />
      <Screen
        options={{ headerShown: false }}
        name="VisiitasEmAndamento"
        component={VisiitasEmAndamento}
      />
      <Screen
        options={{ headerShown: false }}
        name="SolicitaçãoDeVisitas"
        component={SolicitaçãoDeVisitas}
      />
      <Screen
        options={{ headerShown: false }}
        name="HistoricoDeVisitas"
        component={HistoricoDeVisitas}
      />
      <Screen
        options={{ headerShown: false }}
        name="Assinatura"
        component={Assinatura}
      />
      <Screen
        options={{ headerShown: false }}
        name="ImgAssinatura"
        component={ImgAssinatura}
      />

      <Screen
        options={{ headerShown: false }}
        name="SolicitarFerias"
        component={SolicitarFerias}
      />
      <Screen
        options={{ headerShown: false }}
        name="Senha"
        component={Senha}
      />
      <Screen
        options={{ headerShown: false }}
        name="Solicitacoes"
        component={Solicitacoes}
      />
      <Screen
        options={{ headerShown: false }}
        name="SolicitaçõesPonto"
        component={SolicitaçõesPonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="GestorSolicitacoes"
        component={GestorSolicitacoes}
      />
      <Screen
        options={{ headerShown: false }}
        name="GestorSolicitaçõesdePonto"
        component={GestorSolicitaçõesdePonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="GestorGPonto"
        component={GestorGPonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="GestorBaterPonto"
        component={GestorBaterPonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="EnvioDeNoification"
        component={EnvioDeNoification}
      />
      <Screen
        options={{ headerShown: false }}
        name="MeuQRCode"
        component={MeuQRCode}
      />
      <Screen
        options={{ headerShown: false }}
        name="GestorCadastroVisita"
        component={GestorCadastroVisita}
      />
      <Screen
        options={{ headerShown: false }}
        name="HistoricoSolicitaçãoDeVisitas"
        component={HistoricoSolicitaçãoDeVisitas}
      />
      <Screen
        options={{ headerShown: false }}
        name="PontoFaceId"
        component={PontoFaceId}
      />
      <Screen
        options={{ headerShown: false }}
        name="PontoFaceId2"
        component={PontoFaceId2}
      />
      <Screen
        options={{ headerShown: false }}
        name="FechamentoDeFolha"
        component={FechamentoDeFolha}
      />
      <Screen
        options={{ headerShown: false }}
        name="RelatorioDePonto"
        component={RelatorioDePonto}
      />
      <Screen
        options={{ headerShown: false }}
        name="FechamentoFolha"
        component={FechamentoFolha}
      />
    </Navigator>
  );
};
