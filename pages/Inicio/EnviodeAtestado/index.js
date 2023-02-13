import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Api from '../../../src/services/Api';
import Icone from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function EnviodeAtestado() {
  const camRef = useRef(null);
  const [image, setImage] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permissionCamera, setPermissionCamera] = useState('granted');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalimg, setModalimg] = useState(false);
  const [json, setJson] = useState();

  const [button, setButton] = useState(true);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      setImage(result.uri);
      setModalimg(true);
    }
  };

  const enviar = async () => {
    if (!image) {
      setButton(true);
    } else [setButton(false)];
    if (image) {
      const json = await Api.uploudFiles(image);
      setJson(json);
      setButton(false);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'imagem enviada',
        button: 'ok',
      });
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionCamera(status === 'granted');
    })();
  }, [image]);

  if (permissionCamera === false) {
    return alert('Acesso a camera negado!');
  }

  const camera = async () => {
    setModalVisible(true);
  };

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setImage(data.uri);
      setModalVisible(false);
      setModalimg(true);
    }
  }
  const modalcamera = () => {
    setImage();
    setModalimg(false);
  };
  const modalcameraleft = () => {
    setImage();
    setModalimg(false);
    setModalVisible(true);
  };

  return (
    <Container>
      <View style={{ position: 'absolute', marginTop: 20, marginLeft: 20 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() =>
            navigation.reset({
              routes: [{ name: 'Home' }],
            })
          }
        >
          <Icone size={20} name="arrow-left" color="#1CADE2" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerimg}>
        <Image
          resizeMode="cover"
          style={{ width: 220, height: 145 }}
          source={require('../../../assets/logo1.png')}
        />
      </View>
      <View style={styles.containerinfo}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.txttop}>ENVIO DE ATESTADO</Text>
          <Text style={styles.txttop}>OU DECLARAÇÕES</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          {!image && (
            <View>
              <TouchableOpacity style={{ width: 400, alignItems: 'center' }} onPress={pickImage}>
                <Text style={styles.txtbutton}>
                  <Icone size={16} name="file" /> Escolher Atestado
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 400, alignItems: 'center' }} onPress={camera}>
                <Text style={styles.txtbutton}>
                  <Icone size={16} name="camera" /> Camera
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {image && (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ width: 300, alignItems: 'center' }} onPress={pickImage}>
                <Text style={styles.txtbutton}>Alterar imagem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 300, alignItems: 'center' }} onPress={camera}>
                <Text style={styles.txtbutton}>Alterar imagem com a camera</Text>
              </TouchableOpacity>
              <Text style={{ color: 'white', marginTop: 10 }}>Imagem Selecionada</Text>
            </View>
          )}
        </View>
        {button && (
          <TouchableOpacity style={{ width: 300, alignItems: 'center' }} onPress={enviar}>
            <Text style={styles.txtbutton}>
              <Icone size={16} name="paper-plane" /> ENVIAR
            </Text>
          </TouchableOpacity>
        )}
        {!button && <ActivityIndicator color={'white'} size={'large'} style={{ marginTop: 20 }} />}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Camera ref={camRef} type={type} style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.buttoncamera} onPress={takePicture}>
            <Icone size={23} name="camera" color="white" />
          </TouchableOpacity>
        </Camera>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalimg}
        onRequestClose={() => {
          setModalimg(!modalimg);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={modalcameraleft}>
              <Icone name="angle-double-left" size={35} color="#1CADE2" />
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => setModalimg(false)}>
              <Icone name="paper-plane" size={35} color="#1CADE2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 10, justifyContent: 'flex-end' }}
              onPress={modalcamera}
            >
              <Icone name="window-close" size={35} color="#1CADE2" />
            </TouchableOpacity>
          </View>

          <Image
            style={{ width: '100%', height: '80%', borderRadius: 20 }}
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
export const styles = StyleSheet.create({
  containerimg: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerinfo: {
    flex: 1,
    backgroundColor: '#1CADE2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  txttop: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  txtbutton: {
    fontSize: 17,
    color: 'white',
    backgroundColor: '#297BB4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1CADE2',
    width: 400,
    borderRadius: 30,
  },

  //modal
  buttoncamera: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CADE2',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
});
