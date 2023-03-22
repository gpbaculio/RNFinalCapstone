import React from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import restyleTheme from 'restyleTheme';
import {store, persistor} from 'src/store';

type AppContainerProps = {children: React.ReactNode};

const AppContainer = ({children}: AppContainerProps) => (
  <NavigationContainer>
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider theme={restyleTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  </NavigationContainer>
);

export default AppContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
});
