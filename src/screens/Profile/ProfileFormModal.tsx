import React from 'react';

import {DynamicPressable, DynamicText, DynamicView} from 'src/components';
import ModalContainer from './ModalContainer';

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
  <ModalContainer showConfirmModal={showConfirmModal}>
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
  </ModalContainer>
);

export default ProfileFormModal;
