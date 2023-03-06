import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

export const Form = styled.KeyboardAvoidingView`
  height: 60%;
  width: 90%;
  flex-direction: column;
  align-items: center;
`;

export const ImageSuporte = styled.Image`
  width: 200px;
  height: 194px;
  margin-bottom: 16px;
`;

export const Question = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  width: 100%;
  text-align: center;
`;
