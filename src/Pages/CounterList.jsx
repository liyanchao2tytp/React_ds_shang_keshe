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
  Badge,
  Select,
  Statistic,
  Typography,
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
const { Option } = Select;
const { Title } = Typography;
const { confirm } = Modal;
export default function CounterList() {
  const [list, setList] = useState([]);
  const inNum = useRef(0);
  const [statistic, setStatistic] = useState(0);
  const [temp, setTemp] = useState({});
  const [isLoading, setIsLoading] = useState(true); //骨架屏是否加载
  const [visible, setVisible] = useState(false);
  const [refresh, setRef] = useState(0);
  const [form] = Form.useForm();

  const [merchId, setId] = useState(0); // 判断是添加还是修改

  // 此处控制出售弹窗
  const [isSellModalVisible, setIsSellModalVisible] = useState(false);

  const showSellModal = () => {
    setIsSellModalVisible(true);
  };

  const handleSellOk = () => {
    Axios({
      method: "put",
      url: servicePath.counter,
      withCredentials: true,
      data: {
        id: temp.merchId,
        name: temp.counterName,
        price: temp.salePrice,
        num: temp.counterNum - inNum.current,
        alarm: temp.calarmNum,
      },
    }).then(() => (refresh ? setRef(0) : setRef(1)));
    setIsSellModalVisible(false);
  };

  const handleSellCancel = () => {
    setIsSellModalVisible(false);
  };
  // 此处结束控制出售弹窗

  useEffect(() => {
    Axios(servicePath.counter).then((res) => {
      setList(res.data);
      console.log(res.data);
      setIsLoading(false);
    });
    console.log(list);
  }, [refresh]);

  const gotoPage = () => {};
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
        url: servicePath.counter,
        data: value,
        withCredentials: true,
      }).then(() => (refresh ? setRef(0) : setRef(1)));
    } else {
      //增加一条数据
      Axios({
        method: "post",
        url: servicePath.counter,
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
      url: `${servicePath.counter}/${id}`,
      withCredentials: true,
    });
    form.setFieldsValue({
      // 将查出的值 与表单绑定
      name: res.data.counterName,
      price: res.data.salePrice,
      num: res.data.counterNum,
      alarm: res.data.calarmNum,
    });

    setId(res.data.merchId);
    setVisible(true);
  };
  /**
   * @description: 删除柜台商品信息
   * @param {*}
   * @return {*}
   */
  const delCounter = (id) => {
    confirm({
      title: "确定要删除该商品吗？",
      content: "删除后，柜台中商品的信息将不能恢复",
      onOk() {
        Axios({
          method: "delete",
          url: servicePath.counter,
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
  const onSelectChange = (value) => {
    list.map((item) => {
      if (item.counterName === value) {
        setTemp(item);
      }
      return 0;
    });
    count();
  };
  const count = () => {
    let sta = inNum.current * temp.salePrice;
    setStatistic(sta);
  };
  const onNumChange = (value) => {
    inNum.current = value;
    console.log(inNum);
    count();
  };
  return (
    <>
      <Modal
        title="柜台管理"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="horizontal" name="basic" form={form} onFinish={onFinish}>
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入雇员姓名!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="销售价格"
            name="price"
            rules={[
              {
                required: true,
                message: "请输入雇员联系方式!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="剩余数量"
            name="num"
            rules={[
              {
                required: true,
                message: "请输入剩余数量!",
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
          <List
            header={
              <Row className="list-div">
                <Col span={2}>
                  <b>编号</b>
                </Col>
                <Col span={4}>
                  <b>商品名</b>
                </Col>
                <Col span={4}>
                  <b>销售价格</b>
                </Col>
                <Col span={4}>
                  <b>剩余数量</b>
                </Col>
                <Col span={4}>
                  <b>警告数量</b>
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
                      <b>{item.counterName}</b>
                      {item.counterNum <= item.calarmNum && (
                        <Badge
                          size="small"
                          title="缺少个数"
                          count={item.calarmNum - item.counterNum}
                          offset={[3, -13]}
                        ></Badge>
                      )}
                    </Col>
                    <Col span={4}>
                      <b>{item.salePrice}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.counterNum}</b>
                    </Col>
                    <Col span={4}>
                      <b>{item.calarmNum}</b>
                    </Col>

                    <Col span={6}>
                      <Space>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            alterCounter(item.merchId);
                          }}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          type="primary"
                          danger
                          shape="round"
                          onClick={() => {
                            delCounter(item.merchId);
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <Pagination
                total={100}
                hideOnSinglePage={true}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                onChange={(page, pageSize) => gotoPage(page, pageSize)}
                style={{ flex: "9" }}
              />
              <Button
                type="primary"
                style={{ flex: "1" }}
                onClick={showSellModal}
              >
                出售商品
              </Button>
              <Modal
                title="待出售商品"
                visible={isSellModalVisible}
                onOk={handleSellOk}
                onCancel={handleSellCancel}
              >
                <Title level={4}>待出售商品：</Title>
                <Select
                  defaultValue=""
                  listHeight="500"
                  style={{ width: 120 }}
                  onChange={onSelectChange}
                  allowClear
                >
                  {list.map((item,index) => {
                    return (
                      <Option key={index} value={item.counterName}>
                        {item.counterName}
                      </Option>
                    );
                  })}
                </Select>
                <Title level={4}>出售数量：</Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputNumber
                    //   size="large"
                    min={1}
                    max={temp.counterNum} // 当前货物最大值
                    defaultValue={1}
                    onChange={onNumChange}
                  />
                  <span
                    style={{
                      color: "GrayText",
                    }}
                  >
                    当前库存有：{temp.counterNum}
                  </span>
                </div>
                <Title level={4}>可赚得：</Title>
                <Statistic title="" precision={2} value={statistic} />
              </Modal>
            </div>
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
}
// import React, { useEffect, useState } from "react";
// import {
//   List,
//   Row,
//   Col,
//   ConfigProvider,
//   message,
//   Button,
//   Space,
//   Skeleton,
//   Pagination,
//   Modal,
//   Input,
//   Form,
//   InputNumber,
//   Badge,
// } from "antd";
// import zhCN from "antd/lib/locale/zh_CN";
// import "../static/css/components/EmpList.css";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   PlusCircleOutlined,
// } from "@ant-design/icons";
// import Axios from "axios";
// import servicePath from "../config/apiUrl";
// const { confirm } = Modal;
// export default function CounterList() {
//   const [list, setList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); //骨架屏是否加载
//   const [visible, setVisible] = useState(false);
//   const [visSale, setSale] = useState(false);
//   const [refresh, setRef] = useState(0);
//   const [form] = Form.useForm();

//   const [merchId, setId] = useState(0); // 判断是添加还是修改

//   useEffect(() => {
//     Axios(servicePath.counter).then((res) => {
//       setList(res.data);
//       console.log(res.data);
//       setIsLoading(false);
//     });
//   }, [refresh]);

//   const gotoPage = () => {};
//   /**
//    * @description: 显示弹窗
//    * @param {*}
//    * @return {*}
//    */
//   const showModal = () => {
//     setVisible(true);
//   };

//   /**
//    * @description: 关闭弹窗
//    * @param {*}
//    * @return {*}
//    */
//   const handleCancel = () => {
//     console.log("Clicked cancel button");
//     setVisible(false);
//   };
//   /**
//    * @description: 表单提交后的回调函数
//    * @param {value} async 表单内键值对对象
//    * @return {*}
//    */
//   const onFinish = (value) => {
//     // 如果 merchId不为0，就修改数据
//     if (merchId) {
//       value.id = merchId;
//       Axios({
//         method: "put",
//         url: servicePath.counter,
//         data: value,
//         withCredentials: true,
//       }).then(() => (refresh ? setRef(0) : setRef(1)));
//     } else {
//       //增加一条数据
//       Axios({
//         method: "post",
//         url: servicePath.counter,
//         data: value,
//         withCredentials: true,
//       }).then(() => (refresh ? setRef(0) : setRef(1)));
//     }
//     setVisible(false);
//     form.resetFields();
//   };
//   /**
//    * @description: 点击修改后 显示弹窗和表单
//    *                将查询出来的数据于表单绑定
//    * @param {*} async
//    * @return {*}
//    */
//   const alterCounter = async (id) => {
//     console.log(id);
//     const res = await Axios({
//       method: "get",
//       url: `${servicePath.counter}/${id}`,
//       withCredentials: true,
//     });

//     form.setFieldsValue({
//       // 将查出的值 与表单绑定
//       name: res.data.counterName,
//       price: res.data.salePrice,
//       num: res.data.counterNum,
//       alarm: res.data.calarmNum,
//     });

//     setId(res.data.merchId);
//     setVisible(true);
//   };
//   /**
//    * @description: 删除柜台商品信息
//    * @param {*}
//    * @return {*}
//    */
//   const delCounter = (id) => {
//     confirm({
//       title: "确定要删除该商品吗？",
//       content: "删除后，柜台中商品的信息将不能恢复",
//       onOk() {
//         Axios({
//           method: "delete",
//           url: servicePath.counter,
//           data: { id },
//           withCredentials: true,
//         }).then(() => (refresh ? setRef(0) : setRef(1)));
//         message.success("删除成功");
//       },
//       onCancel() {
//         message.info("取消成功");
//       },
//     });
//   };
//   /**
//    * @description: 销售
//    * @param {*}
//    * @return {*}
//    */
//   const handleSale = (id) => {
//     Axios({
//       method: "post",
//       url: servicePath.order,
//       data: { id },
//       withCredentials: true,
//     }).then((res) => {
//       console.log(res);
//     });
//   };

//   return (
//     <>
//       <Modal
//         title="柜台管理"
//         visible={visible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form layout="horizontal" name="basic" form={form} onFinish={onFinish}>
//           <Form.Item
//             label="商品名称"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入雇员姓名!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="销售价格"
//             name="price"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入雇员联系方式!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>
//           <Form.Item
//             label="剩余数量"
//             name="num"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入剩余数量!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>

//           <Form.Item
//             label="警告数量"
//             name="alarm"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入警告数量!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>

//           <Form.Item
//             {...{ wrapperCol: { offset: 10 } }}
//             style={{ padding: "2rem 0 0 0" }}
//           >
//             <Button type="primary" htmlType="submit">
//               确定
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* ---------------------第二个表单---------------------- */}
//       <Modal
//         title="出售"
//         visible={visSale}
//         onCancel={handleCancel2}
//         footer={null}
//       >
//         <Form layout="horizontal" name="basic" form={form} onFinish={onFinish2}>
//           <Form.Item
//             label="商品名称"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入雇员姓名!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="销售价格"
//             name="price"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入雇员联系方式!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>
//           <Form.Item
//             label="剩余数量"
//             name="num"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入剩余数量!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>

//           <Form.Item
//             label="警告数量"
//             name="alarm"
//             rules={[
//               {
//                 required: true,
//                 message: "请输入警告数量!",
//               },
//             ]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>

//           <Form.Item
//             {...{ wrapperCol: { offset: 10 } }}
//             style={{ padding: "2rem 0 0 0" }}
//           >
//             <Button type="primary" htmlType="submit">
//               确定
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       {/* --------------------------结束---------------------------- */}

//       <Row>
//         <Col
//           span={20}
//           offset={2}
//           style={{
//             backgroundColor: "white",
//             padding: "40px 50px 60px 50px",
//             borderRadius: "25px",
//           }}
//         >
//           <PlusCircleOutlined
//             className="add__icon"
//             style={{ color: "#D9D9D9" }}
//             onClick={showModal}
//           />

//           <List
//             header={
//               <Row className="list-div">
//                 <Col span={2}>
//                   <b>编号</b>
//                 </Col>
//                 <Col span={4}>
//                   <b>商品名</b>
//                 </Col>
//                 <Col span={4}>
//                   <b>销售价格</b>
//                 </Col>
//                 <Col span={4}>
//                   <b>剩余数量</b>
//                 </Col>
//                 <Col span={4}>
//                   <b>警告数量</b>
//                 </Col>
//                 <Col span={6}>
//                   <b>操作</b>
//                 </Col>
//               </Row>
//             }
//             bordered
//             // style={{width:}}
//             dataSource={list}
//             renderItem={(item, index) => (
//               <Skeleton loading={isLoading}>
//                 <div onClick={() => handleSale(item.merchId)}>
//                   <Badge.Ribbon
//                     text="出售"
//                     style={{ backgroundColor: "#C0C0C0" }}
//                   />
//                 </div>
//                 <List.Item>
//                   <Row className="list-div">
//                     <Col span={2}>
//                       <b>{index + 1}</b>
//                     </Col>
//                     <Col span={4}>
//                       <b>{item.counterName}</b>
//                       {item.counterNum <= item.calarmNum && (
//                         <Badge
//                           size="small"
//                           title="缺少个数"
//                           count={item.calarmNum - item.counterNum}
//                           offset={[3, -13]}
//                         ></Badge>
//                       )}
//                     </Col>
//                     <Col span={4}>
//                       <b>{item.salePrice}</b>
//                     </Col>
//                     <Col span={4}>
//                       <b>{item.counterNum}</b>
//                     </Col>
//                     <Col span={4}>
//                       <b>{item.calarmNum}</b>
//                     </Col>

//                     <Col span={6}>
//                       <Space>
//                         <Button
//                           type="primary"
//                           shape="round"
//                           onClick={() => {
//                             alterCounter(item.merchId);
//                           }}
//                         >
//                           <EditOutlined />
//                         </Button>
//                         <Button
//                           type="primary"
//                           danger
//                           shape="round"
//                           onClick={() => {
//                             delCounter(item.merchId);
//                           }}
//                         >
//                           <DeleteOutlined />
//                         </Button>
//                       </Space>
//                     </Col>
//                   </Row>
//                 </List.Item>
//               </Skeleton>
//             )}
//           />

//           <ConfigProvider locale={zhCN}>
//             <Pagination
//               total={100}
//               hideOnSinglePage={true}
//               showSizeChanger
//               showQuickJumper
//               showTotal={(total) => `共 ${total} 条`}
//               onChange={(page, pageSize) => gotoPage(page, pageSize)}
//               style={{ textAlign: "center", paddingTop: "50px" }}
//             />
//           </ConfigProvider>
//         </Col>
//       </Row>
//     </>
//   );
// }
