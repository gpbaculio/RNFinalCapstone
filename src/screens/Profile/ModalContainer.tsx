import {Modal} from 'react-native';
import React, {ReactNode} from 'react';
import {DynamicView} from 'src/components';

type ModalContainerProps = {
  children: ReactNode;
  showConfirmModal: boolean;
};

const ModalContainer = ({showConfirmModal, children}: ModalContainerProps) => (
  <Modal visible={showConfirmModal} transparent>
    <DynamicView flex={1} variant="center" bg="overlay">
      <DynamicView
        elevation={3}
        backgroundColor="#FFFFFF"
        borderRadius={8}
        variant="center"
        p="l">
        {children}
      </DynamicView>
    </DynamicView>
  </Modal>
);

export default ModalContainer;
