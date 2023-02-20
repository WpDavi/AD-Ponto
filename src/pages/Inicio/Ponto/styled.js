import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const ContainerHeader = styled.View`
  flex: 0.3;
  background-color: #1cade2;
  align-items: center;
  justify-content: center;
`;

export const TxtTitulo = styled.Text`
  font-weight: bold;
  margin-top: 25px;
  font-size: 25px;
  color: white;
`;

export const TxtName = styled.Text`
  font-size: 22px;
  color: white;
`;

export const TxtHora = styled.Text`
  font-size: 39px;
  font-weight: bold;
  color: white;
`;

export const TxtCidade = styled.Text`
  color: white;
  border-width: 2px;
  border-color: white;
  border-radius: 20px;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 25px;
`;

//BOTAO DE RETORNO
export const ContainerButtonBack = styled.View`
  position: absolute;
  margin-top: 20px;
  margin-left: 20px;
`;

export const ButtonBack = styled.TouchableOpacity`
  flex-direction: row;
`;
/////////////////////////////
//CORPO DA PAGINA

export const ContainerBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #1cade2;
  width: 300px;
  border-radius: 30px;
  margin-bottom: 20px;
  position: absolute;
  bottom: 20px;
`;

export const Txtbutton = styled.Text`
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 17px;
`;

export const ChangeCan = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 35px;
`;

export const ImgChangeCan = styled.Image`
  width: 50px;
  height: 50px;
`;

///MODAL DE PERMISSAO--

export const ContainerModalPermission = styled.View`
  background-color: white;
  width: 100%;
  position: absolute;
  bottom: 0px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const Header = styled.View`
  background-color: #1cade2;
  align-items: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const TxtHeader = styled.Text`
  padding: 10px;
  color: white;
  font-weight: bold;
`;

export const ContainerInfos = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const TxtInfos = styled.Text`
  width: 80%;
  text-align: center;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
`;

export const TxtButtonModal = styled.Text`
  padding: 20px;
  font-size: 16px;
  text-align: center;
`;
