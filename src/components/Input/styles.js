import styled from 'styled-components/native';

export const Container = styled.TextInput`
  margin-top: 8px;
  padding: 4px 8px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  background-color: #ffffff;
  color: #1cade2;
  border: 2px solid ${({ color }) => color};
  border-radius: 4px;
`;
