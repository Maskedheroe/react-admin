// declare type CompItemType =  {
// import { path } from "path";
//   component: string,
//   path: string,
//   key: string,
//   sub?: CompItemType[]
// }

const getMenus = (roleType: string) => {
  const result: {
    ret: string;
    msg: string;
    data: {
      menus: any;
    };
  } = {
    ret: "0",
    msg: "成功",
    data: {
      menus: [],
    },
  };

  if (roleType === "1") {
    result.data.menus = [
      {
        component: "业务管理",
        path: "/business",
        key: "table",
        icon: "table",
        sub: [
          // {
          //   component: '基本表格',
          //   path: '/table/basicTable',
          //   key: '/table/basicTable'
          // },
          {
            component: "大章管理",
            path: "/business/chapter",
            key: "/business/chapter",
          },
          {
            component: "拖拽排序表格",
            path: "/table/dragSortingTable",
            key: "table/dragSortingTable",
          },
        ],
      },
      {
        component: "图表",
        path: "/chart",
        key: "chart",
        icon: "chart",
        sub: [
          {
            component: "折线图",
            path: "/chart/lineChart",
            key: "chart/lineChart",
          },
          {
            component: "饼图",
            path: "/chart/pieChart",
            key: "chart/pieChart",
          },
        ],
      },
      {
        component: "组件",
        path: "/components",
        key: "components",
        icon: "components",
        sub: [
          {
            component: "富文本编辑器",
            path: "/components/richText",
            key: "components/richText",
          },
          {
            component: "Markdown",
            path: "/components/markdown",
            key: "components/markdown",
          },
          {
            component: "JSON编辑器",
            path: "/components/jsonEditor",
            key: "components/jsonEditor",
          },
        ],
      },
      {
        component: "Excel",
        path: "/excel",
        key: "excel",
        icon: "excel",
        sub: [
          {
            component: "导出excel",
            path: "/excel/export",
            key: "excel/export",
          },
        ],
      },
      {
        component: "系统管理",
        path: "/system",
        key: "system",
        icon: "system",
        sub: [
          {
            component: "用户管理",
            path: "/system/users",
            key: "/system/users",
          },
          {
            component: "权限管理",
            path: "/system/auth",
            key: "/system/auth",
          },
        ],
      },
    ];
  } else if (roleType === "2") {
    result.data.menus = [
      {
        component: "表格",
        path: "/table",
        key: "table",
        icon: "table",
        sub: [
          // {
          //   component: '基本表格',
          //   path: '/table/basicTable',
          //   key: '/table/basicTable'
          // },
          {
            component: "可编辑行表格",
            path: "/admin/chapter",
            key: "admin/chapter",
          },
          {
            component: "拖拽排序表格",
            path: "/table/dragSortingTable",
            key: "table/dragSortingTable",
          },
        ],
      },
      {
        component: "组件",
        path: "/components",
        key: "components",
        icon: "components",
        sub: [
          {
            component: "富文本编辑器",
            path: "/components/richText",
            key: "/components/richText",
          },
        ],
      },
      {
        component: "系统管理",
        path: "/system",
        key: "system",
        icon: "dashboard",
        sub: [
          {
            component: "用户管理",
            path: "/system/users",
            key: "/system/users",
          },
          {
            component: "权限管理",
            path: "/system/auth",
            key: "/system/auth",
          },
        ],
      },
    ];
  }

  result.data.menus.unshift({
    component: "系统首页",
    path: "/welcome",
    key: "dashboard",
    icon: "dashboard",
    sub: [],
  });

  result.data.menus.push({
    component: "404页",
    path: "/404",
    key: "404",
    icon: "404",
    sub: [],
  });

  return result;
};

export default getMenus;
