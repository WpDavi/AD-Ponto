import styled from 'styled-components/native';

export const Container = styled.View`
  height: 144px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
`;

export const Content = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Message = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: 600;
  width: 90%;
`;

export const UserName = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  width: 36px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #74c5e2;
  border-radius: 4px;
`;

export const IconView = styled.View`
  width: 90%;
  height: 90%;
  align-items: center;
  justify-content: center;
`;

export const ContainerFloat = styled.View`
  width: 100%;
  height: 88px;
  margin-top: -36px;
  align-items: center;
  justify-content: center;
`;

export const ContentFloat = styled.View`
  height: 100%;
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  border: 1px solid #ededed;
`;

export const ItemFloat = styled.View``;

export const TitleFloat = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #acacac;
`;

export const DescriptionFloat = styled.Text`
  color: #0393c7;
`;
