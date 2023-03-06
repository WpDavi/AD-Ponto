import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const DialogSuccess = (message) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Sucesso',
    textBody: message,
    button: 'ok',
  });
  setTimeout(() => Dialog.hide(), 1000);
};
