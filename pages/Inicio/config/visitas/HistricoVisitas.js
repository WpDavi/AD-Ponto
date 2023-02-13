import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icone from '@expo/vector-icons/FontAwesome5';
import Icon from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Api from '../../../../src/services/Api';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { TextInput as RNPTextInput } from 'react-native-paper';
import TodoList from '../../../../components/checklist';

export default function VisiitasEmAndamento() {
  const [cliente, setCliente] = useState();
  const [check_in, setCheck_in] = useState();
  const [check_out, setCheck_out] = useState();
  const [id, setId] = useState();

  const [visitas, setVisitas] = useState([]);
  const [button, setButton] = useState(true);

  const [inicioLoad, setInicioLoad] = useState(true);

  const [modalVisita, setModalVisita] = useState(false);
  const [modalNewTask, setModalNewTask] = useState(false);

  const [task, setTask] = useState();
  const [buttonAddTask, setButtonAddTask] = useState(true);

  //modal checkList
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ['25%', '50%', '75%'];

  //-----------------------------

  const getVisitas = async () => {
    const res = await Api.getGestorVisita();
    setVisitas(res);
    setInicioLoad(false);
  };
  useEffect(() => {
    getVisitas();
  }, []);

  async function NewTask() {
    setButtonAddTask(false);
    const id_visita = await AsyncStorage.getItem('@id');
    if (task) {
      bottomSheetModalRef.current?.close();
      const res = await Api.postTask(id_visita, task);
      setModalNewTask(false);
      navigation.navigate('HistoricoDeVisitas');
      setTask('');
      setButtonAddTask(true);
    } else {
      alert('Campo obrigatorio');
    }
  }

  const renderItem = useCallback((visitas) => {
    async function handlePresentModal() {
      await AsyncStorage.setItem('@id', String(visitas.item.id));
      bottomSheetModalRef.current?.present();
    }
    function check() {
      if (!visitas.item.check_in) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Alerta',
          textBody: 'Check-in ainda não foi registrado',
          button: 'ok',
        });
        setModalVisita(false);
      } else if (!visitas.item.check_out) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Alerta',
          textBody: 'Check-out ainda não foi registrado',
          button: 'ok',
        });
        setModalVisita(false);
        setButton(true);
      } else {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Atenção',
          textBody: 'Check-in e Check-out já cadastrado',
          button: 'ok',
        });
      }
    }

    const handleSignature = async () => {
      if (!visitas.item.assinatura) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Alerta',
          textBody: 'Assinatura não coletada',
          button: 'ok',
        });
      } else {
        await AsyncStorage.setItem('@imgAssinatura', String(visitas.item.assinatura));
        navigation.navigate('ImgAssinatura');
      }
    };
    return (
      //fletLIST PRINCIPAL ---------------------------------------------------------
      <AlertNotificationRoot>
        <Containerflet>
          <ContainerInfo>
            <ContainerTitutloName>
              <TxtTitulo>Clinete: {visitas.item.cliente}</TxtTitulo>
              <TxtTitulo>Funcionario: {visitas.item.nome_funcinario}</TxtTitulo>
            </ContainerTitutloName>
            <ContainerEndereço>
              <TxtEndereço>{visitas.item.endereço}</TxtEndereço>
            </ContainerEndereço>
            <ContainerDadosTop>
              <TxtTituloFletList>DATA:</TxtTituloFletList>
              <TxtInfo>{visitas.item.data}</TxtInfo>
            </ContainerDadosTop>
            <ContainerDados>
              <TxtTituloFletList>ASSINATURA:</TxtTituloFletList>
              <TxtInfo>{visitas.item.assinatura != null ? 'Coletada' : 'Não coletada'}</TxtInfo>
            </ContainerDados>
            {visitas.item.check_in && (
              <ContainerDados>
                <TxtTituloFletList>CHECK_IN:</TxtTituloFletList>
                <TxtInfo>{visitas.item.check_in.replace('.', ':')}h</TxtInfo>
              </ContainerDados>
            )}
            {visitas.item.check_out && (
              <ContainerDados>
                <TxtTituloFletList>CHECK_OUT:</TxtTituloFletList>
                <TxtInfo>{visitas.item.check_out.replace('.', ':')}h</TxtInfo>
              </ContainerDados>
            )}
            {visitas.item.check_out && (
              <ContainerDados>
                <TxtTituloFletList>TEMPO EM VISITA:</TxtTituloFletList>
                <TxtInfo>{visitas.item.total_horas}h</TxtInfo>
              </ContainerDados>
            )}
            {visitas.item.check_out && (
              <ContainerDados>
                <TxtTituloFletList>KMS EM ROTA:</TxtTituloFletList>
                <TxtInfo>{visitas.item.kms * 2}m</TxtInfo>
              </ContainerDados>
            )}
            {visitas.item.check_out && (
              <ContainerDados>
                <TxtTituloFletList>TEMPO EM ROTA:</TxtTituloFletList>
                <TxtInfo>{(visitas.item.tempo_em_rota * 2).toFixed(2)}h</TxtInfo>
              </ContainerDados>
            )}
            {visitas.item.check_out && (
              <ContainerDados>
                <TxtTituloFletList>REEMBOLSO:</TxtTituloFletList>
                <TxtInfo>R$ {(visitas.item.reembolso * 2).toFixed(2)}</TxtInfo>
              </ContainerDados>
            )}
            <ContainerButtons>
              <TouchableOpacity onPress={handlePresentModal}>
                <ImgButton source={require('../../../../src/icons/checklist.png')} />
              </TouchableOpacity>
              {!visitas.item.check_out && (
                <ConteinerImgButtonCenter onPress={check}>
                  <ImgButtonCenter source={require('../../../../src/icons/notcheck.png')} />
                </ConteinerImgButtonCenter>
              )}
              {visitas.item.check_out && (
                <ConteinerImgButtonCenter onPress={check}>
                  <ImgButtonCenter source={require('../../../../src/icons/aguardando.png')} />
                </ConteinerImgButtonCenter>
              )}
              <TouchableOpacity onPress={handleSignature}>
                <ImgButton source={require('../../../../src/icons/assinatura.png')} />
              </TouchableOpacity>
            </ContainerButtons>
          </ContainerInfo>
        </Containerflet>
      </AlertNotificationRoot>
    );
  });

  const navigation = useNavigation();
  return (
    <Container>
      <AlertNotificationRoot>
        <BottomSheetModalProvider>
          <Header>
            <HeaderTitulo>Em andamento ou concluidas</HeaderTitulo>
          </Header>
          <HeaderConteinerButoon>
            <HeaderButton onPress={() => navigation.goBack()}>
              <Icone size={20} name="arrow-left" color="white" />
            </HeaderButton>
          </HeaderConteinerButoon>
          {visitas.length == 0 && (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{ width: 250, height: 165, marginBottom: 23, marginTop: 120 }}
                source={require('../../../../src/icons/visitas.png')}
              />
              {inicioLoad == false && (
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#999999' }}>
                  Sem visitas no momento
                </Text>
              )}
              {inicioLoad == true && <ActivityIndicator size={'large'} color={'#0393c7'} />}
            </View>
          )}
          <FlatList data={visitas} renderItem={renderItem} keyExtractor={(item, index) => index} />

          {/*Modal de Task------------------------------ */}
          <BottomSheetModal ref={bottomSheetModalRef} index={2} snapPoints={snapPoints}>
            <View>
              <ContainerModalChek>
                <TituloModa>CheckList</TituloModa>
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetModalRef.current?.close();
                  }}
                >
                  <Icon style={{ marginRight: 15 }} size={35} name="close" color="black" />
                </TouchableOpacity>
              </ContainerModalChek>
              <TodoList />
            </View>

            <ButtonAdd
              onPress={() => {
                setModalNewTask(true);
              }}
            >
              <Icon size={35} name="add" color="white" />
            </ButtonAdd>
          </BottomSheetModal>

          {/*MODAL NOVA TASK ---------------------------------------------*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalNewTask}
            onRequestClose={() => {
              setModalNewTask(!modalNewTask);
            }}
          >
            <ContainerModalTask>
              <ContainerTitutloModalTask>
                <TouchableOpacity
                  onPress={() => {
                    setModalNewTask(false);
                  }}
                >
                  <Icone size={20} name="arrow-left" color="white" />
                </TouchableOpacity>
                <TituloModalTas>NOVA TAREFA</TituloModalTas>
                <Icone size={20} name="arrow-left" color="#1cade2" />
              </ContainerTitutloModalTask>
              <RNPTextInput
                style={styles.input}
                placeholder="Tarefa"
                label="Tarefa"
                mode="outlined"
                theme={{ colors: { background: '#fff' } }}
                value={task}
                onChangeText={(t) => setTask(t)}
              />
              {buttonAddTask && (
                <ButtonNewTask onPress={NewTask}>
                  <TxtButtonNewTask>Adicionar</TxtButtonNewTask>
                </ButtonNewTask>
              )}
              {!buttonAddTask && (
                <ButtonNewTask>
                  <ActivityIndicator color={'white'} />
                </ButtonNewTask>
              )}
            </ContainerModalTask>
          </Modal>
        </BottomSheetModalProvider>
      </AlertNotificationRoot>
    </Container>
  );
}

const styles = StyleSheet.create({
  txtButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    justifyContent: 'center',
    marginTop: 30,
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  width: 100%;
  height: 7%;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-color: #1cade2;
`;
const HeaderTitulo = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;
const HeaderConteinerButoon = styled.View`
  position: absolute;
  margin-top: 20px;
`;

const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 20px;
`;

//Modal de Task

const ContainerModalChek = styled.View`
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TituloModa = styled.Text`
  font-weight: bold;
  padding: 15px;
  font-size: 25px;
  padding-bottom: -15px;
`;

const ButtonAdd = styled.TouchableOpacity`
  background-color: #1cade2;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 35px;
  right: 35px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

//Modal Criar task

const ContainerModalTask = styled.View`
  height: 40%;
  width: 100%;
  background-color: #e8e8e8;
  position: absolute;
  bottom: 0px;
  align-items: center;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;
const ContainerTitutloModalTask = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  background-color: #1cade2;
  align-items: center;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

const TituloModalTas = styled.Text`
  padding: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const ButtonNewTask = styled.TouchableOpacity`
  width: 90%;
  align-items: center;
  background-color: #1cade2;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
`;
const TxtButtonNewTask = styled.Text`
  padding: 15px;
  font-weight: bold;
  color: white;
`;

//fletList

const Containerflet = styled.View`
  align-items: center;
`;
const ContainerInfo = styled.View`
  width: 95%;
  border-width: 2px;
  align-items: center;
  border-color: #1cade2;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const ContainerTitutloName = styled.View`
  width: 100%;
  align-items: center;
  border-bottom-width: 2px;
`;

const TxtTitulo = styled.Text`
  font-weight: bold;
  font-size: 17px;
  padding-bottom: -15px;
`;

const ContainerEndereço = styled.View`
  width: 80%;
`;

const TxtEndereço = styled.Text`
  font-weight: bold;
  text-align: center;
`;

const ContainerDadosTop = styled.View`
  align-self: flex-start;
  flex-direction: row;
  border-top-width: 1px;
  width: 100%;
  margin-top: 20px;
  padding-top: 5px;
`;

const ContainerDados = styled.View`
  align-self: flex-start;
  flex-direction: row;
  width: 100%;
`;

const TxtTituloFletList = styled.Text`
  font-weight: bold;
  margin-left: 20px;
  color: ${(props) => props.theme.color};
`;

const TxtInfo = styled.Text`
  margin-left: 5px;
  color: #1cade2;
`;

const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #1cade2;
`;
const ImgButton = styled.Image`
  width: 35px;
  height: 35px;
`;

const ConteinerImgButtonCenter = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  margin-left: 42%;
`;

const ImgButtonCenter = styled.Image`
  width: 70px;
  height: 70px;
`;
