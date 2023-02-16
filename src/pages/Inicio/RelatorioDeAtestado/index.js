import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icone from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Api from '../../../src/services/Api';
import styled from 'styled-components/native';

export default function RelatorioDeAtestado() {
  const [image, setImage] = useState();
  const [modalimg, setModalimg] = useState(false);
  const [listaaa, setListaaa] = useState([]);
  const [load, setLoad] = useState(true);

  const navigation = useNavigation();

  const onStart = async () => {
    const json = await Api.getAtestado();
    setLoad(false);

    setListaaa(json);
  };

  useEffect(() => {
    onStart();
  }, []);

  const renderItem = useCallback((atestado) => {
    const handleClickItem = () => {
      setImage(atestado.item.anexo);
      setModalimg(true);
    };

    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#dadada',
          marginBottom: '5%',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.containeratestado}
          onPress={handleClickItem}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.data}>
              Data: {atestado.item.data.substr(8, 9)}/{atestado.item.data.substr(5, 2)}/
              {atestado.item.data.substr(0, 4)}
            </Text>
          </View>

          <View style={styles.item}>
            <Feather color={'#555555'} name={'check-circle'} size={40} />
            <View style={styles.conteudo}>
              <Text style={styles.titulo}>{'Atestado enviado'}</Text>
              <Text style={styles.descricao}>
                {`Atestado enviado no dia ${atestado.item.data.substr(
                  8,
                  9
                )}-${atestado.item.data.substr(5, 2)}-${atestado.item.data.substr(0, 4)}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Image
          style={{ width: 40, height: 60, marginRight: 10, borderRadius: 5 }}
          source={{ uri: atestado.item.anexo }}
        />
      </SafeAreaView>
    );
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={'#1CADE2'} />
      <View
        style={{
          width: '100%',
          height: '7%',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 15,
          backgroundColor: '#1CADE2',
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 23, color: 'white', fontWeight: 'bold' }}>
          Histórico de Atestado
        </Text>
      </View>
      <View style={{ position: 'absolute', marginTop: 20 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 20 }}
          onPress={() =>
            navigation.reset({
              routes: [{ name: 'Home' }],
            })
          }
        >
          <Icone size={20} name="arrow-left" color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {listaaa.length == '0' && (
          <Image
            resizeMode="contain"
            style={{ width: 300 }}
            source={require('../../../src/icons/atestado.png')}
          />
        )}

        {load && <ActivityIndicator color={'#1CADE2'} size={'large'} />}
      </View>

      <FlatList data={listaaa} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <Modal
        initialNumToRender={15}
        animationType="slide"
        transparent={false}
        visible={modalimg}
        onRequestClose={() => {
          setModalimg(!modalimg);
        }}
      >
        <View style={{ position: 'absolute', marginTop: 20, marginLeft: 15 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalimg(false)}>
            <Icone size={24} name="arrow-left" color="#1CADE2" />
            <Text
              style={{
                marginLeft: 20,
                fontStyle: 'Normal',
                fontWeight: '700',
                color: '#1CADE2',
                fontSize: 17,
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ width: '100%', height: '80%' }}
            source={{ uri: image }}
          />
        </View>
      </Modal>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const styles = StyleSheet.create({
  containeratestado: {
    flex: 1,
    marginTop: '3%',
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
  },
  data: {
    fontSize: 12,
    color: '#0393c7',
    fontWeight: 'bold',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555555',
  },
  descricao: {
    fontSize: 12,
    color: '#555555',
  },
});
