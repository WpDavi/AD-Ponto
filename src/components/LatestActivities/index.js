import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  DateAndTime,
  Description,
  Item,
  ItemCol,
  Title,
} from './styles';

export const LatestActivities = ({ data }) => {
  return (
    <Container activeOpacity={0.9}>
      <View style={{ flexDirection: 'row' }}>
        <DateAndTime>
          {data.data.split('-').reverse().join('/')}
          {` às ${data.hora.slice(0, -3)}h`}
        </DateAndTime>
      </View>

      <Item>
        <Feather
          color={'#555555'}
          name={'check-circle'}
          size={40}
        />
        <ItemCol>
          <Title>Ponto Inserido</Title>
          <Description>O ponto foi inserido com sucesso.</Description>
        </ItemCol>
      </Item>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conteudo: {
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 5,
  },
  data: {
    fontSize: 12,
    color: '#0393c7',
    fontWeight: 'bold',
  },
});
