import React from "react";
import { useWindowDimensions } from "react-native";

import { DynamicImage, DynamicView } from "src/components";
import { logo } from "assets";

const Header = () => {
  const { width } = useWindowDimensions();
  return (
    <DynamicView
      width='100%'
      alignItems='center'
      backgroundColor='#D9D9D9'
      paddingVertical='s'>
      <DynamicImage
        source={logo}
        width={width * 0.4}
        height={33}
        resizeMode='contain'
      />
    </DynamicView>
  );
};

export default Header;
