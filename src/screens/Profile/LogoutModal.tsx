import React from 'react';

import {DynamicPressable, DynamicText, DynamicView} from 'src/components';
import ModalContainer from './ModalContainer';

type LogoutModalProps = {
  showConfirmModal: boolean;
  onConfirmPress: () => void;
  hideModal: () => void;
};

const LogoutModal = ({
  showConfirmModal,
  onConfirmPress,
  hideModal,
}: LogoutModalProps) => (
  <ModalContainer showConfirmModal={showConfirmModal}>
    <DynamicText fontSize={21} fontWeight="900" color="#495E57">
      Confirm
    </DynamicText>
    <DynamicText fontWeight="500" mt="m">
      Please Confirm to Proceed
    </DynamicText>
    <DynamicView flexDirection="row" alignItems="center">
      <DynamicPressable
        onPress={onConfirmPress}
        mr="l"
        bg="#495E57"
        p="s"
        mt="m"
        borderRadius={8}>
        <DynamicText color="#FFFFFF" fontWeight="500">
          Logout
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
  </ModalContainer>
);

export default LogoutModal;
