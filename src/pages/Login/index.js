import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { DialogAlert } from '~/components/DialogAlert';
import { FilledButton } from '~/components/FilledButton';
import { HeaderPublic } from '~/components/HeaderPublic';
import { InputLabel } from '~/components/InputLabel';
import { RecoverPassword } from '~/components/RecoverPassword';
import { UnfilledButton } from '~/components/UnfilledButton';
import Api from '~/services/Api';

import { Container, Content, Form, TitleForm } from './styles';

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [key, setKey] = useState('');
  const [loadingEntrar, setLoadingEntrar] = useState(false);
  const [loginByKey, setLoginByKey] = useState(false);

  useEffect(()=>{
    async function getDados(){
      const empresa = await AsyncStorage.getItem('@LoginEmpresa')
      console.log(empresa)
      const email = await AsyncStorage.getItem('@LoginEmail')
      setCompany(empresa)
      if(email){
        setEmail(email)
      }
    }
    getDados()
  },[])

  const handleSignIn = async () => {
    await AsyncStorage.setItem('@LoginEmpresa', company)
    await AsyncStorage.setItem('@LoginEmail', email)
    setLoadingEntrar(true);

    const json = loginByKey
      ? await Api.signInChave(key, company)
      : await Api.signIn(email, password, company);

    console.log(json);
    !json.token &&
      DialogAlert(
        loginByKey
          ? 'Chave e/ou Empresa inválidos!'
          : 'E-mail e/ou Senha e/ou Empresa inválidos!',
      );
    console.log('-------------------------', json);
    await AsyncStorage.setItem('token', json.token);
    await AsyncStorage.setItem('name', json.name);
    await AsyncStorage.setItem('email', json.email);
    await Api.registerForPushNotification(json.token);
    navigation.reset({
      routes: [{ name: 'Home' }],
    });
    setLoadingEntrar(false);
  };

  return (
    <Container>
      <HeaderPublic />
      <Content>
        <Form behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TitleForm>ENTRAR NO SISTEMA</TitleForm>
          <InputLabel
            text={company}
            setText={setCompany}
            label={'Empresa'}
          />
          {!loginByKey ? (
            <>
              <InputLabel
                text={email}
                setText={setEmail}
                label={'Email'}
              />
              <InputLabel
                text={password}
                setText={setPassword}
                label={'Senha'}
              />
              <FilledButton
                text={'ENTRAR'}
                onPress={handleSignIn}
                loading={loadingEntrar}                
                disabled={
                  email.length < 3 || password.length < 3 || company.length < 3
                }
              />
            </>
          ) : (
            <>
              <InputLabel
                text={key}
                setText={setKey}
                label={'Chave'}
              />
              <FilledButton
                text={'ENTRAR'}
                onPress={handleSignIn}
                loading={loadingEntrar}
                disabled={key.length < 3 || company.length < 3}
              />
            </>
          )}
          {!loginByKey && (
            <RecoverPassword
              onPress={() => {
                console.log('redefinir senha');
              }}
              text={'Esqueceu sua senha?'}
            />
          )}
        </Form>
        <UnfilledButton
          text={'PRECISA DE SUPORTE?'}
          onPress={() => navigation.navigate('Support')}
        />
        <FilledButton
          text={'BATER PONTO POR CHAVE'}
          onPress={() => navigation.navigate('RegisterPointDisconnected')}
        />
        <FilledButton
          text={loginByKey ? 'LOGIN POR SENHA' : 'LOGIN POR CHAVE'}
          onPress={() => setLoginByKey(!loginByKey)}
        />
      </Content>
    </Container>
  );
};
