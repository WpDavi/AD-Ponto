import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import styled from 'styled-components/native';

import Api from '~/services/Api';

export default function Acoes() {
  const navigation = useNavigation();

  const [infos, setInfos] = useState();

  useEffect(() => {
    async function getInfos() {
      const res = await Api.getInformacoesPessoais();
      if (res) {
        setInfos(res.IdFaceID);
      }
    }
    getInfos();
  }, [infos]);

  const handPont = async () => {
    navigation.navigate('Ponto');
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {/*
        <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={() => navigation.navigate('BancodeHoras')}
      >
        <AreaAcao>
          <Image
            style={{ width: 36, height: 33 }}
            source={require('~/assets/bandodehoras.png')}
          />
        </AreaAcao>
        <TextAcao>Banco{'\n'} de Horas</TextAcao>
      </TouchableOpacity>

      */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={handPont}
      >
        <AreaAcao>
          <Image
            style={{ width: 25, height: 43 }}
            source={require('~/assets/bater-ponto.png')}
          />
        </AreaAcao>
        <TextAcao>Bater{'\n'}Ponto</TextAcao>
      </TouchableOpacity>

      {infos && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.botaoAcao}
          onPress={() => navigation.navigate('PontoFaceId2')}
        >
          <AreaAcao>
            <MaterialCommunityIcons
              name="face-recognition"
              size={23}
              color="black"
            />
          </AreaAcao>
          <TextAcao>Ponto{'\n'}por FaceID</TextAcao>
        </TouchableOpacity>
      )}

      {/**
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={() => navigation.navigate('Mapa')}
      >
        <AreaAcao>
          <Image style={{ width: 40, height: 30 }} source={require('~/assets/visitas.png')} />
        </AreaAcao>
        <TextAcao>Visitas</TextAcao>
      </TouchableOpacity>*/}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={() => navigation.navigate('EnviodeAtestado')}
      >
        <AreaAcao>
          <Image
            style={{ width: 25, height: 33 }}
            source={require('~/assets/atestado_medico.png')}
          />
        </AreaAcao>
        <TextAcao>Envio de{'\n'}Atestado</TextAcao>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('HistoricoDePonto')}
        activeOpacity={0.9}
        style={styles.botaoAcao}
      >
        <AreaAcao>
          <Image
            style={{ width: 28, height: 43 }}
            source={require('~/icons/historicodeponto.png')}
          />
        </AreaAcao>
        <TextAcao>Histórico{'\n'}de Pontos</TextAcao>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={() => navigation.navigate('HistoricoDeAtestado')}
      >
        <AreaAcao>
          <Feather
            name="file"
            size={26}
            color="#333"
          />
        </AreaAcao>
        <TextAcao>Relatórios de{'\n'}atestado</TextAcao>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.botaoAcao}
        onPress={() => navigation.navigate('MeuQRCode')}
      >
        <AreaAcao>
          <FontAwesome
            name="qrcode"
            size={26}
            color="#333"
          />
        </AreaAcao>
        <TextAcao>Meu QR Code</TextAcao>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Suporte')}
        activeOpacity={0.9}
        style={styles.botaoAcao}
      >
        <AreaAcao>
          <Feather
            name="message-circle"
            size={26}
            color="#333"
          />
        </AreaAcao>
        <TextAcao>Suporte</TextAcao>
      </TouchableOpacity>
    </ScrollView>
  );
}

const AreaAcao = styled.View`
  background-color: ${(props) => props.theme.draw};
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const TextAcao = styled.Text`
  margin-top: 2px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 70px;
  color: ${(props) => props.theme.color};
`;

const styles = StyleSheet.create({
  container: {
    maxHeight: 204,
    marginBottom: '4%',
    marginTop: '5%',
    paddingEnd: 6,
    paddingStart: 14,
  },
  botaoAcao: {
    alignItems: 'center',
    marginRight: 32,
  },
});
