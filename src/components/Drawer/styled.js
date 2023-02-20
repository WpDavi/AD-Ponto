import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: red;
  background-color: ${(props) => props.theme.draw};
`;
