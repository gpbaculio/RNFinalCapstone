import React from 'react';
import {Control, Controller} from 'react-hook-form';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from 'src/components';
import {useAuthentication} from 'src/store';
import {ProfileFormData} from './Profile';

type AvatarFieldProps = {
  control: Control<ProfileFormData, any>;
  pickImage: () => Promise<void>;
  onRemovePress: () => void;
};

const AvatarField = ({control, pickImage, onRemovePress}: AvatarFieldProps) => {
  const {state} = useAuthentication();

  return (
    <Controller
      control={control}
      rules={{required: true}}
      render={({field: {value}}) => (
        <DynamicView mt="xxs" flexDirection="row" alignItems="center">
          <DynamicView mr="l">
            <DynamicText variant="profileLabel" color="#AFAFAF">
              Avatar
            </DynamicText>
            {value ? (
              <DynamicImage source={{uri: value}} variant="profileImgSection" />
            ) : (
              <DynamicView
                variant="profileImgSection"
                bg="#57B87D"
                alignItems="center">
                <DynamicText
                  marginTop="auto"
                  marginBottom="auto"
                  color="#FFFFFF"
                  fontWeight="600">
                  {`${state?.user?.firstName?.charAt(0).toUpperCase()} ${
                    state?.user?.lastName?.charAt(0).toUpperCase() || ''
                  }`.trim()}
                </DynamicText>
              </DynamicView>
            )}
          </DynamicView>
          <DynamicPressable
            onPress={pickImage}
            mt="xL"
            padding="xxs"
            borderRadius={8}
            mr="l"
            bg="#495E57">
            <DynamicText color="#FFFFFF">Change</DynamicText>
          </DynamicPressable>
          <DynamicPressable
            disabled={!value}
            opacity={!value ? 0.5 : 1}
            mt="xL"
            padding="xxs"
            onPress={onRemovePress}
            borderRadius={8}
            borderColor="#495E57"
            borderWidth={1}>
            <DynamicText color="#495E57">Remove</DynamicText>
          </DynamicPressable>
        </DynamicView>
      )}
      name="image"
    />
  );
};

export default AvatarField;
