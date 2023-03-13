import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #00bbff;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

export const TextButton = styled.Text`
  width: 100%;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? '#dddddd' : '#ffffff')};
`;
