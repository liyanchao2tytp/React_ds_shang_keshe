/*
 * @Author: lyc
 * @Date: 2020-12-02 17:42:31
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-05 01:40:36
 * @Description: file content
 */

import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Row, Col, Avatar, Divider, } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import servicePath from "../config/apiUrl"
import Descripter from "../components/Descripter"
import AuthorSign from "../components/AuthorSign"
import "../static/css/components/Author.css"
export default function Author(porps) {
  const [emp, setEmp] = useState({

  });

  useEffect(() => {
    const token = localStorage.getItem("token")
    Axios({
      method: "post",
      url: servicePath.user,
      withCredentials: true,
      headers: { "token": token }
    }).then(
      (res) => {
        setEmp(res.data.usrdetail)
        console.log(res.data.usrdetail);
        console.log(emp);
      }
    )
  }, [])
  return (
    <>
      <Row >
        <Col span={7} style={{ backgroundColor: "white", height: "40rem" }}>
          <div style={{ textAlign: "center", padding: "2rem 0 1rem 0 " }}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 90, xxl: 105 }}
              icon={<UserOutlined />}
            />
          </div>
          <AuthorSign />
          <Col offset={3}>
            <Descripter />
          </Col>
          <Divider></Divider>


        </Col>
        <Col span={15} offset={1} style={{ backgroundColor: "white", height: "40rem" }}>

        </Col>
      </Row>


    </>
  )
}