import React from "react";
import Modal from "react-native-modal";

const Modals = ({ isModalVisible, toggleModal, children }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      style={{ alignItems: "center" }}
    >
      {children}
    </Modal>
  );
};

export default Modals;
