import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.background};
`;
export const Nome = styled.Text`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.color};
  font-size: 20px;
  line-height: 32px;
  margin-top: 56px;
  margin-bottom: 14px;
`;
export const InformaçõesPessoais = styled.Text`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.color};
  font-size: 20px;
  line-height: 32px;
`;
