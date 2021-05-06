import { Modal } from "antd";

const ModalForm = ({
  isModalVisible = false,
  children,
  handleCancel,
  handleOk,
  okText = "Save",
}) => {
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      okButtonProps={{ style: { backgroundColor: "#27AE60" } }}
      closable={false}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
