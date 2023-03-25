import React, {useState} from 'react';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';
import * as ImagePicker from 'expo-image-picker';

import {
  DynamicPressable,
  DynamicText,
  DynamicView,
  KeyboardScroll,
} from 'src/components';
import ProfileFormModal from './ProfileFormModal';
import AvatarField from './AvatarField';
import PersonalInformationFields from './PersonalInformationFields';
import EmailNotificationFields from './EmailNotificationFields';
import LogoutModal from './LogoutModal';
import BottomSection from './BottomSection';

import {useAuthentication} from 'src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProfileFormData = {
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
    firstName: state?.user?.firstName || '',
    lastName: state?.user?.lastName || '',
    email: state?.user?.email || '',
    phoneNumber: state?.user?.phoneNumber || '',
    emailStatuses: !!state?.user?.emailStatuses,
    passwordChanges: !!state?.user?.passwordChanges,
    specialOffers: !!state?.user?.specialOffers,
    newsLetter: !!state?.user?.newsLetter,
    image: state?.user?.image || '',
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

  const onConfirmPress = handleSubmit(onConfirm);

  const hideModal = () => {
    if (hasConfirmed) {
      setHasConfirmed(false);
    }
    setShowConfirmModal(false);
  };

  const onRemovePress = () => setValue('image', null, {shouldDirty: true});

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const onLogoutPress = async () => {
    setShowLogoutModal(false);
    setTimeout(() => {
      actions.setUser(null);
    }, 100);
  };

  const hideLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <KeyboardScroll>
      <ProfileFormModal
        showConfirmModal={showConfirmModal}
        hasConfirmed={hasConfirmed}
        onConfirmPress={onConfirmPress}
        hideModal={hideModal}
      />
      <LogoutModal
        onConfirmPress={onLogoutPress}
        showConfirmModal={showLogoutModal}
        hideModal={hideLogoutModal}
      />
      <DynamicView flex={1} padding="m">
        <DynamicText fontSize={18} fontWeight="bold">
          Personal Information
        </DynamicText>
        <AvatarField
          control={control}
          pickImage={pickImage}
          onRemovePress={onRemovePress}
        />
        <PersonalInformationFields control={control} errors={errors} />
        <EmailNotificationFields control={control} />
        <DynamicPressable
          marginVertical="s"
          onPress={() => {
            setShowLogoutModal(true);
          }}
          backgroundColor="#F4CE14"
          variant="button">
          <DynamicText fontWeight="bold">Log out</DynamicText>
        </DynamicPressable>
      </DynamicView>
      <BottomSection
        defaultValues={defaultValues}
        reset={reset}
        onSubmit={onSubmit}
        isDirty={isDirty}
      />
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
      .required('Please enter a Valid US Phone number')
      .phone('US', true, 'Please enter a Valid US Phone number'),
    image: Yup.string().nullable(),
    emailStatuses: Yup.boolean(),
    passwordChanges: Yup.boolean(),
    specialOffers: Yup.boolean(),
    newsLetter: Yup.boolean(),
  }),
);
