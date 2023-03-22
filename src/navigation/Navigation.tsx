import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Onboarding, Profile} from 'src/screens';
import OnboardingHeader from 'src/screens/Onboarding/Header';
import ProfileHeader from 'src/screens/Profile/Header';
import {useAuthentication} from 'src/store';

export type NativeStackNavigatorParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
};

const NativeStack = createNativeStackNavigator<NativeStackNavigatorParamList>();

const Navigation = () => {
  const {state} = useAuthentication();
  console.log('state.user ', JSON.stringify(state.user));
  return (
    <NativeStack.Navigator
      initialRouteName={state.user ? 'Home' : 'Onboarding'}>
      {state.user ? (
        <>
          <NativeStack.Screen name="Home" component={Home} />
          <NativeStack.Screen
            name="Profile"
            component={Profile}
            options={{header: () => <ProfileHeader />}}
          />
        </>
      ) : (
        <NativeStack.Screen
          options={{header: () => <OnboardingHeader />}}
          name="Onboarding"
          component={Onboarding}
        />
      )}
    </NativeStack.Navigator>
  );
};

export default Navigation;
