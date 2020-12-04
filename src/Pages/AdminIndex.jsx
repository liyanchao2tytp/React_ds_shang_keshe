import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { Route } from "react-router-dom";
import GoodsList from "./GoodsList";
import RecycleList from "./RecycleList";
import AddGoods from "./AddGoods";
import Author from "../components/Author";
import EmpList from "../components/EmpList";
import SupplierList from "../components/SupplierList";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleOther = (e) => {
    switch (e.key) {
      case "usr":
        props.history.push("/home/self");
        break;
      // case ''
    }
  };

  // 商品库存管理
  const handleGoodsStore = (e) => {
    switch (e.key) {
      case "addGoods":
        props.history.push("/home/add");
        break;
      case "goodsList":
        props.history.push("/home/list");
        break;
      case "recycleList":
        props.history.push("/home/recycle");
        break;
    }
  };
  // 用户管理
  const handleAdmin = (e) => {
    console.log(e);
    switch (e.key) {
      case "admin-emp":
        props.history.push("/home/admin/emp");
        break;
      case "admin-supplier":
        props.history.push("/home/admin/sup");
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleOther}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub"
            icon={<DesktopOutlined />}
            title="用户管理"
            onClick={handleAdmin}
          >
            <Menu.Item key="admin-emp">雇员管理</Menu.Item>
            <Menu.Item key="admin-supplier">供应商管理</Menu.Item>
          </SubMenu>

          <Menu.Item key="usr" icon={<UserOutlined />}>
            个人信息
          </Menu.Item>

          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="库存管理"
            onClick={handleGoodsStore}
          >
            <Menu.Item key="addGoods">添加商品</Menu.Item>
            <Menu.Item key="goodsList">商品列表</Menu.Item>
            <Menu.Item key="recycleList">回收站</Menu.Item>
          </SubMenu>

          <Menu.Item key="9" icon={<FileOutlined />}>
            <span>进货管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Route path="/home/add" exact component={AddGoods}></Route>
            <Route path="/home/self" exact component={Author}></Route>
            <Route path="/home/list/" component={GoodsList}></Route>
            <Route path="/home/add/:id" exact component={AddGoods}></Route>
            <Route path="/home/recycle" exact component={RecycleList}></Route>
            <Route path="/home/admin/emp" exact component={EmpList}></Route>
            <Route
              path="/home/admin/sup"
              exact
              component={SupplierList}
            ></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design + React</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
