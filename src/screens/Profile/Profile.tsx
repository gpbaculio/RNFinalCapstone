import React, {useState} from 'react';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {MaskedTextInput} from 'react-native-mask-text';
import 'yup-phone';
import * as ImagePicker from 'expo-image-picker';
import {Modal, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
  KeyboardScroll,
} from 'src/components';

import {handleFormColor} from '../Onboarding/Onboarding';
import {useAuthentication} from 'src/store';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsLetter: boolean;
  image: string | null;
};

const Profile = () => {
  const {state, actions} = useAuthentication();

  // phone: 14844731597
  const defaultValues: ProfileFormData = {
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    phoneNumber: state.user?.phoneNumber || '',
    emailStatuses: !!state.user?.emailStatuses,
    passwordChanges: !!state.user?.passwordChanges,
    specialOffers: !!state.user?.specialOffers,
    newsLetter: !!state.user?.newsLetter,
    image: state.user?.image || '',
  };

  const formKeys = Object.keys(defaultValues);

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
    trigger,
    setValue,
    reset,
  } = useForm<ProfileFormData>({
    resolver,
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('image', result.assets[0].uri, {shouldDirty: true});
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const onConfirm = (data: ProfileFormData) => {
    actions.setUser({...data});
    reset(data);
    setHasConfirmed(true);
  };

  const onSubmit = async () => {
    const result = await trigger(formKeys as Array<keyof ProfileFormData>);

    if (result) {
      setShowConfirmModal(true);
    }
  };

  return (
    <KeyboardScroll>
      <Modal visible={showConfirmModal} transparent>
        <DynamicView flex={1} variant="center" bg="overlay">
          <DynamicView
            elevation={3}
            backgroundColor="#FFFFFF"
            borderRadius={8}
            variant="center"
            p="l">
            <DynamicText fontSize={21} fontWeight="900" color="#495E57">
              {!hasConfirmed ? 'Confirm' : 'Success'}
            </DynamicText>
            <DynamicText fontWeight="500" mt="m">
              {!hasConfirmed
                ? 'Please Confirm to Save Changes'
                : 'Changes Successfully Saved'}
            </DynamicText>
            {!hasConfirmed ? (
              <DynamicView flexDirection="row" alignItems="center">
                <DynamicPressable
                  onPress={handleSubmit(onConfirm)}
                  mr="l"
                  bg="#495E57"
                  p="s"
                  mt="m"
                  borderRadius={8}>
                  <DynamicText color="#FFFFFF" fontWeight="500">
                    Confirm
                  </DynamicText>
                </DynamicPressable>
                <DynamicPressable
                  onPress={() => {
                    setShowConfirmModal(false);
                  }}
                  backgroundColor="#D9D9D9"
                  p="s"
                  mt="m"
                  borderRadius={8}>
                  <DynamicText color="#495E57" fontWeight="500">
                    Go back
                  </DynamicText>
                </DynamicPressable>
              </DynamicView>
            ) : (
              <DynamicPressable
                onPress={() => {
                  setShowConfirmModal(false);
                }}
                backgroundColor="#495E57"
                p="s"
                mt="m"
                borderRadius={8}>
                <DynamicText color="#D9D9D9" fontWeight="500">
                  Close
                </DynamicText>
              </DynamicPressable>
            )}
          </DynamicView>
        </DynamicView>
      </Modal>
      <DynamicView flex={1} padding="m">
        <DynamicText fontSize={18} fontWeight="bold">
          Personal Information
        </DynamicText>
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
                  <DynamicImage
                    source={{uri: value}}
                    variant="profileImgSection"
                  />
                ) : (
                  <DynamicView variant="profileImgSection" bg="#57B87D" />
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
                onPress={() => setValue('image', null, {shouldDirty: true})}
                borderRadius={8}
                borderColor="#495E57"
                borderWidth={1}>
                <DynamicText color="#495E57">Remove</DynamicText>
              </DynamicPressable>
            </DynamicView>
          )}
          name="image"
        />
        <DynamicView>
          <DynamicView variant="center">
            <DynamicText variant="profileInputLabel">First Name</DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
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
              <DynamicText variant="error">
                {errors.firstName.message}
              </DynamicText>
            ) : null}
          </DynamicView>
          <DynamicView variant="center">
            <DynamicText variant="profileInputLabel">Last Name</DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
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
              <DynamicText variant="error">
                {errors.lastName.message}
              </DynamicText>
            ) : null}
          </DynamicView>
          <DynamicView variant="center">
            <DynamicText variant="profileInputLabel">Email</DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
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
              rules={{required: true}}
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
              <DynamicText variant="error">
                {errors.phoneNumber.message}
              </DynamicText>
            ) : null}
          </DynamicView>
        </DynamicView>
        <DynamicText mt="m" fontSize={18} fontWeight="bold">
          Email Notifications
        </DynamicText>
        <DynamicView>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <DynamicPressable
                marginVertical="xxxs"
                flexDirection="row"
                alignItems="center"
                onPress={() => onChange(!value)}>
                <Ionicons
                  name={value ? 'ios-checkbox' : 'square-outline'}
                  size={23}
                  color="#495E57"
                />
                <DynamicText ml="xs">Email Statuses</DynamicText>
              </DynamicPressable>
            )}
            name="emailStatuses"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <DynamicPressable
                marginVertical="xxxs"
                flexDirection="row"
                alignItems="center"
                onPress={() => onChange(!value)}>
                <Ionicons
                  name={value ? 'ios-checkbox' : 'square-outline'}
                  size={23}
                  color="#495E57"
                />
                <DynamicText ml="xs">Password Changes</DynamicText>
              </DynamicPressable>
            )}
            name="passwordChanges"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <DynamicPressable
                marginVertical="xxxs"
                flexDirection="row"
                alignItems="center"
                onPress={() => onChange(!value)}>
                <Ionicons
                  name={value ? 'ios-checkbox' : 'square-outline'}
                  size={23}
                  color="#495E57"
                />
                <DynamicText ml="xs">Special Offers</DynamicText>
              </DynamicPressable>
            )}
            name="specialOffers"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <DynamicPressable
                marginVertical="xxxs"
                flexDirection="row"
                alignItems="center"
                onPress={() => onChange(!value)}>
                <Ionicons
                  name={value ? 'ios-checkbox' : 'square-outline'}
                  size={23}
                  color="#495E57"
                />
                <DynamicText ml="xs">Newsletter</DynamicText>
              </DynamicPressable>
            )}
            name="newsLetter"
          />
        </DynamicView>
        <DynamicPressable
          marginVertical="s"
          backgroundColor="#F4CE14"
          variant="button">
          <DynamicText fontWeight="bold">Log out</DynamicText>
        </DynamicPressable>
      </DynamicView>
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
    </KeyboardScroll>
  );
};

export default Profile;

const styles = StyleSheet.create({
  phoneInput: {
    borderWidth: 1,
    paddingVertical: 4,
    width: '100%',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

const resolver = yupResolver(
  Yup.object({
    firstName: Yup.string()
      .min(2, 'Please enter a valid First Name')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Please enter a valid Last Name')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .required('Please enter a Valid US Phone number')
      .phone('US', true, 'Please enter a Valid US Phone number'),
    image: Yup.string().nullable(),
    emailStatuses: Yup.boolean(),
    passwordChanges: Yup.boolean(),
    specialOffers: Yup.boolean(),
    newsLetter: Yup.boolean(),
  }),
);
