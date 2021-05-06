import { Skeleton, Col, Row } from "antd";

const SkeletonComponent = ({ type = "group" }) => {
  return (
    <>
      {type === "group" ? (
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                <div className="groupTask two">
                  <Skeleton active />
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="groupTask__list__empty">
          <Skeleton active />
        </div>
      )}
    </>
  );
};

export default SkeletonComponent;
