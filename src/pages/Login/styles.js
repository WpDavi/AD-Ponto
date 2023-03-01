import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

export const Content = styled.ScrollView`
  width: 90%;
`;

export const Form = styled.KeyboardAvoidingView`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleForm = styled.Text`
  margin-top: 40px;
  margin-bottom: 4px;
  font-size: 22px;
  width: 100%;
  text-align: center;
  color: #1cade2;
  font-weight: bold;
`;
