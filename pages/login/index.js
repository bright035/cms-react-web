import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Button,
  Radio,
  Typography,
  message,
} from "antd";
import "antd/dist/antd.css";
import { axiosPost } from "./../../lib/service";
import { isHttpSuccess } from "../../lib/service";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userRole } from "../../lib/constant";

const { Title } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values) => {
    axiosPost(values).then((res) => {
      if (isHttpSuccess) {
        localStorage.setItem("loginData", JSON.stringify(res.data.data));
        router.push(`/dashboard/${values.role}`);
      } else {
          message.error('Not success')
      }
    }).catch((error)=>message.error(error.message));
  };
  return (
    <>
      <Row justify="center">
        <Col md={8} sd={12}>
          <Form
            layout={"horizontal"}
            onFinish={onFinish}
            initialValues={{
              remember: true,
              role: userRole.manager,
            }}
            form={form}
          >
            <Form.Item id="formHeader" level={4}>
              <Title>Course Management System</Title>
            </Form.Item>

            <Form.Item
              name="role"
              onChange={(event) => {
                const roleType = event.target.value;

                form.resetFields();
                form.setFieldsValue({ role: roleType });
              }}
              rules={[
                {
                  required: true,
                  message: "Role data required",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value={userRole.student}>Student</Radio.Button>
                <Radio.Button value={userRole.teacher}>Teacher</Radio.Button>
                <Radio.Button value={userRole.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email required",
                },
                {
                  type: "email",
                  message: "Email format error",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                type="email"
                placeholder="Please enter your email address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password required",
                },
                {
                  min: 4,
                  message: "No less than 4 characters",
                },
                {
                  max: 16,
                  message: "No more than 16 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Please enter password"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" id="formBtn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
