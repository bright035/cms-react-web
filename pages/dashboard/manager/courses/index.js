import Link from "next/link";
import styles from "../../../../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Button, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import AppLayout from "../../../../lib/component/layout";
import { axiosGetCoursesByPage } from "../../../../lib/service";
import { CourseCard } from "../../../../lib/component/CourseCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

const ToTop = styled(VerticalAlignTopOutlined)`
  position: fixed;
  bottom: 50px;
  right: 15px;
  z-index: 999;
  font-size: 40px;
  color: #fff;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0.5;
  transition: all 0.5s;
  :hover {
    opacity: 0.8;
  }
`;

const Indicator = styled.div`
  position: relative;
  left: 50%,
  margin-top: 10px;
  transform: translateX(50%);
`;

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [paginator, setPaginator] = useState({ limit: 20, page: 1 });
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const listener = () => {
      const visible = document.body.scrollTop > 600 || document.documentElement.scrollTop > 600;

      setVisible(visible);
    };
    window.onscroll = function() {listener()};

  
  }, [visible]);

  useEffect(() => {
    axiosGetCoursesByPage(paginator)
      .then((res) => {
        const coursesData = [...courses, ...res.data.data.courses];
        setCourses(coursesData); //当第65个数据时触发了get/string.排查是因为，cover为string
        setHasMore(res.data.data.total > courses.length);
        // console.log(res.data.data.courses);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [paginator]);
  return (
    <AppLayout>
      <InfiniteScroll
        next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
        hasMore={hasMore}
        loader={
          <Indicator>
            <Spin size="large" />
          </Indicator>
        }
        dataLength={courses.length}
        endMessage={<Indicator>No More Course!</Indicator>}
        style={{ overflow: "hidden" }}
      >
        <List
          id="container"
          grid={{
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={courses}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CourseCard {...item}>
                <Link href={`/dashboard/manager/courses/${item.id}`} passHref>
                  <Button type="primary">Read More</Button>
                </Link>
              </CourseCard>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
      {visible ? (
        <ToTop
          onClick={() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop=0;
          }}
        />
      ) : null}
    </AppLayout>
  );
}
