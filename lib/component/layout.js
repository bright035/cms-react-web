import Link from "next/link";
import React, { useState } from "react";
import { Layout, Menu, Dropdown, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { axiosPostLogout } from "../../lib/service";
import { useRouter } from "next/router";
import { role, routerData } from "../constant";
import { getUserType, generateKey } from "../component/userStatus";
import {AppBreadcrumb} from './breadCrumb'

const { Header, Sider, Content } = Layout;

const logout = () => {
  axiosPostLogout()
    .then(() => {
      localStorage.removeItem("loginData");
      router.push("/login");
    })
    .catch((e) => {
      message.info(e.message);
    });
};
const menu = (
  <Menu>
    <Menu.Item>
      <a href="#" onClick={logout}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

const getKeys = (data, id) => {
  for (let index in data) {
    const item = data[index];
    const key = generateKey(index, item);
    if (item.id === id) {
      return [key];
    } else if (item.children && !!item.children) {
      const result = getKeys(item.children, id);
      if (!!result) {
        return [...result, key];
      }
    }
  }
  return null;
};

function createMenu(data) {
  // const path = router.pathname.split('/').slice(2).reverse();
  // const activePath = (/\[.*\]/.test(path[0])? path.slice(1):path).reverse();
  // console.log(activePath);
  // let stack = [...data.map((item)=>item).reverse()];
  // let result = `<Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark" collapsed={"" + collapsed} onClick={onchange} defaultOpenKeys = {defaultOpenKeys} defaultSelectedKeys = {defaultSelectedKeys} >`;
  // while(stack.length>0){
  //   const node = stack.pop();
  //   if (node.children && !!node.children.length){
  //     if (node?.checked===undefined){
  //       result += `<Menu.SubMenu key=${node.name} title=${node.name} icon=${node.icon}>`
  //       stack.push({...node,checked:1});
  //       stack =stack.concat(node.children.map((item)=>item).reverse());
  //       console.log(stack.length);
  //     } else {
  //       result += `</Menu.SubMenu>`;
  //     }
  //   } else {
  //     result += ` <Menu.Item key=${node.name} title=${node.name} icon=${node.icon} > ${node.name} </Menu.Item>`;
  //   }
  // }
  // result += `</Menu>`;
  // return result;
  return data.map((item, index) => {
    if (item.children && !!item.children.length) {
      return (
        <Menu.SubMenu
          key={generateKey(index, item)}
          title={item.name}
          icon={item.icon}
        >
          {createMenu(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item
          key={generateKey(index, item)}
          title={item.name}
          icon={item.icon}
        >
          <Link
            href={["/dashboard", getUserType(), ...routerData[item.id - 1].path]
              .filter((item) => !!item)
              .join("/")}
            replace
          >
            {item.name}
          </Link>
        </Menu.Item>
      );
    }
  });
}
export default function AppLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  // const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  // const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);

  const router = useRouter();
  // const onchange = (event) => {
  // setDefaultOpenKeys(event.keyPath);
  // setDefaultSelectedKeys([event.key]);
  // console.log(defaultOpenKeys, defaultSelectedKeys);
  //   console.log(event.keyPath,[event.key]);
  // };
  const getDefaultKeys = () => {
    const path = router.pathname.split("/").slice(3).reverse();
    const activePath = /\[.*\]/.test(path[0]) ? path.slice(1) : path;
    const id =
      routerData.find((item) => item.endNode === activePath[0]).id;
    const keys = getKeys(role[getUserType()], id) || [""];
    const defaultSelectedKeys = [keys[0]];
    const defaultOpenKeys = keys.slice(1);
    // console.log(defaultSelectedKeys, defaultOpenKeys, keys, activePath);
    return { defaultSelectedKeys, defaultOpenKeys };
  };
  const { defaultSelectedKeys, defaultOpenKeys } = getDefaultKeys();
  const sideMenu = createMenu(role[getUserType()]);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const toggleCollapsed = () => {
    setSubcollapsed(!subCollapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div id="siderTrigger">
          <div className="logo">CMS</div>
          <Menu
            mode="inline"
            theme="dark"
            // collapsed={"" + collapsed}
            // onClick={onchange}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
          >
            {sideMenu}
          </Menu>
          {/* <div dangerouslySetInnerHTML={{__html:sideMenu}}/> */}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
          id="layoutHeader"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div className="trigger1">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <ExportOutlined />
              </a>
            </Dropdown>
          </div>
        </Header>
        <AppBreadcrumb/>
        <Content
          className="site-layout-background, content"
          style={{
            margin: "24px 16px",
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
