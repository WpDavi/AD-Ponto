import styled from 'styled-components/native';

export const Container = styled.View`
  height: 90%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const RowTitle = styled.View`
  width: 90%;
  height: 40px;
  flex-direction: row;
`;

export const ColTitle = styled.View`
  width: 33.3%;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
  background-color: #1cade2;
`;

export const Title = styled.Text`
  font-size: 16px;
  line-height: 20px;
  font-weight: 900;
  color: #ffffff;
`;

export const Content = styled.FlatList`
  width: 90%;
`;

export const Row = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
`;

export const Col = styled.View`
  width: 33.3%;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
`;

export const Item = styled.Text`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #777777;
`;
