import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Icon from '@expo/vector-icons/Entypo';

import Api from '~/services/Api';

import {
  Button,
  Container,
  ContainerFloat,
  Content,
  ContentFloat,
  DescriptionFloat,
  IconView,
  ItemFloat,
  Message,
  TitleFloat,
  UserName,
} from './styles';

export const HeaderHome = ({ name }) => {
  const navigation = useNavigation();
  const [infos, setInfos] = useState({ email: '' });

  useEffect(() => {
    const getMail = async () => {
      const email = await AsyncStorage.getItem('@email');
      setInfos({ email: email });
    };
    getMail();
    const handleGetInformacoesPessoais = async () => {
      const res = await Api.getInformacoesPessoais();
      await setInfos(res);
    };
    handleGetInformacoesPessoais();
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Message>
            Bem vindo, <UserName>{name}</UserName>
          </Message>
          <Button
            onPress={() => navigation.openDrawer()}
            activeOpacity={0.9}
          >
            <IconView>
              <Icon
                name="menu"
                size={32}
                color="#ffffff"
              />
            </IconView>
          </Button>
        </Content>
      </Container>
      <ContainerFloat>
        <ContentFloat>
          <ItemFloat>
            <TitleFloat>Email</TitleFloat>
            <DescriptionFloat>{infos.email}</DescriptionFloat>
          </ItemFloat>
          <ItemFloat>
            <TitleFloat>Data</TitleFloat>
            <DescriptionFloat>
              {new Date(Date.now()).toLocaleDateString('pt-BR')}
            </DescriptionFloat>
          </ItemFloat>
        </ContentFloat>
      </ContainerFloat>
    </>
  );
};
