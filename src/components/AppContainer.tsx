import React from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';

import restyleTheme from 'restyleTheme';

type AppContainerProps = {children: React.ReactNode};

const AppContainer = ({children}: AppContainerProps) => (
  <NavigationContainer>
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider theme={restyleTheme}>{children}</ThemeProvider>
    </GestureHandlerRootView>
  </NavigationContainer>
);

export default AppContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
});
