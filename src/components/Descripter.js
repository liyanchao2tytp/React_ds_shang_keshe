/*
 * @Author: lyc
 * @Date: 2020-12-03 19:13:16
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-05 20:54:12
 * @Description: file content
 */
import React from "react"
import { Space } from 'antd'
import { UserOutlined, QqOutlined, HomeOutlined } from '@ant-design/icons';

export default (props) => (
  <>
    <div style={{ padding: "1rem 0 0 0" }}>
      <Space direction="vertical" size="small">
        <div style={{ margin: "0 0 5px 0" }}>
          <QqOutlined style={{ padding: "0 12px 0 0 " }} />
          <span>934781829</span>
        </div>
        <div style={{ margin: "0 0 5px 0" }}>
          {/* 职业 */}
          <UserOutlined style={{ padding: "0 12px 0 0 " }} />
          <span>lyc</span>
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