import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import styled from 'styled-components/native';

import Api from '~/services/Api';

export default function PontoFaceId() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [image, setImage] = useState();
  const [idPessoa, setIdPessoa] = useState();

  const [modalVisible, setModalVisible] = useState(true);
  const [modalInformationUserVisible, setModalInformationUserVisible] =
    useState(false);

  const [listaPesquisa, setListaPesquisa] = useState();

  const [email, setEmail] = useState();
  const [hour, setHour] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    async function getLocation() {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { coords } = location;
        const { latitude, longitude } = coords;
        setLat(Number(latitude));
        setLong(Number(longitude));
      }
    }
    getLocation();
  }, []);

  const updateClock = () => {
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };
  setInterval(updateClock, 1000);
  useEffect(() => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    const date = ano + '/' + mes + '/' + dia;
    setDate(date);
  }, []);

  const navigation = useNavigation();
  async function takePicture() {
    console.log('clicou');
    const options = { quality: 0.5, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    // const fotob64 = data.base64;
    const fotoURI = data.uri;
    // const res = await Api.comparationFaceID(fotob64, idPessoa);
    const res = await Api.comparationFaceID(fotoURI);
    console.log(res);
    // console.log(res.msg);
    // let json = await Api.point(email, hour, date, lat, long, image);

    setModalVisible(false);
  }

  // handleFacesDetected = ({ faces }) => {
  //   //console.log(faces);

  //   if (faces[0]) {
  //     takePicture();
  //   }
  // };
  const handleFacesDetected = async () => {
    await takePicture();
    setModalVisible(false);
  };

  useEffect(() => {
    const onStart = async () => {
      const jso = await Api.getAllFuncionarios();
      await setListaPesquisa(jso);
    };
    onStart();
  }, []);

  // const renderItem = useCallback((funcionario) => {
  //   const handleClickItem = () => {
  //     setModalVisible(true);
  //     setIdPessoa(funcionario.item.pis);
  //     setEmail(funcionario.item.email);
  //   };

  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         borderBottomWidth: 1,
  //         borderBottomColor: '#dadada',
  //         marginBottom: '5%',
  //       }}
  //     >
  //       <TouchableOpacity
  //         activeOpacity={0.9}
  //         style={styles.containerfuncionario}
  //         onPress={handleClickItem}
  //       >
  //         <View style={styles.item}>
  //           {!funcionario.item.foto && (
  //             <Image
  //               style={{ width: 40, height: 40, marginRight: 8, borderRadius: 100 }}
  //               source={require('~/icons/perfil.png')}
  //             />
  //           )}
  //           {funcionario.item.foto && (
  //             <Image
  //               style={{ width: 40, height: 40, marginRight: 8, borderRadius: 100 }}
  //               source={{ uri: funcionario.item.foto }}
  //             />
  //           )}

  //           <View style={styles.conteudo}>
  //             <Text style={styles.titulo}>{`${funcionario.item.funcionario}`}</Text>
  //             <View style={{ flexDirection: 'row' }}>
  //               <Text style={styles.descricao}>Email:</Text>
  //               <Text style={{ fontSize: 12, marginLeft: 5 }}>{funcionario.item.email}</Text>
  //             </View>
  //             <View style={{ flexDirection: 'row' }}>
  //               <Text style={styles.descricao}>Data de nascimento</Text>
  //               <Text style={{ fontSize: 12, marginLeft: 5 }}>
  //                 {funcionario.item.dt_nascimento}
  //               </Text>
  //             </View>
  //             <View style={{ flexDirection: 'row' }}>
  //               <Text style={styles.descricao}>Pis</Text>
  //               <Text style={{ fontSize: 12, marginLeft: 5 }}>{funcionario.item.pis}</Text>
  //             </View>
  //             <View style={{ flexDirection: 'row' }}>
  //               <Text style={styles.descricao}>Data de admissão</Text>
  //               <Text style={{ fontSize: 12, marginLeft: 5 }}>{funcionario.item.dt_admissao}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }, []);

  return (
    <Contaier>
      <AlertNotificationRoot>
        <StatusBar backgroundColor={'#1CADE2'} />
        <ContainerHeader>
          <TxtHeader>Ponto por FaceID</TxtHeader>
        </ContainerHeader>
        <View style={{ position: 'absolute', marginTop: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', marginLeft: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Icone
              size={20}
              name="arrow-left"
              color="white"
            />
          </TouchableOpacity>
        </View>
        {listaPesquisa === null && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 200, marginTop: 500 }}
              source={require('~/icons/envionotification.png')}
            />
            <ActivityIndicator
              color={'#1CADE2'}
              size={'large'}
            />
          </View>
        )}
        {/* <FlatList
          data={listaPesquisa}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        /> */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Camera
            ref={camRef}
            onFacesDetected={handleFacesDetected}
            type={type}
            style={{ flex: 1, justifyContent: 'flex-end' }}
          >
            {/* <TouchableOpacity style={styles.buttoncamera} onPress={takePicture}>
              <Icone size={23} name="camera" color="white" />
            </TouchableOpacity> */}
          </Camera>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={modalInformationUserVisible}
        >
          <View>
            <Text>Teste</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <Text>Cancelar</Text>
              <Text>OK</Text>
            </View>
          </View>
        </Modal>
      </AlertNotificationRoot>
    </Contaier>
  );
}

const Contaier = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const ContainerHeader = styled.View`
  width: 100%;
  height: 7%;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-color: #1cade2;
`;
const TxtHeader = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  containerfuncionario: {
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

  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555555',
  },
  descricao: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
  },
  txtButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 17,
  },
  input: {
    width: '90%',
    justifyContent: 'center',
    marginLeft: 15,
  },
  buttoncamera: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CADE2',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
});
