import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import AddArticle from "./AddGoods";
import { Route } from "react-router-dom";
import { OmitProps } from "antd/lib/transfer/ListBody";
import GoodsList from "./GoodsList";
import RecycleList from "./RecycleList";
import AddGoods from "./AddGoods";
import Author from "../components/Author";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleOther = (e) => {
    console.log(e);
    switch (e.key) {
      case "usr":
        props.history.push("/home/self");
        break;
      // case ''
    }
  };

  // 商品库存管理菜单
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
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <span>添加文章</span>
          </Menu.Item>
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
            <span>留言管理</span>
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
            <Route path="/home" exact component={AddArticle}></Route>
            <Route path="/home/add" exact component={AddGoods}></Route>
            <Route path="/home/self" exact component={Author}></Route>
            <Route path="/home/list/" component={GoodsList}></Route>
            <Route path="/home/add/:id" exact component={AddArticle}></Route>
            <Route path="/home/recycle" exact component={RecycleList}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design + React</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
