/*
 * @Author: lyc
 * @Date: 2020-12-07 14:01:40
 * @LastEditors: lyc
 * @LastEditTime: 2021-06-15 17:43:03
 * @Description: file content
 */
import React, { useEffect, useState, useRef } from "react";
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
  Modal,
  Input,
  Form,
  InputNumber,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "../static/css/components/EmpList.css";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;
export default function UserPower() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //骨架屏是否加载
  const [visible, setVisible] = useState(false);
  const [refresh, setRef] = useState(0);
  const [form] = Form.useForm();
  const [num, setNum] = useState(0);
  const [merchId, setId] = useState(0); // 判断是添加还是修改

  const extraI = useRef(0)   //当前第几个

  useEffect(() => {
    getList();
  }, [refresh]);
  const getList = () => {

    Axios({
      method: "get",
      url: servicePath.getUser,
      withCredentials: true
    }).then((res) => {
      setList(res.data.userList);
      console.log(res.data);
      setIsLoading(false);
      setNum(res.data.num);
    });
  }
  const gotoPage = (page, size) => {
    Axios({
      method: "get",
      // url: `${servicePath.getEmp}?page=${page}&size=${pageSize}`,
      url: servicePath.getUser,
      params: {
        page,
        size
      },
      withCredentials: true
    }).then((res) => {
      setList(res.data.userList);
      setIsLoading(false);
    });
    extraI.current = (page - 1) * size
  }
  /**
   * @description: 显示弹窗
   * @param {*}
   * @return {*}
   */
  const showModal = () => {
    setVisible(true);
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
   * @description: 表单提交后的回调函数
   * @param {value} async 表单内键值对对象
   * @return {*}
   */
  const onFinish = (value) => {
    // 如果 merchId不为0，就修改数据
    if (merchId) {
      value.id = merchId;
      Axios({
        method: "put",
        url: servicePath.user,
        data: value,
        withCredentials: true,
      }).then(() => (refresh ? setRef(0) : setRef(1)));
    } else {
      //增加一条数据
      console.log(value);
      Axios({
        method: "post",
        url: servicePath.user,
        data: value,
        withCredentials: true,
      }).then(() => (refresh ? setRef(0) : setRef(1)));
    }
    setVisible(false);
    form.resetFields();
  };
  /**
   * @description: 点击修改后 显示弹窗和表单
   *                将查询出来的数据于表单绑定
   * @param {*} async
   * @return {*}
   */
  const alterCounter = async (id) => {
    console.log(id);
    const res = await Axios({
      method: "get",
      params: { id },
      url: servicePath.user,
      withCredentials: true,
    });

    form.setFieldsValue({
      // 将查出的值 与表单绑定
      name: res.data.userName,
      word: res.data.passWord,
      power: res.data.career,
      post: res.data.post
    });

    setId(res.data.id);
    setVisible(true);
  };
  /**
   * @description: 删除柜台商品信息
   * @param {*}
   * @return {*}
   */
  const delCounter = (id) => {
    confirm({
      title: "确定要删除该用户吗？",
      content: "删除后，柜台中用户的信息将不能恢复",
      onOk() {
        Axios({
          method: "delete",
          url: servicePath.user,
          data: { id },
          withCredentials: true,
        }).then(() => (refresh ? setRef(0) : setRef(1)));
        message.success("删除成功");
      },
      onCancel() {
        message.info("取消成功");
      },
    });
  };

  /**
   * @description: 显示未签到的用户列表
   * @param {*} async
   * @return {*}
   */
  const showNoSignIn = async () => {

    const res = await Axios({
      method: "GET",
      url: servicePath.noSign,
      withCredentials: true
    });
    setList(res.data);
    extraI.current = 0;
    document.getElementById('pagenitoer').style.display = 'none';
    let aDiv = document.getElementsByClassName('uname');
    for (let i = 0; i < aDiv.length; i++) {
      aDiv[i].style.color = "red";
    }

  }
  return (
    <>
      <Modal
        title="登录用户管理"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="horizontal" name="basic" form={form} onFinish={onFinish}>
          <Form.Item
            label="登录名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入登录名!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
            name="word"
            rules={[
              {
                required: true,
                message: "请输入登录密码!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="权&nbsp;&nbsp;&nbsp;&nbsp;限"
            name="power"
            rules={[
              {
                required: true,
                message: "请输入用户权限!",
              },
            ]}
          >
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item
            label="职&nbsp;&nbsp;&nbsp;&nbsp;位"
            name="post"
            rules={[
              {
                required: true,
                message: "请输入当前用户的职位!",
              },
            ]}
          >
            <Input />
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
            style={{ color: "#D9D9D9" }}
            onClick={showModal}
          />
          <Button
            danger
            onClick={showNoSignIn}>
            未签到名单
            </Button>
          <List
            header={
              <Row className="list-div">
                <Col span={3}>
                  <b>编号</b>
                </Col>
                <Col span={3}>
                  <b>用户名</b>
                </Col>
                <Col span={2}>
                  <b>签次数</b>
                </Col>
                <Col span={5}>
                  <b>密码</b>
                </Col>

                <Col span={3}>
                  <b>权限</b>
                </Col>

                <Col span={3}>
                  <b>职位</b>
                </Col>
                <Col span={5}>
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
                    <Col span={3}>
                      <b>{extraI.current + index + 1}</b>
                    </Col>
                    <Col span={3}>
                      <b className='uname'>{item.userName}</b>
                    </Col>
                    <Col span={2}>
                      <b>{item.num}</b>
                    </Col>
                    <Col span={5}>
                      <b>{item.passWord}</b>
                    </Col>
                    <Col span={2}>
                      <b>{item.career}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.post}</b>
                    </Col>

                    <Col span={5}>
                      <Space>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            alterCounter(item.id);
                          }}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          type="primary"
                          danger
                          shape="round"
                          onClick={() => {
                            delCounter(item.id);
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
          <div id='pagenitoer'>
            <ConfigProvider locale={zhCN}>
              <Pagination
                total={num}
                hideOnSinglePage={true}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                onChange={(page, pageSize) => gotoPage(page, pageSize)}
                style={{ textAlign: "center", paddingTop: "50px" }}
              />
            </ConfigProvider>
          </div>
        </Col>
      </Row>
    </>
  );
}
