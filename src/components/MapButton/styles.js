import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 300px;
  height: 48px;
  border-radius: 40px;
  background-color: #00bbff;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

export const TextButton = styled.Text`
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? '#dddddd' : '#ffffff')};
`;
