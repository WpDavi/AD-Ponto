import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export default function UltimasMovimentacoes({ data }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.data}>
          {data.data.substr(8, 9)}/{data.data.substr(5, 2)}/
          {data.data.substr(0, 4)}
        </Text>
        <Text style={styles.data}>{`  às ${data.hora.substr(0, 5)}h`} </Text>
      </View>

      <View style={styles.item}>
        <Feather
          color={'#555555'}
          name={'check-circle'}
          size={40}
        />
        <View style={styles.conteudo}>
          <Titulo>{'Ponto Inserido'}</Titulo>
          <Text style={styles.descricao}>
            {'O ponto foi inserido com sucesso.'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Titulo = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    margin: '1%',
    marginLeft: 10,
    marginRight: 10,
  },
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
  descricao: {
    fontSize: 12,
    color: '#adadad',
  },
});
