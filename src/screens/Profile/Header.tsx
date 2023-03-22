import React from "react";
import { useWindowDimensions } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from "src/components";
import { logo } from "assets";

const Header = () => {
  const { width } = useWindowDimensions();
  return (
    <DynamicView
      padding='xs'
      alignItems='center'
      flexDirection='row'
      justifyContent='space-between'>
      <DynamicPressable
        backgroundColor='#495E57'
        padding='xxs'
        borderRadius={23}>
        <FontAwesome name='long-arrow-left' size={23} color='#FFFFFF' />
      </DynamicPressable>
      <DynamicImage
        source={logo}
        width={width * 0.4}
        height={60}
        resizeMode='contain'
      />
      <DynamicView backgroundColor='#57B87D' padding='s' borderRadius={23}>
        <DynamicText color='#FFFFFF' fontWeight='600'>
          GB
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );
};

export default Header;
