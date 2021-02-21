import { useRouter } from "next/router";
import { Card, Tag, message, Badge, Col, Collapse, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppLayout from "../../../../lib/component/layout";
import styled from "styled-components";
import Link from "next/link";
import { axiosGetCourseById } from "../../../../lib/service";
import { CourseCard } from "../../../../lib/component/CourseCard";


const H2 = styled.h2`
  color: #7356f1;
`;

const H3 = styled.h3`
  margin: 1em 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-bottom: none;
  :last-child {
    border-right: none;
  }
  p {
    margin-bottom: 0;
  }
  b {
    color: #7356f1;
    font-size: 24px;
  }
`;

const StyledRow = styled(Row)`
  width: calc(100% + 48px);
  margin: 0 0 0 -24px !important;
`;

const getChapterExtra = (source, index) => {
    const activeIndex = source.chapters.findIndex((item) => item.id === source.current);
  
    if (index === activeIndex) {
      return <Tag color={'green'}>processing</Tag>;
    } else if (index < activeIndex) {
      return <Tag color={'default'}>finished</Tag>;
    } else {
      return <Tag color={'orange'}>pending</Tag>;
    }
  };

export async function getServerSideProps(context) {
  const { cid } = context.params;

  return {
    props: { id: cid },
  };
}
const studentDetails = (props) => {
  const router = useRouter();
  const { cid } = router.query;
  const [info, setInfo] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [data, setData] = useState(null);
  const CourseStatus = ["warning", "success", "default"];

  useEffect(() => {
    const id = +cid || props.id;
    axiosGetCourseById(cid)
      .then((res) => {
        const data = res.data.data;
        const sales = data.sales;
        const info = [
          { label: "Price", value: sales.price },
          { label: "Batches", value: sales.batches },
          { label: "Students", value: sales.studentAmount },
          { label: "Earings", value: sales.earnings },
        ];

        setInfo(info);
        setActiveChapterIndex(
          data.schedule.chapters.findIndex(
            (item) => item.id === data.schedule.current
          )
        );
        setData(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  return (
    <>
      <AppLayout>
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <CourseCard
              {...data}
              cardProps={{ bodyStyle: { paddingBottom: 0 } }}
            >
              <StyledRow
                gutter={[6, 16]}
                justify="space-between"
                align="middle"
              >
                {info.map((item, index) => (
                  <StyledCol span="6" key={index}>
                    <b>{item.value}</b>
                    <p>{item.label}</p>
                  </StyledCol>
                ))}
              </StyledRow>
            </CourseCard>
          </Col>

          <Col offset={1} span={15}>
            <Card>
              <H2>Course Detail</H2>

              <H3>Create Time</H3>
              <Row>{data?.createdAt}</Row>

              <H3>Start Time</H3>
              <Row>{data?.startTime}</Row>

              <Badge status={CourseStatus[data?.status]} offset={[5, 24]}>
                <H3>Status</H3>
              </Badge>
              <Row className='scrollbar'>
                <Steps size="small" current={activeChapterIndex} style={{width:'auto'}}>
                  {data?.schedule.chapters.map((item) => (
                    <Steps.Step title={item.name} key={item.id} style={{width:"200px!important"}}></Steps.Step>
                  ))}
                </Steps>
              </Row>

              <H3>Course Code</H3>
              <Row>{data?.uid}</Row>

              <H3>Class Time</H3>
              {data?.schedule.classTime}

              <H3>Category</H3>
              <Row>
                {data?.type.map((item,index) => (
                  <Tag color={"geekblue"} key={index}>{item?.name}</Tag>
                ))}
              </Row>

              <H3>Description</H3>
              {/** FIXME just for test purpose */}
              {data?.detail !== "no" ? (
                <Row>{data?.detail}</Row>
              ) : (
                <Row>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nostrum, iure soluta. Perspiciatis, odit perferendis suscipit
                  alias aut voluptatem aliquam dolorem rerum animi tempore
                  nostrum cum non temporibus rem cupiditate optio.
                </Row>
              )}

              <H3>Chapter</H3>
              {data?.schedule && (
                <Collapse defaultActiveKey={data.schedule.current}>
                  {data.schedule.chapters.map((item, index) => (
                    <Collapse.Panel
                      header={item.name}
                      key={item.id}
                      extra={getChapterExtra(data.schedule, index)}
                    >
                      <p>{item.content}</p>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              )}
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default studentDetails;
