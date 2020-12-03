import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Space, Skeleton } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
import {
  DeleteOutlined,
  EditOutlined,
  InteractionFilled,
} from "@ant-design/icons";
const { confirm } = Modal;

function RecycleList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRe] = useState(0);
  useEffect(() => {
    getList();
  }, [refresh]);
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getRecycleArticleList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.articleList);
      setIsLoading(false);
    });
  };
  const delArticle = (id) => {
    confirm({
      title: "确定要删除这篇博客文章吗？",
      content: "删除后，你的博客文章将在首页不再显示",
      onOk() {
        axios(`${servicePath.delArticle}/${id}`, {
          withCredentials: true,
        }).then((res) => {
          message.success("文章删除成功");
          getList();
        });
      },
      onCancel() {
        message.info("取消成功");
      },
    });
  };
  const updateArticle = (id) => {
    props.history.push(`/home/add/${id}`);
  };

  const changeIsRecycle = (id, yn_id) => {
    let dataProps = {
      id,
      yn_goto_recycle: yn_id,
    };
    axios({
      method: "post",
      url: `${servicePath.delArticleToRecycle}`,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      refresh ? setRe(0) : setRe(1);
    });
  };

  return (
    <div>
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
                        updateArticle(item.id);
                      }}
                    >
                      <EditOutlined />
                      还原
                    </Button>
                    <Button
                      type="primary"
                      danger
                      shape="round"
                      onClick={() => {
                        delArticle(item.id);
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
    </div>
  );
}
export default RecycleList;