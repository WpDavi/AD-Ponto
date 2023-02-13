import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../../src/services/Api";
import Icone from "@expo/vector-icons/FontAwesome5";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

export default function GestorSolicitaçõesdePonto() {
  const navigation = useNavigation();

  const [solicitacaoPonto, setSolicitacaoPonto] = useState([]);
  const [load, setLoad] = useState(true);

  const [bottonLoad, setBottonLoad] = useState(false);

  const [modalItemPonto, setModalItemPonto] = useState(false);

  const [observacao, setObservacao] = useState();
  const [pis, setPis] = useState();
  const [data, setData] = useState();
  const [entrada1, setEntrada1] = useState(null);
  const [saida1, setSaida1] = useState(null);
  const [entrada2, setEntrada2] = useState(null);
  const [saida2, setSaida2] = useState(null);
  const [entrada3, setEntrada3] = useState(null);
  const [saida3, setSaida3] = useState(null);
  const [entrada4, setEntrada4] = useState(null);
  const [saida4, setSaida4] = useState(null);
  const [entrada5, setEntrada5] = useState(null);
  const [saida5, setSaida5] = useState(null);
  const [entrada6, setEntrada6] = useState(null);
  const [saida6, setSaida6] = useState(null);
  const [entrada7, setEntrada7] = useState(null);
  const [saida7, setSaida7] = useState(null);
  const [entrada8, setEntrada8] = useState(null);
  const [saida8, setSaida8] = useState(null);
  const [entrada9, setEntrada9] = useState(null);
  const [saida9, setSaida9] = useState(null);
  const [entrada10, setEntrada10] = useState(null);
  const [saida10, setSaida10] = useState(null);
  const [funcionario, setFuncionario] = useState();

  const [entrada11, setEntrada11] = useState(null);
  const [saida11, setSaida11] = useState(null);
  const [entrada22, setEntrada22] = useState(null);
  const [saida22, setSaida22] = useState(null);
  const [entrada33, setEntrada33] = useState(null);
  const [saida33, setSaida33] = useState(null);
  const [entrada44, setEntrada44] = useState(null);
  const [saida44, setSaida44] = useState(null);
  const [entrada55, setEntrada55] = useState(null);
  const [saida55, setSaida55] = useState(null);
  const [entrada66, setEntrada66] = useState(null);
  const [saida66, setSaida66] = useState(null);
  const [entrada77, setEntrada77] = useState(null);
  const [saida77, setSaida77] = useState(null);
  const [entrada88, setEntrada88] = useState(null);
  const [saida88, setSaida88] = useState(null);
  const [entrada99, setEntrada99] = useState(null);
  const [saida99, setSaida99] = useState(null);
  const [entrada100, setEntrada100] = useState(null);
  const [saida100, setSaida100] = useState(null);

  const [obsentrada1, setObsentrada1] = useState(false);
  const [obsSaisa1, setObsSaisa1] = useState(false);
  const [obsentrada2, setObsentrada2] = useState(false);
  const [obsSaisa2, setObsSaisa2] = useState(false);
  const [obsentrada3, setObsentrada3] = useState(false);
  const [obsSaisa3, setObsSaisa3] = useState(false);
  const [obsentrada4, setObsentrada4] = useState(false);
  const [obsSaisa4, setObsSaisa4] = useState(false);
  const [obsentrada5, setObsentrada5] = useState(false);
  const [obsSaisa5, setObsSaisa5] = useState(false);
  const [obsentrada6, setObsentrada6] = useState(false);
  const [obsSaisa6, setObsSaisa6] = useState(false);
  const [obsentrada7, setObsentrada7] = useState(false);
  const [obsSaisa7, setObsSaisa7] = useState(false);
  const [obsentrada8, setObsentrada8] = useState(false);
  const [obsSaisa8, setObsSaisa8] = useState(false);
  const [obsentrada9, setObsentrada9] = useState(false);
  const [obsSaisa9, setObsSaisa9] = useState(false);
  const [obsentrada10, setObsentrada10] = useState(false);
  const [obsSaisa10, setObsSaisa10] = useState(false);

  useEffect(() => {
    const getinfo = async () => {
      const solicitacaoPontoo = await Api.getAllSolicitaçãoPonto();
      if (solicitacaoPontoo) {
        setLoad(false);
      }

      setSolicitacaoPonto(solicitacaoPontoo);
    };
    getinfo();
  }, [solicitacaoPonto]);

  const aceitarPonto = async () => {
    setBottonLoad(true);
    const res = await Api.editPonto(
      entrada1,
      saida1,
      entrada2,
      saida2,
      entrada3,
      saida3,
      entrada4,
      saida4,
      entrada5,
      saida5,
      entrada6,
      saida6,
      entrada7,
      saida7,
      entrada8,
      saida8,
      entrada9,
      saida9,
      entrada10,
      saida10,
      pis,
      data
    );

    const status = "2";
    const ress = await Api.StatusSolicitarEditPonto(pis, data, status);
    setBottonLoad(false);

    if (res && ress) {
      setModalItemPonto(false);

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Sucesso",
        textBody: "Ponto Alterado com sucesso",
        button: "ok",
      });
    }
  };

  const negarPonto = async () => {
    setBottonLoad(true);
    const status = "3";
    const ress = await Api.StatusSolicitarEditPonto(pis, data, status);
    if (ress) {
      setModalItemPonto(false);
      setBottonLoad(false);

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Sucesso",
        textBody: "Solicitação de alteração de ponto negado",
        button: "ok",
      });
    }
  };

  //FletList Ponto
  const renderItemPonto = useCallback((ItemPonto) => {
    const handleClickItemPonto = () => {
      setEntrada1(ItemPonto.item.entrada_1_solicitacao);
      setSaida1(ItemPonto.item.saida_1_solicitacao);
      setEntrada2(ItemPonto.item.entrada_2_solicitacao);
      setSaida2(ItemPonto.item.saida_2_solicitacao);
      setEntrada3(ItemPonto.item.entrada_3_solicitacao);
      setSaida3(ItemPonto.item.saida_3_solicitacao);
      setEntrada4(ItemPonto.item.entrada_4_solicitacao);
      setSaida4(ItemPonto.item.saida_4_solicitacao);
      setEntrada5(ItemPonto.item.entrada_5_solicitacao);
      setSaida5(ItemPonto.item.saida_5_solicitacao);
      setEntrada6(ItemPonto.item.entrada_6_solicitacao);
      setSaida6(ItemPonto.item.saida_6_solicitacao);
      setEntrada7(ItemPonto.item.entrada_7_solicitacao);
      setSaida7(ItemPonto.item.saida_7_solicitacao);
      setEntrada8(ItemPonto.item.entrada_8_solicitacao);
      setSaida8(ItemPonto.item.saida_8_solicitacao);
      setEntrada9(ItemPonto.item.entrada_9_solicitacao);
      setSaida9(ItemPonto.item.saida_9_solicitacao);
      setEntrada10(ItemPonto.item.entrada_10_solicitacao);
      setSaida10(ItemPonto.item.saida_10_solicitacao);

      setEntrada11(ItemPonto.item.entrada_1_atual);
      setSaida11(ItemPonto.item.saida_1_atual);
      setEntrada22(ItemPonto.item.entrada_2_atual);
      setSaida22(ItemPonto.item.saida_2_atual);
      setEntrada33(ItemPonto.item.entrada_3_atual);
      setSaida33(ItemPonto.item.saida_3_atual);
      setEntrada44(ItemPonto.item.entrada_4_atual);
      setSaida44(ItemPonto.item.saida_4_atual);
      setEntrada55(ItemPonto.item.entrada_5_atual);
      setSaida55(ItemPonto.item.saida_5_atual);
      setEntrada66(ItemPonto.item.entrada_6_atual);
      setSaida66(ItemPonto.item.saida_6_atual);
      setEntrada77(ItemPonto.item.entrada_7_atual);
      setSaida77(ItemPonto.item.saida_7_atual);
      setEntrada88(ItemPonto.item.entrada_8_atual);
      setSaida88(ItemPonto.item.saida_8_atual);
      setEntrada99(ItemPonto.item.entrada_9_atual);
      setSaida99(ItemPonto.item.saida_9_atual);
      setEntrada100(ItemPonto.item.entrada_10_atual);
      setSaida100(ItemPonto.item.saida_10_atual);

      setObsentrada1(ItemPonto.item.obs_entrada1);
      setObsSaisa1(ItemPonto.item.obs_saida1);
      setObsentrada2(ItemPonto.item.obs_entrada2);
      setObsSaisa2(ItemPonto.item.obs_saida2);
      setObsentrada3(ItemPonto.item.obs_entrada3);
      setObsSaisa3(ItemPonto.item.obs_saida3);
      setObsentrada4(ItemPonto.item.obs_entrada4);
      setObsSaisa4(ItemPonto.item.obs_saida4);
      setObsentrada5(ItemPonto.item.obs_entrada5);
      setObsSaisa5(ItemPonto.item.obs_saida5);
      setObsentrada6(ItemPonto.item.obs_entrada6);
      setObsSaisa6(ItemPonto.item.obs_saida6);
      setObsentrada7(ItemPonto.item.obs_entrada7);
      setObsSaisa7(ItemPonto.item.obs_saida7);
      setObsentrada8(ItemPonto.item.obs_entrada8);
      setObsSaisa8(ItemPonto.item.obs_saida8);
      setObsentrada9(ItemPonto.item.obs_entrada9);
      setObsSaisa9(ItemPonto.item.obs_saida9);
      setObsentrada10(ItemPonto.item.obs_entrada10);
      setObsSaisa10(ItemPonto.item.obs_saida10);

      setObservacao(ItemPonto.item.observacao);
      setPis(ItemPonto.item.pis);
      setData(ItemPonto.item.data_marcacao);
      setFuncionario(ItemPonto.item.funcionario);

      setModalItemPonto(true);
      console.log(ItemPonto.item.data_marcacao);
    };

    var status = "Pendente";
    if (ItemPonto.item.status == "2") {
      status = "Aceito";
    } else if (ItemPonto.item.status == "3") {
      status = "Negado";
    }

    return (
      <TouchableOpacity onPress={handleClickItemPonto}>
        <View
          style={{
            marginLeft: 20,
            marginTop: 8,
            flexDirection: "row",
            borderBottomWidth: 2,
            paddingBottom: 10,
            borderBottomColor: "#dadada",
          }}
        >
          <View>
            <Feather color={"#555555"} name={"check-circle"} size={45} />
          </View>

          <View>
            <Text style={{ color: "#1CADE2" }}>
              Solicitação de edição de ponto
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtInfo}>FUNCIONÁRIO: </Text>
              <Text style={styles.txtInfo2}>{ItemPonto.item.funcionario}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtInfo}>DATA DA MARCAÇÃO: </Text>
              <Text style={styles.txtInfo2}>
                {ItemPonto.item.data_marcacao.substr(8, 2)}/
                {ItemPonto.item.data_marcacao.substr(5, 2)}/
                {ItemPonto.item.data_marcacao.substr(0, 4)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtInfo}>DATA DA SOLICITAÇÃO </Text>
              <Text style={styles.txtInfo2}>
                {ItemPonto.item.data_solicitacao.substr(8, 2)}/
                {ItemPonto.item.data_solicitacao.substr(5, 2)}/
                {ItemPonto.item.data_solicitacao.substr(0, 4)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtInfo}>Status </Text>
              <Text style={styles.txtInfo2}>{status}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txtInfo}>Observação </Text>
              <Text style={styles.txtInfo2}>{ItemPonto.item.observacao}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Container>
      <AlertNotificationRoot>
        <View style={{ backgroundColor: "#1CADE2", alignItems: "center" }}>
          <Text style={styles.headertxt}> Solicitações de funcionários </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GestorSolicitacoes");
          }}
          style={{ alignItems: "center" }}
        >
          <Text
            style={{
              backgroundColor: "#1CADE2",
              color: "white",
              fontWeight: "bold",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            Alterar para solicitações de férias
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: 10,
            position: "absolute",
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icone size={17} name="arrow-left" color="white" />
        </TouchableOpacity>

        {solicitacaoPonto.length == 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: -90,
            }}
          >
            <Image
              style={{ width: 210, height: 200 }}
              source={require("../../../src/icons/solicitacoes.png")}
            />

            {load == true && (
              <ActivityIndicator
                style={{ marginTop: 30 }}
                size={"large"}
                color="#1CADE2"
              />
            )}
            {load == false && (
              <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 20 }}>
                Sem solicitações ate o momento
              </Text>
            )}
          </View>
        )}
        <View>
          {solicitacaoPonto.length !== 0 && (
            <View>
              <Text style={styles.txtTitulo}>
                Solicitação de edição de ponto
              </Text>
              <FlatList
                style={{ borderBottomWidth: 2, borderBottomColor: "#adadad" }}
                data={solicitacaoPonto}
                keyExtractor={(item) => item.id}
                renderItem={renderItemPonto}
              />
            </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalItemPonto}
          onRequestClose={() => {
            setModalItemPonto(!modalItemPonto);
          }}
        >
          <ConatinerModal>
            <ButtonBack
              onPress={() => {
                setModalItemPonto(false);
              }}
            >
              <Icone size={20} name="arrow-left" color="black" />
              {data && (
                <TxtButtonBack>
                  {data.substr(8, 9)}/{data.substr(5, 2)}/{data.substr(0, 4)}
                </TxtButtonBack>
              )}
            </ButtonBack>
            <ContainerTitulo>
              <Text style={{ fontWeight: "bold", marginLeft: 20 }}>
                FUNCIONÁRIO:{" "}
              </Text>
              <Text>{funcionario}</Text>
            </ContainerTitulo>

            <HeaderInfos>
              <TxtHeaderInfos>Edição de ponto</TxtHeaderInfos>
              <TxtHeaderInfos>Atual</TxtHeaderInfos>
              <TxtHeaderInfos>solicitação</TxtHeaderInfos>
            </HeaderInfos>

            {entrada1 && entrada11 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Entrada 1 ${" "}`} </TxtInfos>
                  <TxtInfos>{entrada11.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada1.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada1 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada1}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida1 && saida11 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 1 ${"     "}`} </TxtInfos>
                  <TxtInfos>{saida11.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida1.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa1 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa1}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada2 && entrada22 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Entrada 2 ${" "}`} </TxtInfos>
                  <TxtInfos>{entrada22.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada2.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada2 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada2}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida2 && saida22 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 2 ${"     "}`}</TxtInfos>
                  <TxtInfos>{saida22.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida2.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa2 && (
                  <ContainerObs>
                    <TxtInfos>{obsSaisa2}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada3 && entrada33 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Entrada 3 ${""}`} </TxtInfos>
                  <TxtInfos>{entrada33.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada3.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada3 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada3}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida3 && saida33 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 3 ${"    "}`}</TxtInfos>
                  <TxtInfos>{saida33.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida3.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa3 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa3}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada4 && entrada44 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Entrada 4 ${""}`}</TxtInfos>
                  <TxtInfos>{entrada44.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada4.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada4 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada4}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida4 && saida44 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 4 ${"    "}`}</TxtInfos>
                  <TxtInfos>{saida44.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida4.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa4 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa4}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada5 && entrada55 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 5</TxtInfos>
                  <TxtInfos>{entrada55.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada5.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada5 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada5}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida5 && saida55 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 5 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida55.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida5.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa5 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa5}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada6 && entrada66 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 6</TxtInfos>
                  <TxtInfos>{entrada66.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada6.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada6 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada6}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida6 && saida66 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 6 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida66.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida6.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa6 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa6}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada7 && entrada77 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 7</TxtInfos>
                  <TxtInfos>{entrada77.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada7.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada7 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada7}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida7 && saida77 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 7 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida77.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida7.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa7 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa7}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada8 && entrada88 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 8</TxtInfos>
                  <TxtInfos>{entrada88.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada8.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada8 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada8}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida8 && saida88 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 8 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida88.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida8.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa8 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa8}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada9 && entrada99 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 9</TxtInfos>
                  <TxtInfos>{entrada99.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada9.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada9 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada9}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida9 && saida99 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 9 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida99.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida9.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa9 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa9}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {entrada10 && entrada100 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>Entrada 10</TxtInfos>
                  <TxtInfos>{entrada100.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{entrada10.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsentrada10 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsentrada10}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            {saida10 && saida100 && (
              <View>
                <ContainerInfo>
                  <TxtInfos>{`Saida 10 ${"  "}`}</TxtInfos>
                  <TxtInfos>{saida100.substr(0, 5)}</TxtInfos>
                  <TxtInfos>{saida10.substr(0, 5)}</TxtInfos>
                </ContainerInfo>
                {obsSaisa10 && (
                  <ContainerObs>
                    <TxtInfoss>Observação:</TxtInfoss>
                    <TxtInfos>{obsSaisa10}</TxtInfos>
                  </ContainerObs>
                )}
              </View>
            )}

            <View
              style={{
                backgroundColor: "#0393c7",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              {bottonLoad == false && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={aceitarPonto}>
                    <Image
                      style={{
                        width: 100,
                        height: 20,
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                      source={require("../../../src/icons/aceite.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={negarPonto}>
                    <Image
                      style={{
                        width: 100,
                        height: 22,
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 70,
                      }}
                      source={require("../../../src/icons/negar.png")}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {bottonLoad == true && (
                <ActivityIndicator
                  style={{ padding: 15 }}
                  size={"large"}
                  color="white"
                />
              )}
            </View>
          </ConatinerModal>
        </Modal>
      </AlertNotificationRoot>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//Modal -------

const ConatinerModal = styled.ScrollView`
  flex: 1;
`;

const ButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  border-bottom-width: 2px;
  border-bottom: #dadada;
  margin-bottom: 10px;
  width: 100%;
`;

const TxtButtonBack = styled.Text`
  margin-left: 30px;
  font-style: normal;
  font-weight: bold;
  color: black;
  font-size: 15px;
`;

const ContainerTitulo = styled.View`
  flex-direction: row;
  margin-top: 15px;
  border-bottom-width: 2px;
  border-bottom-color: #dadada;
  padding-right: 70px;
  padding-bottom: 10px;
`;

const HeaderInfos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
`;

const TxtHeaderInfos = styled.Text`
  font-weight: bold;
`;

const ContainerInfo = styled.View`
  border-width: 1px;
  border-color: #d6d6d6;
  justify-content: space-between;
  flex-direction: row;
`;

const ContainerObs = styled.View`
  border-width: 1px;
  border-color: #d6d6d6;
  flex-direction: row;
  margin-bottom: 20px;
`;

const TxtInfos = styled.Text`
  padding: 10px;
  color: "black";
`;

const TxtInfoss = styled.Text`
  font-weight: bold;
  padding: 10px;
  color: "black";
`;

const styles = StyleSheet.create({
  headertxt: {
    color: "white",
    padding: 7,
    fontSize: 20,
    fontWeight: "bold",
  },
  //fletList Ferias
  txtTitulo: {
    marginTop: 20,
    marginLeft: 20,
    color: "#1CADE2",
    fontWeight: "bold",
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: "#dadada",
  },
  txtInfo: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#555555",
  },
  txtInfo2: {
    color: "#1CADE2",
  },

  txtPonts: {
    marginHorizontal: 10,
  },
});
