import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../../src/services/Api';
import Icone from '@expo/vector-icons/FontAwesome5';
import { Feather, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

export default function Senha() {
  const navigation = useNavigation();

  const [ferias, setFerias] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const getinfo = async () => {
      const feriass = await Api.getFerias();
      if (feriass) {
        setLoad(false);
      }
      setFerias(feriass);
    };
    getinfo();
  }, [ferias]);

  return (
    <Container>
      <View style={{ backgroundColor: '#1CADE2', alignItems: 'center' }}>
        <Text style={styles.headertxt}> Histórico de solicitações férias </Text>
      </View>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 10, position: 'absolute', marginTop: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icone size={17} name="arrow-left" color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SolicitaçõesPonto');
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
            <Text style={styles.txtTitulo}>Solicitação de férias</Text>
            <FlatList
              style={{
                borderBottomWidth: 2,
                paddingBottom: 30,
                borderBottomColor: '#adadad',
              }}
              data={ferias}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
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
                      {item.status == '1' && (
                        <AntDesign color={'#555555'} name={'reload1'} size={45} />
                      )}
                      {item.status == '2' && (
                        <Feather color={'#555555'} name={'check-circle'} size={45} />
                      )}
                      {item.status == '3' && <Feather color={'#555555'} name={'x'} size={45} />}
                    </View>

                    <View>
                      <Text style={{ color: '#1CADE2' }}>Solicitação enviada</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.txtInfo}>Data de início: </Text>
                        <Text style={styles.txtInfo2}>
                          {item.data_ini.substr(8, 9)}/{item.data_ini.substr(5, 2)}/
                          {item.data_ini.substr(0, 4)}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.txtInfo}>Data de termíno: </Text>
                        <Text style={styles.txtInfo2}>
                          {' '}
                          {item.data_fim.substr(8, 9)}/{item.data_fim.substr(5, 2)}/
                          {item.data_fim.substr(0, 4)}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.txtInfo}>Status </Text>
                        <Text style={styles.txtInfo2}>
                          {item.status_solicitacao == '2'
                            ? 'Aceito'
                            : item.status_solicitacao || item.status_solicitacao == '1'
                            ? 'Pendente'
                            : item.status_solicitacao || item.status_solicitacao == '3'
                            ? 'Negado'
                            : item.status_solicitacao}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
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
});
