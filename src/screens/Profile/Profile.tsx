import {View, Text} from 'react-native';
import React from 'react';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
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
