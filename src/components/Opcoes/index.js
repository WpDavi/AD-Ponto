import React, { useEffect, useState } from 'react';
import Api from '../../src/services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
const date = dia + '/' + mes + '/' + ano;

const hour = new Date().toLocaleTimeString();

export default function Opcoes() {
  const [informacoesUsuario, setInformacoesUsuario] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    async function getMail() {
      const ema = await AsyncStorage.getItem('@email');
      setEmail(ema);
    }
    getMail();
  }, []);

  const handleGetInformacoesPessoais = async () => {
    const res = await Api.getInformacoesPessoais();
    await setInformacoesUsuario(res);
  };

  useEffect(() => {
    handleGetInformacoesPessoais();
    if (informacoesUsuario) {
      setEmail(informacoesUsuario.email);
    }
  }, [informacoesUsuario]);
  return (
    <Container>
      <View>
        <View style={styles.item}>
          <Text style={styles.titulo}>Email</Text>
          <Text style={styles.descricao}>{email}</Text>
        </View>
      </View>
      <View>
        <View style={styles.item}>
          <Text style={styles.titulo}>Data</Text>
          <Text style={styles.descricao}>{date}</Text>
        </View>
      </View>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: -25px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: '6%',
    paddingEnd: '6%',
    marginTop: '-6%',
    marginStart: '5%',
    marginEnd: '5%',
    borderRadius: 8,
    paddingTop: '5%',
    paddingBottom: '5%',
    zIndex: 99,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dadada',
  },
  descricao: {
    color: '#0393c7',
  },
});
