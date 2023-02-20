import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

import { useNotification } from '~/components/Pushnotificacao';
import { ThemeProvider } from '~/context/ThemeContext';
import { Routes } from '~/routes';

const App = () => {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotification();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationReceivedListener(
      handleNotificationResponse,
    );

    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default App;
