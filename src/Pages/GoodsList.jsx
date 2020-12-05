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
  Form,
  Badge,
  ConfigProvider,
  InputNumber,
  Input,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import axios from "axios";
import servicePath from "../config/apiUrl";
import { DeleteOutlined, EditOutlined, AudioOutlined } from "@ant-design/icons";
import "../static/css/GoodsList.css";
import Axios from "axios";
const { confirm } = Modal;
const { Search } = Input;

function GoodsList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [goodsId, setId] = useState();
  const [refresh, setRef] = useState(0);
  const [visible, setVisible] = useState(false);
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
      url: servicePath.getGoodsList,
    }).then((res) => {
      console.log(res);
      setList(res.data);
      setIsLoading(false);
    });
  };
  /**
   * @description: 显示表单
   * @param {*}
   * @return {*}
   */
  const showCondal = (id) => {
    setId(id);
    setVisible(true);
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
  const delGoods = (id, deid = 1) => {
    confirm({
      title: "确定要删除这个货物吗？",
      content: "删除后，将放入回收站",
      onOk() {
        axios({
          method: "put",
          url: `${servicePath.toRecycle}`,
          data: {
            id,
            yn_goto_recycle: deid,
            time: new Date().getTime() / 1000,
          },
          withCredentials: true,
        }).then((res) => {
          message.success("文章放入回收站");
          getList();
        });
      },
      onCancel() {
        message.info("取消成功");
      },
    });
  };
  /**
   * @description: 表单提交后的回调函数
   * @param {value}
   * @return {*}
   */
  const onFinish = async (value) => {
    value.id = goodsId;
    const res = await Axios({
      method: "put",
      url: servicePath.storeToCounter,
      data: value,
      withCredentials: true,
    });
    refresh ? setRef(0) : setRef(1);
    message.info(res.data);
    setVisible(false);
  };
  const onSearch = (value) => {
    console.log(value);
  };
  /**
   * @description: 关闭弹窗
   * @param {*}
   * @return {*}
   */
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  /**
   * @description: 更新货物
   * @param {*}
   * @return {*}
   */
  const updateGoods = (id) => {
    props.history.push(`/home/add/${id}`);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px 40px 60px 40px",
      }}
    >
      <Modal
        title="补充柜存"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="horizontal" name="basic" onFinish={onFinish}>
          <Form.Item
            label="上架数量"
            name="num"
            rules={[
              {
                required: true,
                message: "请输入上架数量!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="柜台价格"
            name="price"
            rules={[
              {
                required: true,
                message: "请输入价格!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="警告数量"
            name="alarm"
            rules={[
              {
                required: true,
                message: "请输入警告数量!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            {...{ wrapperCol: { offset: 10 } }}
            style={{ padding: "2rem 0 0 0" }}
          >
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Search
        placeholder="请输入要查询的商品名"
        enterButton="Search"
        size="large"
        suffix={suffix}
        style={{ padding: "0 0 1rem 0" }}
        onSearch={onSearch}
      />

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
            <div onClick={() => showCondal(item.goodsId)}>
              <Badge.Ribbon
                text="上架"
                style={{ backgroundColor: "#C0C0C0" }}
              />
            </div>
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
                      onClick={() => {
                        updateGoods(item.goodsId);
                      }}
                    >
                      <EditOutlined />
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

export default GoodsList;
