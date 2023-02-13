import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../../src/services/Api';
import Icone from '@expo/vector-icons/FontAwesome5';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function Senha() {
  const navigation = useNavigation();

  const [ferias, setFerias] = useState([]);
  const [load, setLoad] = useState(true);

  const [bottonLoad, setBottonLoad] = useState(false);

  const [itemFerias, setItemFerias] = useState(['1', '2', '3', '4', '5', '6', '7', '8']);
  const [modaItemFerias, setModaItemFerias] = useState(false);

  useEffect(() => {
    const getinfo = async () => {
      const feriass = await Api.getAllFerias();

      if (feriass) {
        setLoad(false);
      }
      setFerias(feriass);
    };
    getinfo();
  }, [ferias, itemFerias]);

  const AceitFerias = async () => {
    setBottonLoad(true);
    const id = itemFerias[4];
    const aceite = 2;
    const res = await Api.PutFerias(id, aceite);
    setModaItemFerias(false);
    setBottonLoad(false);
    if (res) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Você Aceitou a solicitação de ferias',
        button: 'ok',
      });
    }
  };
  const negarFerias = async () => {
    setBottonLoad(true);
    const id = itemFerias[4];
    const aceite = 3;
    const res = await Api.PutFerias(id, aceite);
    setModaItemFerias(false);
    setBottonLoad(false);

    if (res) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Você negou a solicitação de férias',
        button: 'ok',
      });
    }
  };

  //FletList Ferias
  const renderItemFerias = useCallback((ferias) => {
    const handleClickItemFerias = () => {
      setItemFerias([
        ferias.item.data_ini,
        ferias.item.data_fim,
        ferias.item.funcionario,
        ferias.item.status_solicitacao,
        ferias.item.id,
      ]);
      setModaItemFerias(true);
      console.log(itemFerias);
    };

    var status = 'Pendente';
    if (ferias.item.status_solicitacao == '2') {
      status = 'Aceito';
    } else if (ferias.item.status_solicitacao == '3') {
      status = 'Negado';
    }

    return (
      <TouchableOpacity onPress={handleClickItemFerias}>
        <View
          style={{
            marginLeft: 20,
            marginTop: 8,
            flexDirection: 'row',
            borderBottomWidth: 2,
            paddingBottom: 10,
            borderBottomColor: '#dadada',
          }}
        >
          <View>
            <Feather color={'#555555'} name={'check-circle'} size={45} />
          </View>

          <View>
            <Text style={{ color: '#1CADE2' }}>Solicitação enviada</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtInfo}>Data de início: </Text>
              <Text style={styles.txtInfo2}>
                {ferias.item.data_ini.substr(8, 9)}/{ferias.item.data_ini.substr(5, 2)}/
                {ferias.item.data_ini.substr(0, 4)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtInfo}>Data de termíno: </Text>
              <Text style={styles.txtInfo2}>
                {ferias.item.data_fim.substr(8, 9)}/{ferias.item.data_fim.substr(5, 2)}/
                {ferias.item.data_fim.substr(0, 4)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtInfo}>Funcionário </Text>
              <Text style={styles.txtInfo2}>{ferias.item.funcionario}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtInfo}>Status </Text>
              <Text style={styles.txtInfo2}>{status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Container>
      <AlertNotificationRoot>
        <View style={{ backgroundColor: '#1CADE2', alignItems: 'center' }}>
          <Text style={styles.headertxt}> Solicitações de funcionários </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GestorSolicitaçõesdePonto');
          }}
          style={{ alignItems: 'center' }}
        >
          <Text
            style={{
              backgroundColor: '#1CADE2',
              color: 'white',
              fontWeight: 'bold',
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            Alterar para solicitações de Ponto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 10, position: 'absolute', marginTop: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Icone size={17} name="arrow-left" color="white" />
        </TouchableOpacity>

        {ferias.length == 0 && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: -90 }}
          >
            <Image
              style={{ width: 210, height: 200 }}
              source={require('../../../src/icons/solicitacoes.png')}
            />

            {load == true && (
              <ActivityIndicator style={{ marginTop: 30 }} size={'large'} color="#1CADE2" />
            )}
            {load == false && (
              <Text style={{ marginTop: 30, fontWeight: 'bold', fontSize: 20 }}>
                Sem solicitações ate o momento
              </Text>
            )}
          </View>
        )}
        <View>
          {ferias.length !== 0 && (
            <View>
              <Text style={styles.txtTitulo}>Solicitação de Férias</Text>
              <FlatList
                style={{
                  borderBottomWidth: 2,
                  paddingBottom: 30,
                  borderBottomColor: '#adadad',
                }}
                data={ferias}
                keyExtractor={(item) => item.id}
                renderItem={renderItemFerias}
              />
            </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modaItemFerias}
          onRequestClose={() => {
            setModaItemFerias(!modaItemFerias);
          }}
        >
          <ImageBackground
            source={require('../../../assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <KeyboardAvoidingView
              keyboardVerticalOffset={20}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{
                backgroundColor: 'white',
                marginTop: 20,
                width: '95%',
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#dadada',
                }}
                onPress={() => {
                  setModaItemFerias(false);
                }}
              >
                <Icone size={20} name="arrow-left" color="black" />
                <Text
                  style={{
                    marginLeft: 30,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Solicitação de Férias
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: '#dadada',
                  paddingRight: 70,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>FUNCIONÁRIO: </Text>
                <Text>{itemFerias[2]}</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>DATA DE INÍCIO: </Text>
                  <Text>
                    {itemFerias[0].substr(8, 9)}/{itemFerias[0].substr(5, 2)}/
                    {itemFerias[0].substr(0, 4)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderBottomColor: '#dadada',
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>DATA DE TERMÍNO: </Text>
                  <Text>
                    {itemFerias[1].substr(8, 9)}/{itemFerias[1].substr(5, 2)}/
                    {itemFerias[1].substr(0, 4)}
                  </Text>
                </View>
              </View>

              <View></View>

              <View
                style={{
                  backgroundColor: '#0393c7',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                {bottonLoad == false && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={AceitFerias}>
                      <Image
                        style={{
                          width: 100,
                          height: 20,
                          justifyContent: 'center',
                          marginTop: 20,
                          marginBottom: 20,
                        }}
                        source={require('../../../src/icons/aceite.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={negarFerias}>
                      <Image
                        style={{
                          width: 100,
                          height: 22,
                          justifyContent: 'center',
                          marginTop: 20,
                          marginBottom: 20,
                          marginLeft: 70,
                        }}
                        source={require('../../../src/icons/negar.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {bottonLoad == true && (
                  <ActivityIndicator style={{ padding: 15 }} size={'large'} color="white" />
                )}
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
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
  headertxt: {
    color: 'white',
    padding: 7,
    fontSize: 20,
    fontWeight: 'bold',
  },
  //fletList Ferias
  txtTitulo: {
    marginTop: 20,
    marginLeft: 20,
    color: '#1CADE2',
    fontWeight: 'bold',
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: '#dadada',
  },
  txtInfo: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#555555',
  },
  txtInfo2: {
    color: '#1CADE2',
  },

  txtPonts: {
    marginLeft: 10,
  },
});
