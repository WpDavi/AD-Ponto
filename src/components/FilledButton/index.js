import { Loader } from '~/components/Loader/index';

import { Container, TextButton } from './styles';

export const FilledButton = ({
  loading = false,
  disabled = false,
  onPress,
  text,
}) => {
  return (
    <Container
      activeOpacity={0.9}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <Loader />
      ) : (
        <TextButton disabled={disabled}>{text}</TextButton>
      )}
    </Container>
  );
};
