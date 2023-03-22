import { View, Text } from "react-native";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "yup-phone";
import { DynamicPressable, DynamicText, DynamicView } from "src/components";

const Profile = () => {
  return (
    <DynamicView flex={1} padding='m'>
      <DynamicText fontSize={18} fontWeight='bold'>
        Personal Information
      </DynamicText>
      <DynamicView mt='l' flexDirection='row' alignItems='center'>
        <DynamicView mr='l'>
          <DynamicText variant='profileLabel' color='#AFAFAF'>
            Avatar
          </DynamicText>
          <DynamicView
            mt='xxs'
            width={60}
            height={60}
            borderRadius={60}
            bg='#57B87D'
          />
        </DynamicView>
        <DynamicPressable padding='xxs' borderRadius={8} mr='l' bg='#495E57'>
          <DynamicText color='#FFFFFF'>Change</DynamicText>
        </DynamicPressable>
        <DynamicPressable
          padding='xxs'
          borderRadius={8}
          borderColor='#495E57'
          borderWidth={1}>
          <DynamicText color='#495E57'>Remove</DynamicText>
        </DynamicPressable>
      </DynamicView>
    </DynamicView>
  );
};

export default Profile;

const resolver = yupResolver(
  Yup.object({
    firstName: Yup.string()
      .min(2, "Please enter a valid First Name")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Please enter a valid Last Name")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .phone("US", true, "Please enter a Valid Phone number")
      .required("Please enter a Valid Phone number"),
  })
);
