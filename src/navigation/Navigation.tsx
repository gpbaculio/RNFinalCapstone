import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, Onboarding, Profile } from "src/screens";
import OnboardingHeader from "src/screens/Onboarding/Header";
import ProfileHeader from "src/screens/Profile/Header";

export type NativeStackNavigatorParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
};

const NativeStack = createNativeStackNavigator<NativeStackNavigatorParamList>();

const Navigation = () => (
  <NativeStack.Navigator initialRouteName='Onboarding'>
    <NativeStack.Screen
      options={{ header: () => <OnboardingHeader /> }}
      name='Onboarding'
      component={Onboarding}
    />
    <NativeStack.Screen name='Home' component={Home} />
    <NativeStack.Screen
      name='Profile'
      component={Profile}
      options={{ header: () => <ProfileHeader /> }}
    />
  </NativeStack.Navigator>
);

export default Navigation;
