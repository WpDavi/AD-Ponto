import { Container, Content, Text } from './styles';

export const Action = ({ onPress, Icon, text }) => {
  return (
    <Container
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Content>{Icon}</Content>
      <Text>{text}</Text>
    </Container>
  );
};
