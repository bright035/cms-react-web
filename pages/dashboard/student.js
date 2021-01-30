import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Dropdown,Space, Input, Table } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ExportOutlined,
  AudioOutlined 
} from '@ant-design/icons';
import "antd/dist/antd.css"
import AppLayout from '../lib/component/layout'
import {axiosGetStudentsByPage} from '../lib/sevice'
import { axiosInstance } from '../lib/constant'

const { Search } = Input;
const data = [
  {
    name: 'student',
    area: 'China',
    email: 'student@admin.com',
    courses: 'Math',
    typeName: 'Full time',
    ctime: '21/01/2021',
  },
]
const columns=[
  {
    title:'No.',
    key: 'index',
    render: (_1, _2, index) => index + 1,
  },
  {
    title:'Name',
    dataIndex: 'name',
  },
  {
    title: 'Area',
    dataIndex: 'area',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title:'Selected Curriculum',
    dataIndex: 'courses',
  },
  {
    title: 'Student type',
    dataIndex: 'typeName',
  },
  {
    title: 'Join time',
    dataIndex: 'ctime',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const onSearch = value => console.log(value);
const studentData= async ()=>{
  let page=0
  let limit=10
  let response
  const ans = await axiosGetStudentsByPage(page,limit)
                
  console.log(ans)
  return true
}

export default function Student() {
    // 初始化data数据
    // 声明data钩子
    // 取回数据
    // 
    useEffect(() => {
      studentData()
      
    }, [])
    return (
      <AppLayout>
        <p>Contents</p>
      
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </Space>
        
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
        ></Table>
      </AppLayout>
    );
}


