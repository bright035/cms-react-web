import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '../styles/Home.module.css';
import React from 'react';
import { 
  Row,
  Col,
  Form,
  Input, 
  Checkbox, 
  Button, 
  Radio,
  Typography,
  message 
} from "antd";
import "antd/dist/antd.css";
import {axiosPost} from './../lib/service';
import {isHttpSuccess} from '../lib/service'

const {Title} = Typography;

export default function Login() {
  const router = useRouter();
  
  const onFinish = async (values) => {
    try{
      const res = await axiosPost(values);
      if(isHttpSuccess){
          localStorage.setItem('loginData',JSON.stringify(res.data.data))
          if(values.role==="student"){
            router.push("/dashboard/student")
          } else if (values.role==="teacher"){
            router.push("/dashboard/teacher")
          } else if (values.role==="manager"){
            router.push("/dashboard/manager")
          };
      };
    } catch(e) {
      message.info(e.message);
    };
    
    
    
  };

    return (
    
     <Row justify='center'>
         <Col md={8} sm={16}>

            <Form
                layout="vertical"
                initialValues={{"role":"manager"}}
                onFinish={onFinish}
            >

              <Form.Item>
                  <Title id="formHeader" level={4}>课程管理助手</Title>
              </Form.Item>

              <Form.Item
                name="role"
              >
                   <Radio.Group> 
                      <Radio.Button value="student">Student</Radio.Button>
                      <Radio.Button value="teacher">Teacher</Radio.Button>
                      <Radio.Button value="manager">Manager</Radio.Button>
                  </Radio.Group>
              </Form.Item>

              <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '输入邮箱不符合Email格式',
                    },
                    {
                      required: true,
                      message: '请输入您的邮箱',
                    },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的密码',
                    },
                    {
                      min:4,
                      message:'至少输入4位密码',
                    },
                    {
                      max:16,
                      message:'至多输入16位密码',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
              </Form.Item>

              <Form.Item  
                name="remember"
                valuePropName="checked"
              >
                  <Checkbox>记住我</Checkbox>
              </Form.Item>  

              <Form.Item>
                <Button 
                  id="formBtn" 
                  type="primary" 
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>            
            </Form>
         </Col>
     </Row>
    );
  };