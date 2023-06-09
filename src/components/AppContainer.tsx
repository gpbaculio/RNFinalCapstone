import React from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import restyleTheme from 'restyleTheme';
import {store, persistor} from 'src/store';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type AppContainerProps = {children: React.ReactNode};

const AppContainer = ({children}: AppContainerProps) => (
  <Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView style={styles.container}>
            <ThemeProvider theme={restyleTheme}>
              <PersistGate loading={null} persistor={persistor}>
                {children}
              </PersistGate>
            </ThemeProvider>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
);

export default AppContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
});
