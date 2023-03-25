import React from 'react';
import {useWindowDimensions} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {DynamicImage, DynamicPressable, DynamicView} from 'src/components';
import {logo} from 'assets';
import {useRootNavigation} from 'src/navigation/hooks';
import HeaderLogo from '../Home/HeaderLogo';

const Header = () => {
  const navigation = useRootNavigation();
  const {width} = useWindowDimensions();
  return (
    <DynamicView
      backgroundColor="#D9D9D9"
      padding="xs"
      alignItems="center"
      flexDirection="row"
      variant="center">
      <DynamicPressable
        position="absolute"
        left={0}
        ml="xs"
        backgroundColor="#495E57"
        padding="xxs"
        borderRadius={23}
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome name="long-arrow-left" size={23} color="#FFFFFF" />
      </DynamicPressable>
      <DynamicImage
        source={logo}
        width={width * 0.4}
        height={60}
        resizeMode="contain"
      />
      <HeaderLogo />
    </DynamicView>
  );
};

export default Header;
