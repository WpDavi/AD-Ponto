import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { TextInput as RNPTextInput } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import { DialogAlert } from '~/components/DialogAlert';
import Api from '~/services/Api';
import { cleanText } from '~/utils/text';

export default function Senha() {
  const navigation = useNavigation();

  const [load, setLoad] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState();
  const [novaSenha, setNovaSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();

  const [passmodal, setPassmodal] = useState(false);

  const alterar = async () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      DialogAlert('Preencha todos os campos');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      DialogAlert('Nova senha e confirmar senha não conferem');
      return;
    }
    setLoad(true);
    const res = await Api.updatPass(senhaAtual, novaSenha);

    if (res === 'true') {
      setPassmodal(true);
    } else {
      setLoad(false);
      DialogAlert('Senha atual incorreta');
    }
  };
  const sair = () => {
    navigation.navigate('Home');
    setPassmodal(false);
  };
  return (
    <Container>
      <AlertNotificationRoot>
        <View style={{ backgroundColor: '#1CADE2', alignItems: 'center' }}>
          <Text style={styles.headertxt}> Alterar Senha</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            position: 'absolute',
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icone
            size={17}
            name="arrow-left"
            color="white"
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            resizeMode="contain"
            style={{ height: '25%', marginBottom: 50 }}
            source={require('~/icons/alterarsenha2.png')}
          />

          <RNPTextInput
            style={styles.input}
            placeholder="Senha atual"
            label="Senha atual"
            mode="outlined"
            secureTextEntry={true}
            theme={{ colors: { background: '#fff' } }}
            value={senhaAtual}
            onChangeText={(t) => setSenhaAtual(t)}
            onBlur={() => cleanText(senhaAtual, setSenhaAtual)}
          />

          <RNPTextInput
            style={styles.input}
            placeholder="Nova senha"
            label="Nova senha"
            mode="outlined"
            secureTextEntry={true}
            theme={{ colors: { background: '#fff' } }}
            value={novaSenha}
            onChangeText={(t) => setNovaSenha(t)}
            onBlur={() => cleanText(novaSenha, setNovaSenha)}
          />

          <RNPTextInput
            style={styles.input}
            placeholder="Confirmar senha"
            label="Confirmar senha"
            mode="outlined"
            secureTextEntry={true}
            theme={{ colors: { background: '#fff' } }}
            value={confirmarSenha}
            onChangeText={(t) => setConfirmarSenha(t)}
            onBlur={() => cleanText(confirmarSenha, setConfirmarSenha)}
          />

          <View style={{ height: 20 }} />

          {load === false && (
            <TouchableOpacity
              onPress={alterar}
              activeOpacity={0.9}
              style={styles.criar}
            >
              <Text style={styles.textoBotao}>Alterar Senha</Text>
            </TouchableOpacity>
          )}

          {load === true && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.criar}
            >
              <ActivityIndicator color={'white'} />
            </TouchableOpacity>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={passmodal}
          onRequestClose={sair}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              style={{ width: '60%', height: '35%' }}
              source={require('~/icons/scrensenha.png')}
            />

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  marginTop: 50,
                }}
              >
                Redefinição de Senha
              </Text>

              <Text
                style={{
                  marginTop: 20,
                  color: '#858585',
                  marginBottom: 20,
                }}
              >
                Sua senha foi alterada com sucesso
              </Text>
            </View>

            <TouchableOpacity
              onPress={sair}
              activeOpacity={0.9}
              style={styles.criar}
            >
              <Text style={styles.textoBotao}>Voltar para o inicio</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </AlertNotificationRoot>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    justifyContent: 'center',
    marginTop: 10,
  },
  criar: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 4,
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
  },
  headertxt: {
    color: 'white',
    padding: 7,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
