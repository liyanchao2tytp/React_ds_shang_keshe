/*
 * @Author: lyc
 * @Date: 2020-12-03 19:13:16
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-03 19:19:35
 * @Description: file content
 */
import React from "react"
import { UserOutlined, QqOutlined, HomeOutlined } from '@ant-design/icons';

export default (props) => (
  <>
    <div style={{ padding: "1rem 0 0 0" }}>
      <div style={{ margin: "0 0 5px 0" }}>
        <QqOutlined style={{ padding: "0 12px 0 0 " }} />
        <span>934781829</span>
      </div>
      <div style={{ margin: "0 0 5px 0" }}>
        {/* 职业 */}
        <UserOutlined style={{ padding: "0 12px 0 0 " }} />
        <span>空姐</span>
      </div>
      <HomeOutlined style={{ padding: "0 12px 0 0 " }} />
      <span>山东济南市</span>
    </div>
    <b></b>
  </>
)