import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select, InputNumber, message } from "antd";
import Axios from "axios";
import servicePath from "../config/apiUrl";
export default function AddGoods() {
  const [componentSize, setComponentSize] = useState("default");
  const [supplier, setSupplier] = useState([]);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    Axios(servicePath.getSupplier).then((res) => {
      setSupplier(res.data);
    });
  }, []);
  console.log(supplier);

  const onFinish = (value) => {
    console.log(value);
    Axios({
      method: "post",
      url: servicePath.goods,
      data: value,
    })
      .then(() => {
        message.success("添加成功");
      })
      .catch(() => {
        message.error("添加失败");
      });
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="表单大小" name="size">
          <Radio.Group>
            <Radio.Button value="small">小</Radio.Button>
            <Radio.Button value="default">中</Radio.Button>
            <Radio.Button value="large">大</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="货物名"
          name="goods_name"
          rules={[
            {
              required: true,
              message: "请输入货物名称",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="价格"
          name="goods_price"
          rules={[
            {
              required: true,
              message: "请设置价格",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="数量"
          name="goods_num"
          rules={[
            {
              required: true,
              message: "请输入货物数量",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="供应商"
          name="goods_supplier"
          rules={[
            {
              required: true,
              message: "请选择供应商",
            },
          ]}
        >
          <Select>
            {supplier.map((v, i) => (
              <Select.Option value={v.supId} key={i + v.supName}>
                {v.supName} —————— {v.supContact} —————— {v.supPhone} ——————{" "}
                {v.adress}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="警告数量"
          name="calarm_num"
          rules={[
            {
              required: true,
              message: "请设置警告数量",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item {...{ wrapperCol: { offset: 8 } }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
