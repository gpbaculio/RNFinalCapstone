import React, {useState} from 'react';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {MaskedTextInput} from 'react-native-mask-text';
import 'yup-phone';
import * as ImagePicker from 'expo-image-picker';

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

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  console.log('image ', image);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ProfileFormData>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      firstName: 'Phil Dominic',
      lastName: 'Baculio',
      email: 'gpbaculio@gmail.com',
      phoneNumber: '15853042859',
    },
  });
  const [toggleCheck, setToggleCheck] = useState(false);
  return (
    <KeyboardScroll>
      <DynamicView flex={1} padding="m">
        <DynamicText fontSize={18} fontWeight="bold">
          Personal Information
        </DynamicText>
        <DynamicView mt="xxs" flexDirection="row" alignItems="center">
          <DynamicView mr="l">
            <DynamicText variant="profileLabel" color="#AFAFAF">
              Avatar
            </DynamicText>
            {image ? (
              <DynamicImage
                source={{uri: image}}
                mt="xxs"
                width={60}
                height={60}
                borderRadius={60}
              />
            ) : (
              <DynamicView
                mt="xxs"
                width={60}
                height={60}
                borderRadius={60}
                bg="#57B87D"
              />
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
            mt="xL"
            padding="xxs"
            borderRadius={8}
            borderColor="#495E57"
            borderWidth={1}>
            <DynamicText color="#495E57">Remove</DynamicText>
          </DynamicPressable>
        </DynamicView>
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
                    borderWidth: 1,
                    paddingVertical: 4,
                    width: '100%',
                    paddingHorizontal: 8,
                    borderRadius: 8,
                    color: handleFormColor(!!errors.phoneNumber),
                    borderColor: handleFormColor(!!errors.phoneNumber),
                  }}
                  placeholder="Phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
          <DynamicPressable
            marginVertical="xxxs"
            flexDirection="row"
            alignItems="center"
            onPress={() => setToggleCheck(v => !v)}>
            <Ionicons
              name={toggleCheck ? 'ios-checkbox' : 'square-outline'}
              size={23}
              color="#495E57"
            />
            <DynamicText ml="xs">Order statuses</DynamicText>
          </DynamicPressable>
          <DynamicPressable
            marginVertical="xxxs"
            flexDirection="row"
            alignItems="center"
            onPress={() => setToggleCheck(v => !v)}>
            <Ionicons
              name={toggleCheck ? 'ios-checkbox' : 'square-outline'}
              size={23}
              color="#495E57"
            />
            <DynamicText ml="xs">Order statuses</DynamicText>
          </DynamicPressable>
          <DynamicPressable
            marginVertical="xxxs"
            flexDirection="row"
            alignItems="center"
            onPress={() => setToggleCheck(v => !v)}>
            <Ionicons
              name={toggleCheck ? 'ios-checkbox' : 'square-outline'}
              size={23}
              color="#495E57"
            />
            <DynamicText ml="xs">Order statuses</DynamicText>
          </DynamicPressable>
          <DynamicPressable
            marginVertical="xxxs"
            flexDirection="row"
            alignItems="center"
            onPress={() => setToggleCheck(v => !v)}>
            <Ionicons
              name={toggleCheck ? 'ios-checkbox' : 'square-outline'}
              size={23}
              color="#495E57"
            />
            <DynamicText ml="xs">Order statuses</DynamicText>
          </DynamicPressable>
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
          borderWidth={1}
          borderColor="#495E57">
          <DynamicText fontWeight="bold" color="#AFAFAF">
            Log out
          </DynamicText>
        </DynamicPressable>
        <DynamicPressable variant="button" backgroundColor="#495E57">
          <DynamicText fontWeight="bold" color="#FFFFFF">
            Log out
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
    </KeyboardScroll>
  );
};

export default Profile;

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
      .phone('US', true, 'Please enter a Valid Phone number')
      .required('Please enter a Valid Phone number'),
  }),
);
