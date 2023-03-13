import Icon from '@expo/vector-icons/FontAwesome5';

import { Loader } from '~/components/Loader';

import { Container, TextButton } from './styles';

export const MapButton = ({
  loading = false,
  disabled = false,
  onPress,
  text,
  icon,
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
        <>
          <TextButton disabled={disabled}>{text}</TextButton>
          <Icon
            size={16}
            name={icon}
            color={disabled ? '#dddddd' : '#ffffff'}
          />
        </>
      )}
    </Container>
  );
};
