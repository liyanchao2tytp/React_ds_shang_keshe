/*
 * @Author: lyc
 * @Date: 2020-12-02 17:42:31
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-07 17:13:32
 * @Description: file content
 */

import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Row, Col, Avatar, Divider, Tag } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import servicePath from "../config/apiUrl"
import Descripter from "../components/Descripter"
import AuthorSign from "../components/AuthorSign"
import "../static/css/components/Author.css"

export default function Author(porps) {
  const [emp, setEmp] = useState({

  });

  useEffect(() => {
    const token = localStorage.getItem("token")
    // Axios({
    //   method: "get",
    //   url: servicePath.user,
    //   withCredentials: true,
    //   headers: { "token": token }
    // }).then(
    //   (res) => {
    //     setEmp(res.data.usrdetail)
    //     console.log(res.data);
    //     console.log(emp);
    //   }
    // )
  }, [])
  return (
    <>
      <Row >
        <Col span={7} style={{ backgroundColor: "white", height: "40rem" }}>
          <div style={{ textAlign: "center", padding: "2rem 0 1rem 0 " }}>

            <Avatar
              style={{ backgroundColor: '#1890ff' }}
              icon={<AntDesignOutlined />}
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 90, xxl: 105 }}
            />
          </div>
          <AuthorSign />
          <Col offset={3}>
            <Descripter />
          </Col>
          <Divider dashed={true}></Divider>

          <div style={{ position: "relative", left: "2rem" }}>
            <h3>标签</h3>
            <Tag color="magenta">有想法的</Tag>
            <Tag color="red">专注设计</Tag>
            <Tag color="volcano">海纳百川</Tag>
            <Tag color="orange">Antd</Tag>
          </div>

        </Col>
        <Col span={15} offset={1} style={{ backgroundColor: "white", height: "40rem" }}>

        </Col>
      </Row>


    </>
  )
}