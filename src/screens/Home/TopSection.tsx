import React from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  DynamicImage,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from 'src/components';

import {homeImg} from 'assets';

type TopSectionProps = {
  searchBarText: string;
  handleSearchChange: (text: string) => void;
};

const TopSection = ({searchBarText, handleSearchChange}: TopSectionProps) => (
  <DynamicView p="l" backgroundColor="#495E57">
    <DynamicText fontSize={36} color="#F4CE14" fontWeight="500">
      Little Lemon
    </DynamicText>
    <DynamicView mt="xxs" flexDirection="row">
      <DynamicView pt="xL" flex={1}>
        <DynamicView position="absolute">
          <DynamicText fontSize={24} color="#FFFFFF" fontWeight="500">
            Chicago
          </DynamicText>
        </DynamicView>
        <DynamicText mt="m" fontSize={16} color="#FFFFFF" fontWeight="500">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </DynamicText>
      </DynamicView>
      <DynamicImage ml="m" source={homeImg} width={140} height={150} />
    </DynamicView>
    <DynamicView
      mt="l"
      backgroundColor="#D9D9D9"
      pl="m"
      width="100%"
      flexDirection="row"
      height={36}
      alignItems="center"
      borderRadius={36}
      mr="auto">
      <FontAwesome name="search" size={18} color="#333333" />
      <DynamicTextInput
        color="#333333"
        ml="xs"
        flex={1}
        value={searchBarText}
        onChangeText={handleSearchChange}
      />
    </DynamicView>
  </DynamicView>
);

export default TopSection;
