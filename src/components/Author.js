/*
 * @Author: lyc
 * @Date: 2020-12-02 17:42:31
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-03 08:06:45
 * @Description: file content
 */

import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Row, Col, Avatar, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import servicePath from "../config/apiUrl"
import style from '../static/css/components/Author.module.css'
export default function Author(porps) {
  const [emp, setEmp] = useState({
    empId: "",
    empName: "",
    empPhone: "",
    empPost: ""
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
      <Row>
        <Col>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
          />
          <b></b>


        </Col>
        <Col >

        </Col>
      </Row>


    </>
  )
}