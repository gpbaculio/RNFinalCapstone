import React from 'react';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from 'src/components';
import {useRootNavigation} from 'src/navigation/hooks';

import {useAuthentication} from 'src/store';

const HeaderLogo = () => {
  const {state} = useAuthentication();
  const navigation = useRootNavigation();

  return (
    <DynamicPressable
      onPress={() => {
        navigation.navigate('Profile');
      }}
      position="absolute"
      right={0}
      mr="m">
      {state.user?.image ? (
        <DynamicImage
          source={{uri: state.user?.image}}
          width={44}
          height={44}
          borderRadius={44}
          resizeMode="contain"
        />
      ) : (
        <DynamicView
          backgroundColor="#57B87D"
          width={44}
          height={44}
          borderRadius={28}
          variant="center">
          <DynamicView width={19} variant="center">
            <DynamicText color="#FFFFFF" fontWeight="600">
              {`${state.user?.firstName?.charAt(0).toUpperCase()} ${
                state.user?.lastName?.charAt(0).toUpperCase() || ''
              }`.trim()}
            </DynamicText>
          </DynamicView>
        </DynamicView>
      )}
    </DynamicPressable>
  );
};

export default HeaderLogo;
