import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 30%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: #00bbff;
`;

export const Logo = styled.Image`
  width: 120px;
  height: 80px;
`;

export const Triangle = styled.View`
  margin-top: 24px;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-left-width: 50px;
  border-right-width: 50px;
  border-bottom-width: 50px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${({ theme }) => theme.background};
`;
