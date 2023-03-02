import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
`;

export const Inputs = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 30%;
  width: 90%;
`;

export const InputsItem = styled.View`
  justify-content: flex-end;
  height: 100%;
  width: 48%;
`;
