import { Container, TextButton } from './styles';

export const UnfilledButton = ({ text, onPress }) => {
  return (
    <Container
      activeOpacity={0.9}
      onPress={onPress}
    >
      <TextButton>{text}</TextButton>
    </Container>
  );
};
