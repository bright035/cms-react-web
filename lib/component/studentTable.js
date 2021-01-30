import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React, {useState,useEffect} from 'react';
import {Input, Table, message, Space, Typography} from 'antd';
import "antd/dist/antd.css";
import {axiosGetStudentsByPageAndQuery} from '../../lib/service';
import _ from 'lodash';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {ModalFormButton} from '../../lib/component/modalForm';

const {Search} = Input;
const {Link} = Typography;

export const StudentTable = () => {
    //student table
    const [studentData, setStudentData] = useState([]);
    const [paginationConfig, setPagination] = useState({
                                          current: 1,
                                          pageSize: 10,
                                          total: 10
                                      });
    //search bar
    const [searchInput, setSearch] = useState("");
    

    //table format                                  
    const columns = [
      {
        title:'No.',
        key: 'index',
        render: (_1, _2, index) => index + 1,
      },
      {
        title:'Name',
        dataIndex: 'name',
        width: "15%",
        render: (name,student) => {
          return (
            <Link href={`./student/${student.id}`}>{name}</Link>
          )
        },
        sorter: (a,b) => (a.name.charCodeAt(0)-b.name.charCodeAt(0))
      },
      {
        title: 'Area',
        dataIndex: 'country',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title:'Selected Curriculum',
        dataIndex:'courses',
        render:(courses) =>
        courses.map((subItem) => subItem.name).join(", ") 
      },
      {
        title: 'Student type',
        dataIndex: 'type',
        width: "15%",
        filters:[
          { text: "tester",
            value: "tester"},
          { text: "developer",
            value: "developer"}
        ],
        onFilter: (value,record) => record.type.name==value,
        render: (type) => type?.name
        // render:(type)=>!!type&&type.hasOwnProperty('name')?type.name:""
      },
      {
        title: 'Join time',
        dataIndex: 'createdAt',
        render: (createdAt) => formatDistanceToNow(new Date(createdAt), {includeSeconds: true, addSuffix: true})
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: () => {
          return (
                <>
                <Space>
                  <Link>Add</Link>
                  <Link>Delete</Link>
                </Space>
                
                </>
              )
        }
      },
    ];
    //side effect for page and search
    useEffect(() => {
      axiosGetStudentsByPageAndQuery(searchInput,paginationConfig.current,paginationConfig.pageSize).then((res) => {
        const students = res.data.data.students;
        // console.log(res.data.data);
        setStudentData(students);
        setPagination({
          ...paginationConfig,
          total: res.data.data.total
        });
        // console.log(paginationConfig)
      }).catch(e => message.info(e.message));
    }, [paginationConfig.current, searchInput]);

    const onPageChange = page => {
        setPagination({
          ...paginationConfig,
          current: page
        });
      };
    
    const onInputSearch = event => {
      setPagination(
        {
          ...paginationConfig,
          current: 1
        }
      );
      setSearch(event.target.value);
    };

    const onSearch = value => {
      setPagination(
        {
          ...paginationConfig,
          current: 1
        }
      );
      setSearch(value);
    };
    return (
          <>
          <div>
            <ModalFormButton/>
            <div id='studentSearch'>
                <Search 
                placeholder="通过名称搜索" 
                onSearch={onSearch} 
                onChange={_.debounce(onInputSearch,1000)}
                enterButton />
            </div>
            </div>
            
            <Table
              pagination={
                {
                current: paginationConfig.current,
                pageSize: paginationConfig.pageSize,
                total: paginationConfig.total,
                responsive: true,
                showSizeChanger: false,
                onChange: (page) => onPageChange(page)
                }
              }
              rowKey="id"
              dataSource={studentData}
              columns={columns}
            />
          </>
    )
}