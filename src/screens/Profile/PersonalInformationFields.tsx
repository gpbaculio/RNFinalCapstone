import React from 'react';
import {StyleSheet} from 'react-native';

import {Control, Controller, FieldErrors} from 'react-hook-form';
import {MaskedTextInput} from 'react-native-mask-text';

import {DynamicText, DynamicTextInput, DynamicView} from 'src/components';
import {ProfileFormData} from './Profile';

import {handleFormColor} from '../Onboarding/Onboarding';

type PersonalInformationFieldsProps = {
  control: Control<ProfileFormData, any>;
  errors: FieldErrors<ProfileFormData>;
};

const PersonalInformationFields = ({
  control,
  errors,
}: PersonalInformationFieldsProps) => (
  <DynamicView>
    <DynamicView variant="center">
      <DynamicText variant="profileInputLabel">First Name</DynamicText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DynamicTextInput
            color={handleFormColor(!!errors.firstName)}
            borderColor={handleFormColor(!!errors.firstName)}
            variant="profileInput"
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {!!errors.firstName ? (
        <DynamicText variant="error">{errors.firstName.message}</DynamicText>
      ) : null}
    </DynamicView>
    <DynamicView variant="center">
      <DynamicText variant="profileInputLabel">Last Name</DynamicText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DynamicTextInput
            color={handleFormColor(!!errors.lastName)}
            borderColor={handleFormColor(!!errors.lastName)}
            variant="profileInput"
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {!!errors.lastName ? (
        <DynamicText variant="error">{errors.lastName.message}</DynamicText>
      ) : null}
    </DynamicView>
    <DynamicView variant="center">
      <DynamicText variant="profileInputLabel">Email</DynamicText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <DynamicTextInput
            color={handleFormColor(!!errors.email)}
            borderColor={handleFormColor(!!errors.email)}
            variant="profileInput"
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {!!errors.email ? (
        <DynamicText variant="error">{errors.email.message}</DynamicText>
      ) : null}
    </DynamicView>
    <DynamicView variant="center">
      <DynamicText variant="profileInputLabel">Phone number</DynamicText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <MaskedTextInput
            mask="+1 (999) 999-9999"
            style={{
              ...styles.phoneInput,
              color: handleFormColor(!!errors.phoneNumber),
              borderColor: handleFormColor(!!errors.phoneNumber),
            }}
            placeholder="Phone number"
            onBlur={onBlur}
            onChangeText={(_, rawText) => onChange(rawText)}
            value={value}
            keyboardType="number-pad"
          />
        )}
        name="phoneNumber"
      />
      {!!errors.phoneNumber ? (
        <DynamicText variant="error">{errors.phoneNumber.message}</DynamicText>
      ) : null}
    </DynamicView>
  </DynamicView>
);

export default PersonalInformationFields;

const styles = StyleSheet.create({
  phoneInput: {
    borderWidth: 1,
    paddingVertical: 4,
    width: '100%',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
