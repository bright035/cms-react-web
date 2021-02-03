import Head from "next/head";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import { Select, Form, Input, Button, Modal, message, Space } from "antd";
import "antd/dist/antd.css";

export const ModalFormButton = (props) => {
  const initials = {
    "id": props.student?.id,
    "name": props.student?.name,
    "country": props.student?.country,
    "email": props.student?.email,
    "type": ""
  }

  const {axios} = props;
  const [form] = Form.useForm();
  const [countries, setCountries] = useState(["China", "Australia"]);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setCountries(JSON.parse(localStorage.getItem("CountryList")));
    setModalVisible(true);
  };
  const modalFinish = (value) => {
    axios(value.name, value.country, value.email, value.type, value?.id)
      .then((res) => {
        setModalVisible(false);
        message.info("Success");
        props.callback();
      })
      .catch((error) => {
        setModalVisible(false);
        message.info(error.message);
      });
  };

  return (
    <>
      <props.button click={showModal}/>
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
            initialValues={initials}
            form={form}
            onFinish={modalFinish}
            labelCol={{ span: 6, offset: 0 }}
          >
            <Form.Item label="ID" name="id">
            </Form.Item>
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
                {props.submit}
              </Button>
              <Button
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
