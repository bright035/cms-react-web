import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getUserType } from "../component/userStatus";
import { routerData } from "../constant";

const getCrumbNames = (data, end_node) => {
  let id = data.findIndex((item) => item.endNode === end_node) + 1;
  let names = [];
  while (id !== 0) {
    names.push(data[id - 1].name);
    id = data[id - 1].pid;
  }
  names.reverse();
  return names;
};
const activePaths = (paths) => {
  let sub,detail;
  if (/\[.*\]/.test(paths[paths.length-1])){
    sub = paths.slice(2,paths.length-1);
    detail = true;
    return {sub,detail};
  } else {
    sub = paths.slice(2);
    detail = false;
    return {sub,detail};
  }
};

export const AppBreadcrumb = () => {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split("/").slice(1);
  const root = "/" + paths.slice(0, 2).join("/");
  const { sub, detail } = activePaths(paths);
  const userType = getUserType();
  const end_node = sub[sub.length - 1];
  const names = getCrumbNames(routerData, end_node);
  return (
    <Breadcrumb style={{ margin: "0 16px", padding: 16 }}>
      <Breadcrumb.Item key={root}>
        <Link href={root}>{`CMS ${userType.toLocaleUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
      {names.map((name, index) => {
        const pathNode = end_node;
        const pathIndex = sub.findIndex((item) => item === pathNode) + 1;
        const pathHref = [root, ...sub.slice(0, pathIndex)].join("/");
        return (
          <Breadcrumb.Item key={index}>
            {(index === names.length - 1 && detail === true) ? (
              <Link href={pathHref}>{name}</Link>
            ) : (
              name
            )}
          </Breadcrumb.Item>
        );
      })}
      {detail?[<Breadcrumb.Item key={sub.length+1}> Detail </Breadcrumb.Item>]:null}
    </Breadcrumb>
  );
};
