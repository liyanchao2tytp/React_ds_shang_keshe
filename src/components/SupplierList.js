/*
 * @Author: lyc
 * @Date: 2020-12-03 15:06:36
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-05 01:34:50
 * @Description: file content
 */
import React, { useEffect, useState } from "react";
import {
  List,
  Row,
  Col,
  ConfigProvider,
  message,
  Button,
  Space,
  Skeleton,
  Pagination,
  Form,
  Modal,
  Input
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/components/SupplierList.css"
export default function SupplierList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   //骨架屏是否加载
  const [visible, setVisible] = useState(false);     // 弹框展开或关闭
  const [refresh, setRef] = useState(0)             // 是否刷新
  const [form] = Form.useForm();
  const [supId, setId] = useState(0)               // 判断是添加还是修改

  useEffect(() => {
    Axios(servicePath.getSupplier).then((res) => {
      console.log(res.data)
      setList(res.data);
      setIsLoading(false);
    });
  }, [refresh]);
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const onFinish = (value) => {
    console.log(supId);
    if (supId) {
      console.log(supId);
      value.id = supId
      Axios({
        method: "put",
        url: servicePath.supplier,
        data: value,
        withCredentials: true
      })
    } else {
      Axios({
        method: "post",
        url: servicePath.supplier,
        data: value,
        withCredentials: true
      })
    }

    setVisible(false)
    form.resetFields();
    refresh ? setRef(0) : setRef(1)
  }
  /**
    * @description: 点击修改后 显示弹窗表单 
    *                将查询出来的数据于表单绑定
    * @param {*} async
    * @return {*}
    */
  const alterSup = async (id) => {
    console.log(id);
    const res = await Axios({
      method: "get",
      url: `${servicePath.supplier}/${id}`,
      withCredentials: true,
    })

    form.setFieldsValue({   // 将查出的值 与表单绑定
      supplier: res.data.supName,
      contact: res.data.supContact,
      phone: res.data.supPhone,
      address: res.data.adress
    })
    setId(res.data.supId)

    setVisible(true)
  }
  const gotoPage = () => { };
  return (
    <>
      <Modal
        title="添加供应商"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          layout="horizontal"
          name="basic"
          form={form}
          onFinish={onFinish}
        // preserve={false}
        >
          <Form.Item
            label="用户名"
            name="supplier"
            rules={[
              {
                required: true,
                message: '请输入供应商名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系人"
            name="contact"
            rules={[{
              required: true,
              message: "请输入联系人姓名"
            },]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入供应商联系方式!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地&nbsp;&nbsp;&nbsp;&nbsp;址"
            name="address"
            rules={[
              {
                required: true,
                message: '请输入所在地址!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item {...{ wrapperCol: { offset: 10 } }} style={{ padding: "2rem 0 0 0" }}>
            <Button type="primary" htmlType="submit">
              确定
        </Button>
          </Form.Item>
        </Form>

      </Modal>

      <Row>
        <Col
          span={20}
          offset={2}
          style={{
            backgroundColor: "white",
            padding: "40px 50px 60px 50px",
            borderRadius: "25px",
          }}
        >
          <PlusCircleOutlined
            className="add__icon"
            style={{ color: '#D9D9D9' }}
            onClick={() => setVisible(true)}
          />
          <List
            header={
              <Row className="list-div">
                <Col span={2}>
                  <b>编号</b>
                </Col>
                <Col span={4}>
                  <b>供应商</b>
                </Col>
                <Col span={4}>
                  <b>联系人</b>
                </Col>
                <Col span={4}>
                  <b>电话</b>
                </Col>
                <Col span={4}>
                  <b>地址</b>
                </Col>
                <Col span={6}>
                  <b>操作</b>
                </Col>
              </Row>
            }
            bordered
            // style={{width:}}
            dataSource={list}
            renderItem={(item, index) => (
              <Skeleton loading={isLoading}>
                <List.Item>
                  <Row className="list-div">
                    <Col span={2}>
                      <b>{index + 1}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.supName}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.supContact}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.supPhone}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.adress}</b>
                    </Col>
                    <Col span={6}>
                      <Space>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            alterSup(item.supId)
                          }}
                        >
                          <EditOutlined />
                          修改
                        </Button>
                        <Button
                          type="primary"
                          danger
                          shape="round"
                          onClick={() => {
                            // delArticle(item.goodsId);
                          }}
                        >
                          <DeleteOutlined />
                          删除
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
              style={{ textAlign: "center", paddingTop: "50px" }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
}
