import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { ThemeContext } from '~/context/ThemeContext';
import Api from '~/services/Api';

import { Container } from './styled';

export function DrawerContent(props) {
  const [informacoesUsuario, setInformacoesUsuario] = useState();
  const [cidade, setCidade] = useState();
  const [foto, setFoto] = useState();

  const [gestor, setGestor] = useState();

  const navigation = useNavigation();

  const handleGetInformacoesPessoais = async () => {
    const res = await Api.getInformacoesPessoais();
    const cit = await Api.getCidade();
    await setCidade(cit.city);
    await setInformacoesUsuario(res);
    await setGestor(res.perfil_app);
    if (informacoesUsuario) {
      await setFoto(informacoesUsuario.foto);
    }
  };
  useEffect(() => {
    handleGetInformacoesPessoais();
  }, []);

  const logount = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{ name: 'Login' }],
    });
  };

  const { toggleTheme, theme, darkMod } = useContext(ThemeContext);

  return (
    <Container>
      <ScrollView>
        {informacoesUsuario && (
          <View
            style={{
              backgroundColor: '#1CADE2',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ marginTop: 20, marginBottom: 10, marginRight: 10 }}>
              {foto && (
                <Image
                  style={s.img}
                  source={{ uri: foto }}
                />
              )}
            </View>

            <View>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {informacoesUsuario.funcionario}
              </Text>
              <Text style={s.headertxt}>{informacoesUsuario.email}</Text>
              <Text style={s.headertxt}>{cidade}</Text>
            </View>
          </View>
        )}

        <DrawerItem
          labelStyle={{ marginLeft: -12, color: 'black' }}
          icon={({ color, size }) => (
            <FontAwesome
              name="lock"
              size={23}
              color="black"
            />
          )}
          label="Alterar Senha"
          onPress={() => navigation.navigate('Senha')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <MaterialIcons
              name="notifications"
              size={23}
              color="black"
            />
          )}
          label="Notificação"
          onPress={() => navigation.navigate('Notification')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <Entypo
              name="aircraft"
              size={23}
              color="black"
            />
          )}
          label="Solicitar período de férias"
          onPress={() => navigation.navigate('SolicitarFerias')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <Entypo
              name="pencil"
              size={20}
              color="black"
            />
          )}
          label="Solicitar edição de ponto"
          onPress={() => navigation.navigate('HistoricoDePonto')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-check"
              size={20}
              color="black"
            />
          )}
          label="Relatório De Ponto"
          onPress={() => navigation.navigate('RelatorioDePonto')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <FontAwesome
              name="history"
              size={20}
              color="black"
            />
          )}
          label="Histórico de solicitações"
          onPress={() => navigation.navigate('Solicitacoes')}
        />

        <DrawerItem
          labelStyle={{ marginLeft: -12 }}
          icon={({ color, size }) => (
            <FontAwesome
              name="qrcode"
              size={23}
              color="black"
            />
          )}
          label="Meu QR Code"
          onPress={() => navigation.navigate('MeuQRCode')}
        />

        {gestor === 'gestor' && (
          <View>
            <Text style={s.titulo}>Área do gestor</Text>

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <AntDesign
                  name="copy1"
                  size={23}
                  color="black"
                />
              )}
              label="Solicitações de funcionários"
              onPress={() => navigation.navigate('GestorSolicitacoes')}
            />

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <Fontisto
                  name="preview"
                  size={23}
                  color="black"
                />
              )}
              label="Gerenciar Pontos dos funcionários"
              onPress={() => navigation.navigate('GestorGPonto')}
            />

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  size={23}
                  color="black"
                />
              )}
              label="Gerenciar bater ponto"
              onPress={() => navigation.navigate('GestorBaterPonto')}
            />

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <AntDesign
                  name="notification"
                  size={23}
                  color="black"
                />
              )}
              label="Envio de notificação para funcionário"
              onPress={() => navigation.navigate('EnvioDeNoification')}
            />

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <FontAwesome5
                  name="newspaper"
                  size={23}
                  color="black"
                />
              )}
              label="Fechamento de folha"
              onPress={() => navigation.navigate('FechamentoDeFolha')}
            />

            {/**
            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="home-map-marker" size={23} color="black" />
              )}
              label="Cadastro de visita"
              onPress={() => navigation.navigate('GestorCadastroVisita')}
            ></DrawerItem>*/}

            <DrawerItem
              labelStyle={{ marginLeft: -12 }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="face-recognition"
                  size={23}
                  color="black"
                />
              )}
              label="Bater ponto por faceID"
              onPress={() => navigation.navigate('PontoFaceId2')}
            />
          </View>
        )}

        <View>
          <Text style={s.titulo}>Preferências</Text>
          <TouchableOpacity style={s.containerbutton}>
            <Image
              style={s.iconImg}
              source={require('~/icons/modoescuro.png')}
            />
            <Text style={s.txtbutton}>Modo escuro</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Switch
                trackColor={{ false: '#767577', true: 'black' }}
                thumbColor={darkMod ? '#00bbff' : '#00bbff'}
                ios_backgroundColor="#3e3e3e"
                value={darkMod}
                onValueChange={toggleTheme}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          <DrawerItem
            labelStyle={{ marginLeft: -12 }}
            style={{ marginBottom: -7, marginTop: -7 }}
            icon={({ color, size }) => (
              <AntDesign
                name="logout"
                size={20}
                color="black"
              />
            )}
            label="Sair da conta"
            onPress={logount}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

export const s = StyleSheet.create({
  img: {
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 100,
    borderWidth: 1,
  },
  headertxt: {
    color: 'white',
    fontSize: 11,
  },
  containerbutton: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 22,
    alignItems: 'center',
  },
  iconImg: {
    width: 15,
    height: 20,
  },
  txtbutton: {
    marginLeft: 20,
    color: 'black',
  },

  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 5,
    marginTop: 30,
    paddingLeft: 22,
    borderTopWidth: 2,
    borderColor: '#CCCCCC',
  },
});
