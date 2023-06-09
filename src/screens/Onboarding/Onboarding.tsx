import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {
  DynamicView,
  DynamicText,
  DynamicTextInput,
  DynamicPressable,
  KeyboardScroll,
} from 'src/components';

import {useRootNavigation} from 'src/navigation/hooks';
import {useAuthentication} from 'src/store';

type OnboardingFormData = {firstName: string; email: string};

export const handleFormColor = (isError: boolean) =>
  isError ? 'red' : '#495E57';

const Onboarding = () => {
  const navigation = useRootNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<OnboardingFormData>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      firstName: 'sss',
      email: 'as@gmail.com',
    },
  });

  const hasErrors = !!Object.keys(errors).length;
  const {actions} = useAuthentication();
  const onSubmit = ({firstName, email}: OnboardingFormData) => {
    actions.setUser({firstName, email});
  };

  return (
    <KeyboardScroll>
      <DynamicView
        flex={1}
        alignItems="center"
        backgroundColor="#AFAFAF"
        justifyContent="space-between"
        paddingVertical="xL">
        <DynamicText
          mt="xxL"
          mb="l"
          color="#495E57"
          fontWeight="600"
          fontSize={21}>
          Let us get to know you
        </DynamicText>
        <DynamicView width="100%">
          <DynamicView
            variant="center"
            alignItems="center"
            paddingHorizontal="xL">
            <DynamicText variant="formLabel">First Name</DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  color={handleFormColor(!!errors.firstName)}
                  borderColor={handleFormColor(!!errors.firstName)}
                  variant="input"
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
            {!!errors.firstName ? (
              <DynamicText variant="error">
                {errors.firstName.message}
              </DynamicText>
            ) : null}
          </DynamicView>
          <DynamicView
            mt="l"
            variant="center"
            alignItems="center"
            width="100%"
            paddingHorizontal="xL">
            <DynamicText variant="formLabel">Email</DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  color={handleFormColor(!!errors.email)}
                  borderColor={handleFormColor(!!errors.email)}
                  variant="input"
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
        </DynamicView>
      </DynamicView>
      <DynamicView paddingVertical="xxL">
        <DynamicPressable
          disabled={hasErrors}
          opacity={hasErrors ? 0.5 : 1}
          onPress={handleSubmit(onSubmit)}
          ml="auto"
          width={150}
          variant="button"
          backgroundColor="#AFAFAF"
          mr="xL">
          <DynamicText color="#495E57" fontWeight="500">
            Next
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
    </KeyboardScroll>
  );
};

const resolver = yupResolver(
  Yup.object({
    firstName: Yup.string().required('First Name is required'),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required'),
  }),
);

export default Onboarding;
