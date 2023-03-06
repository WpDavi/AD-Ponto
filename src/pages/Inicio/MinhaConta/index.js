import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { TextInputMask } from 'react-native-masked-text';

import { useNavigation } from '@react-navigation/native';

import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

import { DialogSuccess } from '~/components/DialogSuccess';
import Api from '~/services/Api';
import { cleanText } from '~/utils/text';

import { Container, InformaçõesPessoais, Nome } from './styled';

export default function MinhaConta() {
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploudd, setUploudd] = useState();

  const navigation = useNavigation();
  const [nomeInput, setNomeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [pisInput, setPisInput] = useState('');
  const [cpfInput, setCpfInput] = useState('');
  const [dtNascimentoInput, setDtNascimentoInput] = useState('');
  const [ctpsInput, setCtpsInput] = useState('');
  const [rgInput, setRgInput] = useState('');
  const [disabledInput, setDisabledInput] = useState(true);
  const [loadingAlterarButton, setLoadingAlterarButton] = useState(false);
  const [informacoesUsuario, setInformacoesUsuario] = useState();
  const [dtNascimento, setDtNascimento] = useState('');
  const [hasGalleryPermission, setHasGaleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [disabledAlterar, setDisabledAlterar] = useState(true);
  const [uploudimg, setUploudimg] = useState();

  const alterarimg = async () => {
    setLoading(true);
    const uploud = await Api.uploudImgPerfil(uploudimg);
    setUploudd(uploud);

    if (uploudd) {
      DialogSuccess('Imagem enviada');
      navigation.reset({
        routes: [{ name: 'Drawer' }],
      });
    } else {
      DialogSuccess('Imagem enviada');
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'Drawer' }],
        });
      }, 2000);
    }
  };

  useEffect(() => {
    if (
      nomeInput ||
      emailInput ||
      pisInput ||
      cpfInput ||
      dtNascimentoInput ||
      ctpsInput ||
      rgInput
    ) {
      setDisabledAlterar(false);
    } else {
      setDisabledAlterar(true);
    }
  }, [
    nomeInput,
    emailInput,
    pisInput,
    cpfInput,
    dtNascimentoInput,
    rgInput,
    ctpsInput,
  ]);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGaleryPermission(galleryStatus.status === 'granted');
    })();
  }, [uploudd]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setModalImage(true);
      setUploudimg(result.uri);
      handleGetInformacoesPessoais();
    }
    if (hasGalleryPermission === false) {
      return <Text>Sem acesso a galeria</Text>;
    }
  };

  useEffect(() => {
    handleGetInformacoesPessoais();
    setDisabledInput(true);
  }, []);

  const handleGetInformacoesPessoais = async () => {
    const res = await Api.getInformacoesPessoais();
    setNomeInput(res.funcionario);
    setEmailInput(res.email);
    setPisInput(res.pis);

    setCpfInput(res.cpf);
    setRgInput(res.rg);
    setCtpsInput(res.ctps);

    await setInformacoesUsuario(res);
    const dt = res.dt_nascimento.split('-', 3);
    setDtNascimento(dt[2] + '/' + dt[1] + '/' + dt[0]);
    setDtNascimentoInput(dt[2] + '/' + dt[1] + '/' + dt[0]);
  };
  useEffect(() => {
    handleGetInformacoesPessoais;
    const img = () => {
      if (informacoesUsuario) {
        setImage(informacoesUsuario.foto);
      }
    };
    img();
  }, [informacoesUsuario]);

  const formataCPF = (cpf) => {
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, '');
    //realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formataPis = (pis) => {
    if (pis) {
      pis = pis.replace(/\D/g, ''); //Remove tudo o que não é dígito
      pis = pis.replace(/^(\d{3})(\d)/, '$1.$2'); //Coloca ponto entre o terceiro e o quarto dígitos
      pis = pis.replace(/^(\d{3})\.(\d{5})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
      pis = pis.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, '$1.$2.$3.$4'); //Coloca ponto entre o décimo e o décimo primeiro dígitos
      return pis;
    }
  };

  const formataRg = (rg) => {
    if (rg) {
      rg = rg.replace(/\D/g, ''); //Substituí o que não é dígito por "", /g é [Global][1]
      rg = rg.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
      // \d{1,2} = Separa 1 grupo de 1 ou 2 carac. (\d{3}) = Separa 1 grupo de 3 carac. (\d{1}) = Separa o grupo de 1 carac.
      // "$1.$2.$3-$4" = recupera os grupos e adiciona "." após cada.
      return rg;
    }
  };

  const handleLogout = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{ name: 'Login' }],
    });
  };

  const handleAlterar = async () => {
    setLoadingAlterarButton(true);
    setDisabledAlterar(true);
    /* const formData = new FormData();
    const fileURL = image.uri;
    const fileName = fileURL.split("/").pop();
    const ext = fileURL.split(".").pop();
     formData.append("files", {
      uri: image.uri,
      name: fileName,
      type: "image/" + ext,
    }); */
    const data = {
      id: informacoesUsuario.id,
      cpf: cpfInput ? cpfInput : informacoesUsuario.cpf,
      ctps: ctpsInput ? ctpsInput : informacoesUsuario.ctps,
      dt_nascimento: dtNascimentoInput
        ? dtNascimentoInput
        : informacoesUsuario.dt_nascimento,
      funcionario: nomeInput ? nomeInput : informacoesUsuario.funcionario,
      rg: rgInput ? rgInput : informacoesUsuario.rg,
    };
    await Api.updateInformacoesPessoais(data)
      .then(() => {
        Alert.alert('Dados atualizados.', 'Seus dados foram atualizados', [
          { text: 'OK', onPress: () => console.log('ok') },
        ]);
      })
      .catch(() => {
        Alert.alert(
          'Falha ao atualizar.',
          'Falha ao atualizar dados de usuario',
          [{ text: 'OK', onPress: () => console.log('ok') }],
        );
      });
    setDisabledInput(true);
    setLoadingAlterarButton(false);
    setDisabledAlterar(false);
  };

  return (
    <SafeAreaView>
      <Container>
        <AlertNotificationRoot>
          {informacoesUsuario ? (
            <View>
              <View style={styles.header}>
                <View style={styles.flexContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.reset({
                        routes: [{ name: 'Home' }],
                      })
                    }
                  >
                    <Icone
                      color="#00bbff"
                      size={20}
                      name="arrow-left"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notification')}
                  style={styles.btnNotificacoes}
                  activeOpacity={0.9}
                >
                  <Feather
                    name="bell"
                    size={27}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => pickImage()}>
                <View style={styles.perfilStyled}>
                  {image && (
                    <Image
                      style={styles.perfil}
                      source={{ uri: image ? image : undefined }}
                    />
                  )}
                  {!image && <Image style={styles.perfilVazio} />}
                  <Icone
                    size={16}
                    name="edit"
                    style={styles.lapis}
                  />
                </View>
              </TouchableOpacity>
              <Nome>{informacoesUsuario.funcionario}</Nome>
              <View style={styles.formTitulo}>
                <InformaçõesPessoais>Informações pessoais</InformaçõesPessoais>
                <TouchableOpacity onPress={() => setDisabledInput(false)}>
                  <Image
                    source={require('~/assets/edit.png')}
                    style={styles.edit}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <View
                  style={disabledInput ? styles.inputDisabled : styles.input}
                >
                  <Text style={styles.inputTitle}>Nome</Text>
                  <TextInput
                    placeholder={'Name'}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={nomeInput}
                    onChangeText={setNomeInput}
                    onBlur={() => cleanText(nomeInput, setNomeInput)}
                  />
                </View>
                <View style={styles.inputDisabled}>
                  <Text style={styles.inputTitle}>Email</Text>
                  <TextInput
                    placeholder={informacoesUsuario.email}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={emailInput}
                    onChangeText={setEmailInput}
                    onBlur={() => cleanText(emailInput, setEmailInput)}
                  />
                </View>
                <View style={styles.inputDisabled}>
                  <Text style={styles.inputTitle}>pis</Text>
                  <TextInputMask
                    placeholder={formataPis(informacoesUsuario.pis)}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={pisInput}
                    onChangeText={setPisInput}
                    options={{
                      mask: '999.99999.99-9',
                      maskType: 'BRL',
                    }}
                    type="custom"
                  />
                </View>
                <View
                  style={disabledInput ? styles.inputDisabled : styles.input}
                >
                  <Text style={styles.inputTitle}>Data Nascimento</Text>
                  <TextInputMask
                    placeholder={dtNascimento}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={dtNascimentoInput}
                    onChangeText={setDtNascimentoInput}
                    type="datetime"
                    options={{
                      mask: ['99/99/9999'],
                      maskType: 'BRL',
                    }}
                  />
                </View>
                <View
                  style={disabledInput ? styles.inputDisabled : styles.input}
                >
                  <Text style={styles.inputTitle}>CPF</Text>
                  <TextInputMask
                    placeholder={formataCPF(
                      informacoesUsuario.cpf
                        ? informacoesUsuario.cpf
                        : '000000000',
                    )}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    options={{
                      mask: ['999.999.999-99'],
                      maskType: 'BRL',
                    }}
                    value={cpfInput}
                    onChangeText={setCpfInput}
                    type="cpf"
                  />
                </View>
                <View
                  style={disabledInput ? styles.inputDisabled : styles.input}
                >
                  <Text style={styles.inputTitle}>RG</Text>
                  <TextInputMask
                    placeholder={formataRg(informacoesUsuario.rg)}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={rgInput}
                    onChangeText={setRgInput}
                    options={{
                      mask: '99.999.999-9',
                      maskType: 'BRL',
                    }}
                    type="custom"
                  />
                </View>
                <View
                  style={disabledInput ? styles.inputDisabled : styles.input}
                >
                  <Text style={styles.inputTitle}>CTPS</Text>
                  <TextInput
                    placeholder={informacoesUsuario.ctps}
                    style={styles.placeholderInput}
                    editable={!disabledInput}
                    selectTextOnFocus={!disabledInput}
                    value={ctpsInput}
                    onChangeText={setCtpsInput}
                    onBlur={() => cleanText(ctpsInput, setCtpsInput)}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={
                  disabledAlterar ? styles.alterarDisabled : styles.alterar
                }
                onPress={() => handleAlterar()}
                disabled={disabledAlterar}
              >
                {loadingAlterarButton && (
                  <ActivityIndicator
                    size="large"
                    color="#FFF"
                  />
                )}
                {!loadingAlterarButton && (
                  <Text style={styles.alterarText}>Alterar</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator
                size="large"
                color="#00BBFF"
              />
            </View>
          )}
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.sair}
          >
            <Text style={styles.alterarText}>Sair</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalImage}
            onRequestClose={() => {
              setModalImage(!modalImage);
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalImage(false);
                }}
                style={{ position: 'absolute', marginTop: 15, marginLeft: 20 }}
              >
                <FontAwesome5
                  size={20}
                  name="arrow-left"
                  color="#666666"
                />
              </TouchableOpacity>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 20,
                      color: '#666666',
                    }}
                  >
                    MUDAR FOTO DO PERFIL
                  </Text>
                </View>

                <Image
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: 100,
                    marginTop: 50,
                  }}
                  source={{ uri: uploudimg }}
                />
                <Text style={{ fontSize: 18, marginTop: 20 }}>
                  Curtiu essa?
                </Text>
              </View>

              {loading === false && (
                <TouchableOpacity
                  onPress={alterarimg}
                  activeOpacity={0.9}
                  style={styles.criar}
                >
                  <Text style={styles.textoBotao}>Curti</Text>
                </TouchableOpacity>
              )}
              {loading === true && (
                <TouchableOpacity style={styles.criar}>
                  <ActivityIndicator color={'white'} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={pickImage}
                style={{ alignItems: 'center', marginTop: 30 }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  <Ionicons
                    size={20}
                    name="ios-camera-reverse-outline"
                    color="#666666"
                  />
                  Escolher outra
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </AlertNotificationRoot>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //MODAL
  criar: {
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 20,
    height: 40,
  },

  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
  },
  //MODAL

  container: {
    width: '100%',
    height: 900,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    padding: 24,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  iconVoltar: {
    width: 24,
    height: 24,
  },
  voltar: {
    marginLeft: 20,
    fontStyle: 'Normal',
    fontWeight: '700',
  },
  config: {
    width: 24,
    height: 24,
  },
  perfil: {
    width: 144,
    height: 136,
    marginTop: 20,
    borderRadius: 70,
  },
  perfilVazio: {
    width: 144,
    height: 136,
    marginTop: 20,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#151E35',
  },
  perfilStyled: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formTitulo: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  edit: {
    marginBottom: -8,
    width: 65,
    height: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 14,
    height: 48,
    padding: 16,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputDisabled: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 14,
    height: 48,
    padding: 16,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.5,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  inputTitle: {
    color: '#151E35',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 16,
  },
  placeholderInput: {
    fontStyle: 'Normal',
    fontWeight: '400',
    color: '#A9A9A9',
    fontSize: 12,
    lineHeight: 16,
  },
  alterar: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 12,
    width: '90%',
    backgroundColor: '#00bbff',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '900',
    borderRadius: 8,
  },
  sair: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 40,
    width: '90%',
    backgroundColor: '#00bbff',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '900',
    borderRadius: 8,
  },
  alterarDisabled: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 12,
    width: '90%',
    backgroundColor: '#00bbff',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '900',
    borderRadius: 8,
    opacity: 0.5,
  },
  alterarText: {
    alignItems: 'center',
    color: '#fff',
    fontWeight: '900',
  },
  lapis: {
    marginTop: 116,
    marginLeft: -40,
  },
  btnNotificacoes: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    color: '#FFF',
  },
});
