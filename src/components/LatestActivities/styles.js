import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
`;

export const DateAndTime = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #0393c7;
  font-weight: bold;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemCol = styled.View`
  justify-content: space-between;
  margin-left: 8px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.color};
`;

export const Description = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #adadad;
`;
