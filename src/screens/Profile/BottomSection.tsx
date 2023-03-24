import React from 'react';
import {UseFormReset} from 'react-hook-form';

import {DynamicPressable, DynamicText, DynamicView} from 'src/components';
import {ProfileFormData} from './Profile';

type BottomSectionProps = {
  defaultValues: ProfileFormData;
  reset: UseFormReset<ProfileFormData>;
  onSubmit: () => Promise<void>;
  isDirty: boolean;
};

const BottomSection = ({
  defaultValues,
  reset,
  onSubmit,
  isDirty,
}: BottomSectionProps) => (
  <DynamicView
    mb="xxL"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-around">
    <DynamicPressable
      variant="button"
      opacity={isDirty ? 1 : 0.5}
      disabled={!isDirty}
      onPress={() => reset(defaultValues)}
      borderWidth={1}
      borderColor="#495E57">
      <DynamicText fontWeight="bold" color="#AFAFAF">
        Discard Changes
      </DynamicText>
    </DynamicPressable>
    <DynamicPressable
      onPress={onSubmit}
      opacity={isDirty ? 1 : 0.5}
      disabled={!isDirty}
      variant="button"
      backgroundColor="#495E57">
      <DynamicText fontWeight="bold" color="#FFFFFF">
        Save Changes
      </DynamicText>
    </DynamicPressable>
  </DynamicView>
);

export default BottomSection;
