import React from 'react';

import {Control, Controller} from 'react-hook-form';
import Ionicons from '@expo/vector-icons/Ionicons';

import {DynamicPressable, DynamicText, DynamicView} from 'src/components';
import {ProfileFormData} from './Profile';

type EmailNotificationFieldsProps = {
  control: Control<ProfileFormData, any>;
};

const EmailNotificationFields = ({control}: EmailNotificationFieldsProps) => (
  <DynamicView>
    <DynamicText mt="m" fontSize={18} fontWeight="bold">
      Email Notifications
    </DynamicText>
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
);

export default EmailNotificationFields;
