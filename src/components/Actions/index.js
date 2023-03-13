import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';

import Api from '~/services/Api';

import { Action } from '../Action';
import { Container, Content } from './styles';

export const Actions = () => {
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
    <Container>
      <Content
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        
        {
          /*
          <Action
          onPress={() => navigation.navigate('Reports')}
          text={'Banco\nde Horas'}
          Icon={
            <Image
              style={{ width: 36, height: 33 }}
              source={require('~/assets/bandodehoras.png')}
            />
          }
        />
        
          */
        }
        
        <Action
          onPress={handPont}
          text={'Bater\nPonto'}
          Icon={
            <Image
              style={{ width: 24, height: 44 }}
              source={require('~/assets/bater-ponto.png')}
            />
          }
        />
        {infos && (
          <Action
            onPress={() => navigation.navigate('PontoFaceId2')}
            text={'Ponto por\n FaceID'}
            Icon={
              <MaterialCommunityIcons
                name="face-recognition"
                size={23}
                color="black"
              />
            }
          />
        )}
        <Action
          onPress={() => navigation.navigate('EnviodeAtestado')}
          text={'Enviar\nAtestado'}
          Icon={
            <Image
              style={{ width: 25, height: 33 }}
              source={require('~/assets/atestado_medico.png')}
            />
          }
        />
        <Action
          onPress={() => navigation.navigate('HistoricoDePonto')}
          text={'Histórico\nPontos'}
          Icon={
            <Image
              style={{ width: 28, height: 43 }}
              source={require('~/icons/historicodeponto.png')}
            />
          }
        />
        <Action
          onPress={() => navigation.navigate('HistoricoDeAtestado')}
          text={'Relatórios\natestado'}
          Icon={
            <Feather
              name="file"
              size={26}
              color="#333"
            />
          }
        />
        <Action
          onPress={() => navigation.navigate('MeuQRCode')}
          text={'Meu QR Code'}
          Icon={
            <FontAwesome
              name="qrcode"
              size={26}
              color="#333"
            />
          }
        />
        <Action
          onPress={() => navigation.navigate('Support')}
          text={'Suporte'}
          Icon={
            <Feather
              name="message-circle"
              size={26}
              color="#333"
            />
          }
        />
      </Content>
    </Container>
  );
};
