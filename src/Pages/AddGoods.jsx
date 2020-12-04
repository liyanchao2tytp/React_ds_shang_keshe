import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  message,
  Skeleton,
} from "antd";
import Axios from "axios";
import servicePath from "../config/apiUrl";
export default function AddGoods(props) {
  const [componentSize, setComponentSize] = useState("default");
  const [suppliers, setSuppliers] = useState([]);
  const [goodsId, setGoodsId] = useState(0); //  货物ID，如果是 0 说明是增加 ，其他就代表修改
  const [goodsName, setName] = useState(""); //  货物名
  const [goodsPrice, setPrice] = useState(); //  价格
  const [goodsNum, setNum] = useState(); //  数量
  const [sup, setSup] = useState(); // 供应商 id
  const [alarmNum, setAlarm] = useState(); //  警告数量
  const [isLoading, setIsLoading] = useState(true);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  var id = props.match.params.id; //获取货物id，如果有就是修改，没有就是插入

  /**
   * @description: 根据是否存在id判断是插入还是更新
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    getSupplier();
    if (id) {
      setGoodsId(id);
      getGoodsById(id);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log("-----sup-----");
      console.log(sup);
      console.log("-----suppliers-----");
      console.log(suppliers);
    };
  }, []);
  /**
   * @description: 获取所有供货商
   * @param {*}
   * @return {*}
   */
  const getSupplier = async () => {
    const res = await Axios(servicePath.getSupplier);
    console.log("---getSupplier---");
    console.log(res);
    setSuppliers(res.data);
  };
  /**
   * @description: 根据id查询对应的货物
   * @param {id}
   * @return {*}
   */
  const getGoodsById = async (id) => {
    const res = await Axios({
      url: `${servicePath.goods}/${id}`,
      method: "get",
      withCredentials: true,
    });
    console.log(res);

    setPrice(res.data.goodsPrice); // 价格
    setNum(res.data.goodsNum); // 数量
    setName(res.data.goodsName); // 货物名
    setAlarm(res.data.warnNum); // 警告数量
    setSup(res.data.supId);
    setIsLoading(false);
  };

  /**
   * @description: 表单提交时侯的校验函数
   * @param {*}
   * @return {*}
   */
  const onFinish = (value) => {
    console.log("----onFinish----");
    console.log(value);

    // id == 0 ? addGoods(value) : alterGoods(value);
    id ? alterGoods(value) : addGoods(value);
  };
  const alterGoods = (value) => {
    value.id = goodsId;
    const res = Axios({
      method: "put",
      url: servicePath.goods,
      data: value,
      withCredentials: true,
    });
    props.history.push("/home/list");
  };
  const addGoods = (value) => {
    Axios({
      method: "post",
      url: servicePath.goods,
      data: value,
      withCredentials: true,
    })
      .then(() => {
        message.success("添加成功");
      })
      .catch(() => {
        message.error("添加失败");
      });
  };

  const selectedSupplier = (value, option) => {
    console.log(option);
    // setSup(value);
    console.log(sup);
  };
  return (
    <div style={{ backgroundColor: "white", padding: "60px 0 40px 0" }}>
      <Skeleton active loading={isLoading} title paragraph>
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
            initialValue={goodsName}
            name="goods_name"
            rules={[
              {
                required: true,
                message: "请输入货物名称",
              },
            ]}
          >
            <Input onChange={(v) => setName(v)} />
          </Form.Item>

          <Form.Item
            label="价格"
            rules={[
              {
                required: true,
                message: "请设置价格",
              },
            ]}
          >
            <Form.Item
              noStyle
              name="goods_price"
              initialValue={goodsPrice}
              rules={[
                {
                  required: true,
                  message: "请设置价格",
                },
              ]}
            >
              <InputNumber min={0} onChange={(v) => setPrice(v)} />
            </Form.Item>
            <span className="antd-form-text" style={{ margin: "0 0 0 0.5rem" }}>
              元
            </span>
          </Form.Item>

          <Form.Item
            label="数量"
            name="goods_num"
            initialValue={goodsNum}
            rules={[
              {
                required: true,
                message: "请输入货物数量",
              },
            ]}
          >
            <InputNumber min={0} onChange={(v) => setNum(v)} />
          </Form.Item>
          <Form.Item
            label="供应商"
            name="goods_supplier"
            initialValue={sup}
            rules={[
              {
                required: true,
                message: "请选择供应商",
              },
            ]}
          >
            <Select onChange={selectedSupplier}>
              {suppliers.map((v, i) => (
                <Select.Option value={v.supId} key={v.supId}>
                  {v.supName +
                    "——————" +
                    v.supContact +
                    "——————" +
                    v.supPhone +
                    "——————" +
                    v.adress}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="警告数量"
            name="calarm_num"
            initialValue={alarmNum}
            rules={[
              {
                required: true,
                message: "请设置警告数量",
              },
            ]}
          >
            <InputNumber min={0} onChange={(v) => setAlarm(v)} />
          </Form.Item>
          <Form.Item {...{ wrapperCol: { offset: 8 } }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
}
