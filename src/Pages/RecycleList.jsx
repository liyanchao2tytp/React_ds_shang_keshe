import React, { useState, useEffect } from "react";
import {
  List,
  Row,
  Col,
  Modal,
  message,
  Button,
  Space,
  Skeleton,
  Pagination,
  Badge,
  ConfigProvider,
  Input,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import axios from "axios";
import servicePath from "../config/apiUrl";
import {
  DeleteOutlined,
  AudioOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "../static/css/GoodsList.css";
import "../static/css/ArticleList.css";

const { confirm } = Modal;
const { Search } = Input;

function RecycleList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [goodsId, setId] = useState();
  const [refresh, setRef] = useState(0);
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  useEffect(() => {
    getList();
  }, [refresh]);
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.toRecycle,
    }).then((res) => {
      setList(res.data);
      setIsLoading(false);
    });
  };

  /**
   * @description: 跳到指定页
   * @param {*}
   * @return {*}
   */
  const gotoPage = () => {};
  /**
   * @description: 将货物放入回收站
   * @param {*}
   * @return {*}
   */
  const delGoods = (id) => {
    confirm({
      title: "确定要删除这个货物吗？",
      content: "删除后，货物信息将无法找回",
      onOk() {
        axios({
          method: "delete",
          url: `${servicePath.goods}`,
          data: { id },
          withCredentials: true,
        }).then((res) => {
          message.success("删除成功");
          getList();
        });
      },
      onCancel() {
        message.info("取消成功");
      },
    });
  };

  /**
   * @description: 撤回到货物列表中
   * @param {*}
   * @return {*}
   */
  const ToGoods = (id, deid = 0) => {
    axios({
      method: "put",
      url: `${servicePath.toRecycle}`,
      data: {
        id,
        yn_goto_recycle: deid,
      },
      withCredentials: true,
    }).then((res) => {
      message.success("撤回成功");
      getList();
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px 40px 60px 40px",
      }}
    >
      <List
        header={
          <Row className="list-div">
            <Col span={2}>
              <b>编号</b>
            </Col>
            <Col span={4}>
              <b>商品名称</b>
            </Col>
            <Col span={3}>
              <b>商品价格</b>
            </Col>
            <Col span={3}>
              <b>商品数量</b>
            </Col>
            <Col span={3}>
              <b>警告数量</b>
            </Col>
            <Col span={5}>
              <b>供应商</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <Skeleton loading={isLoading}>
            <List.Item>
              <Row className="list-div">
                <Col span={2}>
                  <b>{index + 1}</b>
                </Col>

                <Col span={4}>
                  <b>{item.goodsName}</b>
                  {item.goodsNum <= item.warnNum ? (
                    <Badge
                      size="small"
                      title="缺少个数"
                      count={item.warnNum - item.goodsNum}
                      offset={[3, -13]}
                    ></Badge>
                  ) : (
                    ""
                  )}
                </Col>
                <Col span={3}>
                  <b>{item.goodsPrice}</b>
                </Col>
                <Col span={3}>
                  <b>{item.goodsNum}</b>
                </Col>
                <Col span={3}>
                  <b>{item.warnNum}</b>
                </Col>

                <Col span={5}>
                  {item.supplier.supName} — {item.supplier.supContact}
                </Col>
                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      shape="round"
                      ghost
                      onClick={() => {
                        ToGoods(item.goodsId);
                      }}
                    >
                      <RollbackOutlined />
                    </Button>
                    <Button
                      type="primary"
                      danger
                      shape="round"
                      onClick={() => {
                        delGoods(item.goodsId);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          </Skeleton>
        )}
      />

      <ConfigProvider locale={zhCN}>
        <Pagination
          total={100}
          hideOnSinglePage={true}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={(page, pageSize) => gotoPage(page, pageSize)}
          style={{ textAlign: "center", paddingTop: "40px" }}
        />
      </ConfigProvider>
    </div>
  );
}

export default RecycleList;
