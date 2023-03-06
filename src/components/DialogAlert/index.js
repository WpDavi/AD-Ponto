import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const DialogAlert = (message) => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Alerta',
    textBody: message,
    button: 'ok',
  });
  setTimeout(() => Dialog.hide(), 1000);
};
