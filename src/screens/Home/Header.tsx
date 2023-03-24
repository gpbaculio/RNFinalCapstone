import React from 'react';
import {useWindowDimensions} from 'react-native';

import {DynamicImage, DynamicView} from 'src/components';
import {logo} from 'assets';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  const {width} = useWindowDimensions();

  return (
    <DynamicView padding="xs" variant="center">
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
