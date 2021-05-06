import { useState } from "react";
import { Input, Typography, message } from "antd";
import { Button, ModalForm } from "../Components";

import API from "../Services/API";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Header = () => {
  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    title: null,
    description: null,
  });
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const createGroupTask = () => {
    setIsLoadingCreate(true);
    API.createGroupTask(formCreate).then((response) => {
      const messageExist = response?.message || null;
      if (messageExist !== null) {
        message.error(`${response?.message}`);
      } else {
        window.location.reload();
        message.success("Todos Success Created !");

        setIsVisibleModalCreate(false);
        resetFormCreate();
      }
      setIsLoadingCreate(false);
    });
  };

  const resetFormCreate = () => {
    setFormCreate({
      title: null,
      description: null,
    });
  };

  return (
    <div className="header">
      <h1>Product Roadmap</h1>
      <Button
        label="Add Group Task"
        type="primary"
        onAction={() => setIsVisibleModalCreate(true)}
      />

      <ModalForm
        isModalVisible={isVisibleModalCreate}
        okText={isLoadingCreate ? "Loading..." : "Save Group Task"}
        title="Create Task"
        handleCancel={() => {
          setIsVisibleModalCreate(false);
          resetFormCreate();
        }}
        handleOk={() => createGroupTask()}
      >
        <Title level={5}>Create Group Task</Title>
        <div style={{ marginBottom: 8, marginTop: 21 }}>
          <Text>Group Title</Text>
          <Input
            placeholder="example: Group Task 1"
            style={{ width: "100%", marginTop: 4 }}
            type="text"
            value={formCreate.title}
            onChange={({ target: { value } }) =>
              setFormCreate((prevState) => ({ ...prevState, title: value }))
            }
          />
        </div>
        <div
          style={{ marginBottom: 8, display: "flex", flexDirection: "column" }}
        >
          <Text>Description</Text>
          <TextArea
            allowClear
            placeholder="description"
            style={{ marginTop: 4 }}
            value={formCreate.progress_percentage}
            onChange={({ target: { value } }) => {
              setFormCreate((prevState) => ({
                ...prevState,
                description: value,
              }));
            }}
          />
        </div>
      </ModalForm>
    </div>
  );
};

export default Header;
