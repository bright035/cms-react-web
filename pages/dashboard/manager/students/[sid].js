import { useRouter } from "next/router";
import { Card, Col, Row, Table, Tabs, Tag, Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppLayout from "../../../../lib/component/layout";
import { axiosGetStudentById } from "../../../../lib/service";
import Link from 'next/link';


export async function getServerSideProps(context) {
  const { sid } = context.params;
  
  return {
    props: { id: sid }
  };
}

const studentDetails = (props) => {
  const router = useRouter();
  const { sid } = router.query;
  const [courses, setCourses] = useState([]);
  const [info, setInfo] = useState([]);
  const [about, setAbout] = useState([]);
  const [data, setData] = useState(null);
  const tagColor = [
    "magenta",
    "volcano",
    "orange",
    "gold",
    "green",
    "cyan",
    "geekblue",
    "purple",
    "red",
    "lime",
  ];
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name, course) => {
        return (
          <Link href={`/dashboard/${localStorage.getItem("loginData").role}/courses/${course.id}`}>
            {name}
          </Link>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => {
        return type.map((item) => item.name).join(",");
      },
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
    },
  ];

  useEffect(() => {
    const id = +sid || props.id;
    // console.log(props.id);
    axiosGetStudentById(id)
      .then(({ data }) => {
        const info = [
          { label: "Name", value: data.data.name },
          { label: "Age", value: data.data.age },
          { label: "Email", value: data.data.email },
          { label: "Phone", value: data.data.phone },
        ];
        const about = [
          { label: "Eduction", value: data.data.education },
          { label: "Area", value: data.data.country },
          { label: "Gender", value: data.data.gender === 1 ? "Male" : "Female" },
          {
            label: "Member Period",
            value: data.data.memberStartAt + " - " + data.data.memberEndAt,
          },
          { label: "Type", value: data.data.type.name },
          { label: "Create Time", value: data.data.memberStartAt },
          { label: "Update Time", value: data.data.memberEndAt},
        ];
        setInfo(info);
        setCourses(data.data.courses);
        setAbout(about);
        setData(data.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);
  return (
    <>
      <AppLayout>
        <p>Student: {sid}</p>
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <Card
              title={
                <Avatar
                  src={data?.avatar}
                  style={{
                    width: 100,
                    height: 100,
                    display: "block",
                    margin: "auto",
                  }}
                />
              }
            >
              <Row gutter={[6, 16]}>
                {info.map((item) => (
                  <Col
                    span={12}
                    key={item.label}
                    style={{ textAlign: "center" }}
                  >
                    <b>{item.label}</b>
                    <p>{item.value}</p>
                  </Col>
                ))}
              </Row>
              <Row gutter={[6, 16]}>
                <Col span={24} style={{ textAlign: "center" }}>
                  <b>Address</b>
                  <p>{data?.address}</p>
                </Col>
              </Row>
            </Card> 
          </Col>

          <Col offset={1} span={15}>
            <Card>
              <Tabs defaultActiveKey="1" animated={true}>
                <Tabs.TabPane tab="About" key="1">
                  <h3>Information</h3>

                  <Row gutter={[6, 16]}>
                    {about?.map((item) => (
                      <Col span={24} key={item.label}>
                        <b
                          style={{
                            marginRight: 16,
                            minWidth: 150,
                            display: "inline-block",
                          }}
                        >
                          {item.label}:
                        </b>
                        <span>{item.value}</span>
                      </Col>
                    ))}
                  </Row>

                  <h3>Interesting</h3>

                  <Row gutter={[6, 16]}>
                    <Col>
                      {data?.interest?.map((item, index) => (
                        <Tag
                          color={tagColor[index]}
                          key={item}
                          style={{ padding: "5px 10px" }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </Col>
                  </Row>

                  <h3>Description</h3>

                  <Row gutter={[6, 16]}>
                    <Col style={{ lineHeight: 2 }}>{data?.description}</Col>
                  </Row>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Courses" key="2">
                  <Table
                    dataSource={courses}
                    columns={columns}
                    rowKey="id"
                  ></Table>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default studentDetails;