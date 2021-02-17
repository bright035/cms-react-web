import {
    DashboardOutlined,
    DeploymentUnitOutlined,
    EditOutlined,
    FileAddOutlined,
    ProjectOutlined,
    ReadOutlined,
    SolutionOutlined,
    TeamOutlined,
    MessageOutlined
  } from '@ant-design/icons';


export const routerData = [
    {id:1,name:"Overview",pid:0,path:['overview'],endNode:'overview'},
    {id:2,name:"Student",pid:0,path:[''],endNode:''},
    {id:3,name:"Teacher",pid:0,path:[''],endNode:''},
    {id:4,name:"Course",pid:0,path:[''],endNode:''},
    {id:5,name:"Message",pid:0,path:["message"],endNode:"message"},
    {id:6,name:"Student List",pid:2,path:['students'],endNode:'students'},
    {id:7,name:"Teacher List",pid:3,path:['teachers'],endNode:'teachers'},
    {id:8,name:"All Course",pid:4,path:['courses'],endNode:'courses'},
    {id:9,name:"Add Course",pid:4,path:['courses','add-course'],endNode:'add-course'},
    {id:10,name:"Edit Course",pid:4,path:['courses','edit-course'],endNode:'edit-course'}
];
export const routerTreeData = [
    {id:1,name:"Overview",pid:0,icon:<DashboardOutlined />,children:[]},
    {id:2,name:"Student",pid:0,icon:<SolutionOutlined />,children:[
        {id:6,name:"Student List",pid:2,icon:<TeamOutlined />,children:[]}
    ]},
    {id:3,name:"Teacher",pid:0,icon:<DeploymentUnitOutlined />,children:[
        {id:7,name:"Teacher List",pid:3,icon:<TeamOutlined />,children:[]}
    ]},
    {id:4,name:"Course",pid:0,icon:<ReadOutlined />,children:[
        {id:8,name:"All Course",pid:4,icon:<ProjectOutlined />,children:[]},
        {id:9,name:"Add Course",pid:4,icon:<FileAddOutlined />,children:[]},
        {id:10,name:"Edit Course",pid:4,icon:<EditOutlined />,children:[]}
    ]},
    {id:5,name:"Message",pid:0,icon:<MessageOutlined />,children:[]},
];
    
export const teacher = routerTreeData[2];
export const student = routerTreeData[1];
export const overview = routerTreeData[0];
export const course = routerTreeData[3];
export const message = routerTreeData[4];

export const role = {
    student: [overview,course,message],
    manager: [overview,student,teacher,course,message],
    teacher: [overview,student,course,message]
};