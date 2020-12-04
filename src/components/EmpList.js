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
  Modal,
  Input,
  Form,
  InputNumber
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "../static/css/components/EmpList.css"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import servicePath from "../config/apiUrl";
export default function EmpList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //骨架屏是否加载
  const [visible, setVisible] = useState(false);
  const [refresh, setRef] = useState(0)
  const [form] = Form.useForm();

  const [empId, setId] = useState(0)                 // 判断是添加还是修改



  useEffect(() => {
    Axios(servicePath.getEmp).then((res) => {
      setList(res.data);
      setIsLoading(false);
    });
  }, [refresh]);

  const gotoPage = () => { };
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
    console.log('Clicked cancel button');
    setVisible(false);
  };
  /**
   * @description: 表单提交后的回调函数
   * @param {value} async 表单内键值对对象
   * @return {*}
   */
  const onFinish = (value) => {
    if (empId) {  // 如果 empId不为0，就修改文章
      value.id = empId
      Axios({
        method: "put",
        url: servicePath.Emp,
        data: value,
        withCredentials: true
      })
    } else {  // 添加雇员
      Axios({
        method: "post",
        url: servicePath.Emp,
        data: value,
        withCredentials: true
      })
    }

    setVisible(false)
    form.resetFields();
    refresh ? setRef(0) : setRef(1)
  }
  /**
   * @description: 点击修改后 显示弹窗和表单 
   *                将查询出来的数据于表单绑定
   * @param {*} async
   * @return {*}
   */
  const alterEmp = async (id) => {
    console.log(id);
    const res = await Axios({
      method: "get",
      url: `${servicePath.Emp}/${id}`,
      withCredentials: true,
    })

    form.setFieldsValue({   // 将查出的值 与表单绑定
      username: res.data.empName,
      phone: res.data.empPhone,
      post: res.data.empPost
    })
    // form.setF
    setId(res.data.empId)

    setVisible(true)
  }

  return (
    <>
      <Modal
        title="添加雇员"
        visible={visible}

        onCancel={handleCancel}
        footer={null}
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
            name="username"
            rules={[
              {
                required: true,
                message: '请输入雇员姓名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入雇员联系方式!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="职位名"
            name="post"
            rules={[
              {
                required: true,
                message: '请输入雇员职位!',
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
            onClick={showModal}
          />
          <List
            header={
              <Row className="list-div">

                <Col span={4}>
                  <b>编号</b>
                </Col>
                <Col span={4}>
                  <b>雇员姓名</b>
                </Col>
                <Col span={6}>
                  <b>手机号</b>
                </Col>
                <Col span={4}>
                  <b>职位</b>
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

                    <Col span={4}>
                      <b>{index + 1}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.empName}</b>
                    </Col>
                    <Col span={6}>
                      <b>{item.empPhone}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.empPost}</b>
                    </Col>

                    <Col span={6}>
                      <Space>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            alterEmp(item.empId)
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

