import { Picker } from '@react-native-picker/picker';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`;

export const Selector = styled.View`
  height: 80px;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const SelectorView = styled(Picker)`
  font-weight: 900;
  width: 100%;
  color: #ffffff;
  background-color: #1cade2;
`;
