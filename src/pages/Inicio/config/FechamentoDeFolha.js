import React from 'react';
import { View } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components';

export default function FechamentoDeFolha() {
  const navigation = useNavigation();
  return (
    <Container>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Gerencia de Pontos</TxtTituloHeader>
        </ContainerHeaderTitulo>
        <View style={{ position: 'absolute', marginTop: 20 }}>
          <ContainerButtonBack onPress={() => navigation.goBack()}>
            <Icone
              size={17}
              name="arrow-left"
              color="white"
            />
          </ContainerButtonBack>
        </View>
      </AlertNotificationRoot>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//header ----------------------

const ContainerSelectFuncion = styled.View`
  border-width: 2px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  width: 90%;
  margin-left: 6%;
  margin-bottom: 18px;
`;

const ContainerHeaderTitulo = styled.View`
  background-color: #1cade2;
  align-items: center;
`;
const TxtTituloHeader = styled.Text`
  color: white;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
`;

const ContainerButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  padding-left: 20px;
`;

//Body -------------

const ContainerBody = styled.View`
  align-items: center;
  position: absolute;
  width: 100%;
  padding-bottom: 50%;
`;
