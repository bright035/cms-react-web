import Head from "next/head";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import { Select, Form, Input, Button, Modal, message, Space } from "antd";
import "antd/dist/antd.css";
import { axiosPostStudents } from "../service";
import { PlusOutlined } from "@ant-design/icons";

export const ModalFormButton = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState(["China", "Australia"]);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setCountries(JSON.parse(localStorage.getItem("CountryList")));
    setModalVisible(true);
  };
  const modalFinish = (value) => {
    axiosPostStudents(value.name, value.country, value.email, value.type)
      .then((res) => {
        setModalVisible(false);
        message.info("New student created");
      })
      .catch((e) => {
        setModalVisible(false);
        message.info(e.message);
      });
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add
      </Button>
      <Modal
        destroyOnClose={true}
        closable={false}
        visible={modalVisible}
        footer={null}
      >
        <div>
          <p>Add Student</p>
        </div>
        <div>
          <Form
            form={form}
            onFinish={modalFinish}
            labelCol={{ span: 6, offset: 0 }}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input type="text" placeholder="student name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "email format invalid",
                },
                {
                  required: true,
                },
              ]}
            >
              <Input type="email" placeholder="email" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true }]}
            >
              <Select>
                {countries?.map((country, index) => (
                  <Select.Option value={country} key={index}>
                    {country}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Student Type"
              name="type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={1}>Tester</Select.Option>
                <Select.Option value={2}>Developer</Select.Option>
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                登记新学生
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>
    </>
  );
};
