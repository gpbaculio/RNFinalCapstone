import React from "react";
import { StatusBar } from "react-native";

import { AppContainer } from "src/components";
import { Navigation } from "src/navigation";

const App = () => (
  <AppContainer>
    <StatusBar barStyle='light-content' />
    <Navigation />
  </AppContainer>
);

export default App;
