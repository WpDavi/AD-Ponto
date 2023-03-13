import { Platform } from 'react-native';

import { Input } from '~/components/Input';
import { ShowCity } from '~/components/ShowCity';
import { ShowTime } from '~/components/ShowTime';

import { Container, Inputs, InputsItem } from './styles';

export const HeaderRegisterPoint = ({
  time,
  city,
  company,
  setCompany,
  Loginkey,
  setLoginkey,
}) => {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ShowTime time={time} />
      <ShowCity city={city} />
      <Inputs>
        <InputsItem>
          <Input
            text={company}
            setText={setCompany}
            label="Empresa"
          />
        </InputsItem>
        <InputsItem>
          <Input
            text={Loginkey}
            setText={setLoginkey}
            label="Chave"
          />
        </InputsItem>
      </Inputs>
    </Container>
  );
};
