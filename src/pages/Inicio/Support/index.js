import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { DialogSuccess } from '~/components/DialogSuccess';
import { FilledButton } from '~/components/FilledButton';
import { InputMessage } from '~/components/InputMessage';
import Api from '~/services/Api';

import { Container, Form, ImageSuporte, Question } from './styles';

export const Support = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem('name');
      name && setName(name);
    };
    getName();
    const getInfo = async () => {
      const info = await Api.getInformacoesPessoais();
      setUsername(info.funcionario);
      setEmail(info.email);
      setEmployeeId(info.id);
    };
    getInfo();
  }, []);

  const handleSend = async () => {
    setLoading(true);
    const res = await Api.suporte(email, username, message, employeeId);
    if (res) {
      DialogSuccess('Mensagem para o suporte enviado');
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Form behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ImageSuporte
          resizeMode="stretch"
          source={require('~/icons/suporte.png')}
        />

        <Question>{name || 'Usuário'}, no que podemos lhe ajudar?</Question>

        <InputMessage
          text={message}
          setText={setMessage}
        />

        <FilledButton
          onPress={handleSend}
          loading={loading}
          disabled={message.length <= 3}
          text={'ENVIAR'}
        />
      </Form>
    </Container>
  );
};
