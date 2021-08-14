import { useEffect, useState } from "react";

import { Row, Col, message } from "antd";

import API from "../../Services/API";

import Layout from "../../Layout";
import { GroupTask, Skeleton } from "../../Components";

const Home = () => {
  const [todo, setTodo] = useState({
    isLoading: true,
    items: [],
  });

  const fetchListGroupTask = () => {
    setTodo((prevState) => ({ ...prevState, isLoading: true }));
    API.getTodos().then((response) => {
      if (Array.isArray(response)) {
        setTodo({
          isLoading: false,
          items: response,
        });
      } else {
        message.error(`${response?.message}`);
      }
      setTodo((prevState) => ({ ...prevState, isLoading: false }));
    });
  };

  useEffect(() => {
    fetchListGroupTask();
  }, []);

  return (
    <Layout>
      <div className="home">
        {todo.isLoading ? (
          <Skeleton />
        ) : todo.items.length === 0 ? (
          <Row gutter={[24, 24]}>
            <Col className="gutter-row" span={6} xs={24} md={34} lg={24}>
              <div className="groupTask one">
                <center>No Todos Available</center>
              </div>
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 24]}>
            {todo.items.map((item, index) => {
              return (
                <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                  <GroupTask
                    typeTask={
                      index === 0
                        ? "one"
                        : index === 1
                          ? "two"
                          : index === 2
                            ? "three"
                            : "four"
                    }
                    data={item}
                    totalTodo={todo.items.length}
                    index={index}
                    prevTodoID={index === 0 ? null : todo.items[index - 1].id}
                    nextTodoID={
                      index === todo.items.length - 1
                        ? null
                        : todo.items[index + 1].id
                    }
                    fetchListGroupTask={fetchListGroupTask}
                  >
                    Task
                  </GroupTask>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default Home;
