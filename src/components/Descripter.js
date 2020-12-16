/*
 * @Author: lyc
 * @Date: 2020-12-03 19:13:16
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-11 13:03:09
 * @Description: file content
 */
import React, { useEffect } from "react"
import { Space } from 'antd'
import { UserOutlined, QqOutlined, HomeOutlined, FieldStringOutlined } from '@ant-design/icons';

export default (props) => {
  useEffect(() => {
    console.log(props);
  }, [])
  return (
    <>
      <div style={{ padding: "1rem 0 0 0" }}>
        <Space direction="vertical" size="small">

          <div style={{ margin: "0 0 5px 0" }}>
            {/* 职业 */}
            <UserOutlined style={{ padding: "0 12px 0 0 " }} />
            <span>{props.user.name}</span>
          </div>
          <div style={{ margin: "0 0 5px 0" }}>
            <QqOutlined style={{ padding: "0 12px 0 0 " }} />
            <span>934781829</span>
          </div>
          <div style={{ margin: "0 0 5px 0" }}>
            <FieldStringOutlined style={{ margin: "0 13px 0 0" }} />
            <span>{props.user.career}</span>
          </div>
          <div>
            <HomeOutlined style={{ padding: "0 12px 0 0 " }} />
            <span>乌利马尔拉赫蒂妮斯州</span>
          </div>
        </Space>
      </div>
      <b></b>
    </>
  )
}