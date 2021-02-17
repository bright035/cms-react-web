import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getUserType } from "../component/userStatus";
import { routerData } from "../constant";

const getCrumbNames = (data, end_node) => {
  let id = data.findIndex((item) => item.endNode === end_node)+1;
  let names = [];
  while (id !== 0) {
    names.push(data[id-1].name);
    id = data[id-1].pid;
  }
  names.reverse();
  return names;
};

export const AppBreadcrumb = () => {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split("/").slice(1);
  const root = "/" + paths.slice(0, 2).join("/");
  const sub = paths.slice(2);
  const userType = getUserType();
  const end_node = sub.reverse()[0];
  const names = getCrumbNames(routerData, end_node);
  sub.reverse();
  return (
    <Breadcrumb style={{ margin: "0 16px", padding: 16 }}>
      <Breadcrumb.Item key={root}>
        <Link href={root}>{`CMS ${userType.toLocaleUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
      {names.map((name, index) => {
        const pathNode = end_node;
        const pathIndex = sub.findIndex((item)=>item===pathNode) + 1;
        const pathHref = [root, ...sub.slice(0, pathIndex)].join('/');  
        return (
          <Breadcrumb.Item key={index}>
            {!!sub.find((item)=>item===pathNode) ? (
              <Link href={pathHref}>{name}</Link>
            ) : (
              name
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
