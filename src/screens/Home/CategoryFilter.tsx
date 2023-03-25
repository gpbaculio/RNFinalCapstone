import React from 'react';

import {DynamicPressable, DynamicText} from 'src/components';

type CategoryFilterProps = {
  isSelected: boolean;
  onFilterPress: () => void;
  item: string;
};

const CategoryFilter = ({
  isSelected,
  onFilterPress,
  item,
}: CategoryFilterProps) => (
  <DynamicPressable
    variant="orderPill"
    backgroundColor={isSelected ? '#495E57' : '#D9D9D9'}
    onPress={onFilterPress}>
    <DynamicText variant="orderPill" color={isSelected ? '#FFFFFF' : '#495E57'}>
      {item}
    </DynamicText>
  </DynamicPressable>
);

export default CategoryFilter;
