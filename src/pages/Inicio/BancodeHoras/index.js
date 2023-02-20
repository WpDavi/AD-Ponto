import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import Atrasos from '~/components/BandodeDados/atrasos';
import BancodeDados3 from '~/components/BandodeDados/bancodeDados';
import Extra from '~/components/BandodeDados/extra';
import Extranoturnas from '~/components/BandodeDados/extraNoturnas';
import Faltas from '~/components/BandodeDados/faltas';
import Horasnoturnas from '~/components/BandodeDados/horasNoturnas';
import Horastrabalhadas from '~/components/BandodeDados/horasTrabalhadas';
import Saldobancodehoras from '~/components/BandodeDados/saldoBancodeHoras';
import Api from '~/services/Api';

export default function BancodeHoras() {
  const [lista, setLista] = useState('');
  const navigation = useNavigation();

  const [bancodedados, setBancodedados] = useState(false);
  const [atraso, setAtraso] = useState(false);
  const [faltas, setFaltas] = useState(false);
  const [horasnoturnas, setHorasnoturnas] = useState(false);
  const [extranoturnas, setExtranoturnas] = useState(false);
  const [extra, setExtra] = useState(false);
  const [horastrabalhadas, setHorastrabalhadas] = useState(false);
  const [saldobancodehoras, setSaldobancodehoras] = useState(false);

  const [internet, setInternet] = useState();

  //verificação de ponto
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternet(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pontos = async () => {
      const pontosString = await AsyncStorage.getItem('pontos');
      if (internet === true && pontosString !== null) {
        navigation.reset({
          routes: [{ name: 'PontoEmEspera' }],
        });
      }
    };
    pontos();
  }, [internet]);
  //verificação de ponto

  const onStart = async () => {
    const json = await Api.gethours();
    setLista(json);
  };

  useEffect(() => {
    onStart();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={'#1CADE2'} />
      <ImageBackground style={{ height: '100%' }}>
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
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Banco de Horas
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            position: 'absolute',
            marginTop: 15,
          }}
          onPress={() =>
            navigation.reset({
              routes: [{ name: 'Home' }],
            })
          }
        >
          <Icone
            size={20}
            name="arrow-left"
            color="white"
          />
        </TouchableOpacity>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: -50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSaldobancodehoras(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/saldobancohora.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHorastrabalhadas(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/horastrabalhadas.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: -30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setBancodedados(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/cargahoraria.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAtraso(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/atrasos.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: -50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setFaltas(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/faltas.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHorasnoturnas(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/horasnoturnas.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: -50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setExtranoturnas(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/extranoturnas.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setExtra(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.iconsimg}
                source={require('~/icons/extra.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={bancodedados}
          onRequestClose={() => {
            setBancodedados(!bancodedados);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setBancodedados(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Carga horaria</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <BancodeDados3 data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={atraso}
          onRequestClose={() => {
            setAtraso(!atraso);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setAtraso(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Atrasos</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Atrasos data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={faltas}
          onRequestClose={() => {
            setFaltas(!faltas);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setFaltas(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Faltas</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Faltas data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={horasnoturnas}
          onRequestClose={() => {
            setHorasnoturnas(!horasnoturnas);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setHorasnoturnas(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Horas noturnas</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Horasnoturnas data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={extranoturnas}
          onRequestClose={() => {
            setExtranoturnas(!extranoturnas);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setExtranoturnas(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Horas extras noturnas</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Extranoturnas data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={extra}
          onRequestClose={() => {
            setExtra(!extra);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setExtra(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Horas Extra</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Extra data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={horastrabalhadas}
          onRequestClose={() => {
            setHorastrabalhadas(!horastrabalhadas);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setHorastrabalhadas(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Horas trabalhadas</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Horastrabalhadas data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={saldobancodehoras}
          onRequestClose={() => {
            setSaldobancodehoras(!saldobancodehoras);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 90,
                width: '95%',
                borderRadius: 10,
                paddingBottom: 20,
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
                  setSaldobancodehoras(false);
                }}
              >
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontStyle: 'Normal',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Data</Text>
                </View>
                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Dia</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txt}>Saldo banco de horas</Text>
                </View>
              </View>
              {!lista && (
                <ActivityIndicator
                  color={'#1CADE2'}
                  size={'large'}
                  style={{ marginTop: 20 }}
                />
              )}
              <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.data)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Saldobancodehoras data={item} />}
              />
            </View>
          </ImageBackground>
        </Modal>
      </ImageBackground>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const styles = StyleSheet.create({
  txt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  containertxt: {
    borderWidth: 1,
    backgroundColor: '#1CADE2',
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    marginBottom: 10,
  },
  iconsimg: {
    width: 140,
  },
});
