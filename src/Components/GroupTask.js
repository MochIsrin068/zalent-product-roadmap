import { useEffect, useState } from "react";
import { Input, Typography, message } from "antd";

import API from "../Services/API";

import { Task, ModalForm, Skeleton } from "../Components";

import AddIcon from "../Assets/icons/AddIcon";

const { Text, Title } = Typography;
const GroupTask = ({
  typeTask = "one",
  data = {},
  totalTodo = 0,
  index,
  prevTodoID,
  nextTodoID,
  fetchListGroupTask,
}) => {
  const [task, setTask] = useState({
    isLoading: true,
    items: [],
  });

  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    name: null,
    progress_percentage: null,
  });
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const fetchItemsTodo = () => {
    setTask((prevState) => ({ ...prevState, isLoading: true }));
    API.getItemsTodos(data.id).then((response) => {
      if (Array.isArray(response)) {
        setTask({
          isLoading: false,
          items: response,
        });
      } else {
        message.error(`${response?.message}`);
      }
      setTask((prevState) => ({ ...prevState, isLoading: false }));
    });
  };

  useEffect(fetchItemsTodo, [fetchItemsTodo]);

  const createItemsTodo = () => {
    setIsLoadingCreate(true);
    API.createItemsTodos(data.id, formCreate).then((response) => {
      const messageExist = response?.message || null;
      if (messageExist !== null) {
        message.error(`${response?.message}`);
      } else {
        fetchItemsTodo();
        message.success("Item Success Created !");

        setIsVisibleModalCreate(false);
        resetFormCreate();
      }
      setIsLoadingCreate(false);
    });
  };

  const resetFormCreate = () => {
    setFormCreate({
      name: null,
      progress_percentage: null,
    });
  };

  return (
    <div className={`groupTask ${typeTask}`} key={data?.id || ""}>
      <div
        className={`groupTask__chip ${
          typeTask === "one"
            ? "chipOne"
            : typeTask === "two"
            ? "chipTwo"
            : typeTask === "three"
            ? "chipThree"
            : "chipFour"
        }`}
      >
        {data?.title || ""}
      </div>
      <div className="groupTask__label">{data?.description || ""}</div>
      <div className="groupTask__list">
        {task.isLoading ? (
          <Skeleton type="single" />
        ) : task.items.length === 0 ? (
          <div className="groupTask__list__empty">
            <span>No Task Available</span>
          </div>
        ) : (
          task.items.map((item) => {
            return (
              <Task
                data={item}
                totalTodo={totalTodo}
                todoIndex={index}
                todoID={data.id}
                fetchItemTodo={fetchItemsTodo}
                prevTodoID={prevTodoID}
                nextTodoID={nextTodoID}
                fetchListGroupTask={fetchListGroupTask}
              />
            );
          })
        )}
      </div>
      <div
        className="groupTask__button"
        onClick={() => setIsVisibleModalCreate(true)}
      >
        <AddIcon />
        <span>New Task</span>
      </div>

      <ModalForm
        isModalVisible={isVisibleModalCreate}
        okText={isLoadingCreate ? "Loading..." : "Save Task"}
        title="Create Task"
        handleCancel={() => {
          setIsVisibleModalCreate(false);
          resetFormCreate();
        }}
        handleOk={() => createItemsTodo()}
      >
        <Title level={5}>Create Task</Title>
        <div style={{ marginBottom: 8, marginTop: 21 }}>
          <Text>Task Name</Text>
          <Input
            placeholder="example: Build rocket to Mars."
            style={{ width: "100%", marginTop: 4 }}
            type="text"
            value={formCreate.name}
            onChange={({ target: { value } }) =>
              setFormCreate((prevState) => ({ ...prevState, name: value }))
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
            value={formCreate.progress_percentage}
            onChange={({ target: { value } }) => {
              if (value > 100) {
                message.warning("Value cannot more then 100 !");
              } else {
                setFormCreate((prevState) => ({
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

export default GroupTask;
