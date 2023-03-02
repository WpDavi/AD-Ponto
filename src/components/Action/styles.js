import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 100%;
  width: 80px;
  align-items: center;
  justify-content: space-around;
  margin-right: 12px;
`;

export const Content = styled.View`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.draw};
  border-radius: 28px;
`;

export const Text = styled.Text`
  height: 40px;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.color};
`;
