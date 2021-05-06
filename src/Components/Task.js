import { useState } from "react";
import MoreIcon from "../Assets/icons/MoreIcon";

import {
  Progress,
  Dropdown,
  Menu,
  message,
  Modal,
  Input,
  Typography,
} from "antd";
import {
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { ModalForm } from "../Components";

import API from "../Services/API";

const { confirm } = Modal;
const { Text, Title } = Typography;

const Task = ({
  data,
  totalTodo,
  todoIndex,
  todoID,
  fetchItemTodo,
  prevTodoID,
  nextTodoID,
  fetchListGroupTask,
}) => {
  const [isVisibleModalUpdate, setIsVisibleModalUpdate] = useState(false);
  const [formUpdate, setFormUpdate] = useState({
    name: data?.name || null,
    progress_percentage: data?.progress_percentage || null,
  });
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const deleteTask = () => {
    API.deleteItemsTodos(todoID, data.id).then((response) => {
      message.success("Delete Items Success !");
      fetchItemTodo();
    });
  };

  const showConfirmDelete = () => {
    confirm({
      title: "Delete Task",
      icon: <ExclamationCircleOutlined />,
      content:
        "Are you sure want to delete this task? your action can’t be reverted.",
      onOk() {
        deleteTask();
      },
      okText: "Delete",
      okButtonProps: { style: { backgroundColor: "#EB5757" } },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const moveItemsTodo = () => {
    const targetTodoID = prevTodoID === null ? nextTodoID : prevTodoID;

    API.moveItemsTodos(todoID, data.id, targetTodoID).then((response) => {
      const messageExist = response?.message || null;
      if (messageExist !== null) {
        message.error(`${response?.message}`);
      } else {
        fetchListGroupTask();
        message.success("Item Success Moved !");
      }
    });
  };

  const updateItemsTodo = () => {
    setIsLoadingUpdate(true);
    API.updateItemsTodos(todoID, data.id, formUpdate).then((response) => {
      const messageExist = response?.message || null;
      if (messageExist !== null) {
        message.error(`${response?.message}`);
      } else {
        fetchItemTodo();
        message.success("Item Success Updated !");

        setIsVisibleModalUpdate(false);
      }
      setIsLoadingUpdate(false);
    });
  };

  const menu = (
    <Menu>
      {todoIndex === 0 ? (
        <>
          <Menu.Item
            key="1"
            icon={<ArrowRightOutlined />}
            onClick={moveItemsTodo}
          >
            Move Right
          </Menu.Item>
        </>
      ) : todoIndex === totalTodo - 1 ? (
        <>
          <Menu.Item
            key="1"
            icon={<ArrowLeftOutlined />}
            onClick={moveItemsTodo}
          >
            Move Left
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="1"
            icon={<ArrowLeftOutlined />}
            onClick={moveItemsTodo}
          >
            Move Left
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ArrowRightOutlined />}
            onClick={moveItemsTodo}
          >
            Move Right
          </Menu.Item>
        </>
      )}
      <Menu.Item
        key="3"
        icon={<EditOutlined />}
        onClick={() => setIsVisibleModalUpdate(true)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="4" icon={<DeleteOutlined />} onClick={showConfirmDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="groupTask__list__task">
      <p>{data?.name || "-"}</p>
      <div className="groupTask__list__task__action">
        <div className="groupTask__list__task__action__progress">
          <Progress
            percent={data?.progress_percentage}
            status="active"
            strokeColor={
              data?.progress_percentage === 100.0 ? "#52C41A" : "#1890FF"
            }
            strokeWidth={7}
            trailColor="#F5F5F5"
            width={8}
          />
        </div>
        <Dropdown overlay={menu}>
          <div className="groupTask__list__task__action__menu">
            <MoreIcon />
          </div>
        </Dropdown>
      </div>

      <ModalForm
        isModalVisible={isVisibleModalUpdate}
        okText={isLoadingUpdate ? "Loading..." : "Save Task"}
        title="Create Task"
        handleCancel={() => {
          setIsVisibleModalUpdate(false);
        }}
        handleOk={() => updateItemsTodo()}
      >
        <Title level={5}>Edit Task</Title>
        <div style={{ marginBottom: 8, marginTop: 21 }}>
          <Text>Task Name</Text>
          <Input
            placeholder="example: Build rocket to Mars."
            style={{ width: "100%", marginTop: 4 }}
            type="text"
            value={formUpdate.name}
            onChange={({ target: { value } }) =>
              setFormUpdate((prevState) => ({ ...prevState, name: value }))
            }
          />
        </div>
        <div
          style={{ marginBottom: 8, display: "flex", flexDirection: "column" }}
        >
          <Text>Progress</Text>
          <Input
            placeholder="0%"
            style={{ width: "30%", marginTop: 4 }}
            maxLength={3}
            type="number"
            value={formUpdate.progress_percentage}
            onChange={({ target: { value } }) => {
              if (value > 100) {
                message.warning("Value cannot more then 100 !");
              } else {
                setFormUpdate((prevState) => ({
                  ...prevState,
                  progress_percentage: value,
                }));
              }
            }}
          />
        </div>
      </ModalForm>
    </div>
  );
};

export default Task;
