import React from 'react';
import {Modal} from 'react-native';

import {DynamicPressable, DynamicText, DynamicView} from 'src/components';

type ProfileFormModalProps = {
  showConfirmModal: boolean;
  hasConfirmed: boolean;
  onConfirmPress: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  hideModal: () => void;
};

const ProfileFormModal = ({
  showConfirmModal,
  hasConfirmed,
  onConfirmPress,
  hideModal,
}: ProfileFormModalProps) => (
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
              onPress={onConfirmPress}
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
              onPress={hideModal}
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
            onPress={hideModal}
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
);

export default ProfileFormModal;
