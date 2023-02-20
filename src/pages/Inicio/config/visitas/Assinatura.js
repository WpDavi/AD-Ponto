import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components';

export default function ImgAssinatura() {
  const navigation = useNavigation();

  const [img, setImg] = useState();

  useEffect(() => {
    async function getImg() {
      const img = await AsyncStorage.getItem('@imgAssinatura');
      setImg(img);
    }
    getImg();
  }, []);
  console.log(img);

  return (
    <SafeAreaView>
      <Header>
        <HeaderTitulo>Assinatura</HeaderTitulo>
      </Header>
      <HeaderConteinerButoon>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Icone
            size={20}
            name="arrow-left"
            color="white"
          />
        </HeaderButton>
      </HeaderConteinerButoon>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: img }}
      />
    </SafeAreaView>
  );
}

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
