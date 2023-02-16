import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import styled from 'styled-components';

export default function MeuQRCode() {
  const [email, setEmail] = useState();
  useEffect(() => {
    getEmail();
  }, []);
  async function getEmail() {
    const emaill = await AsyncStorage.getItem('email');
    setEmail(emaill);
  }

  return (
    <Container>
      <Titulo>Bater ponto com QR CODE</Titulo>
      {email && <QRCode value={email} size={250} />}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const Titulo = styled.Text`
  color: ${(props) => props.theme.color};
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 30px;
`;
