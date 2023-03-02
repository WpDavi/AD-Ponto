import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`;

export const Title = styled.Text`
  width: 90%;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.color};
`;

export const List = styled.FlatList`
  width: 90%;
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #dadada;
`;
