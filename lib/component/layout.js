import React, {useState} from 'react'
import { Layout, Menu, Dropdown, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ExportOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css"
import {axiosPostLogout} from '../../lib/service';
import {useRouter} from 'next/router';


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function AppLayout(props) {
  const router = useRouter();
  let [collapsed, setCollapsed] = useState(false)
  let [subCollapsed, setSubcollapsed] = useState(false)
  const logout = () => {
      axiosPostLogout().then((res) => {
          localStorage.removeItem('loginData');
          router.push('/login')
        }
      ).catch((e) => {
        message.info(e.message);
      });
      
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a  href="#" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const toggleCollapsed = () => {
    setSubcollapsed(!subCollapsed)
  };

    return (
      <Layout style={{minHeight:"100vh"}}>
        <Sider id="siderTrigger" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >CMS</div>
          <Menu 
            defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            collapsed={""+subCollapsed} 
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Overview
            </Menu.Item>
            <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Student">
              <Menu.Item key="2">
                Student List
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Teacher
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="trigger1" >
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <ExportOutlined />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
}
