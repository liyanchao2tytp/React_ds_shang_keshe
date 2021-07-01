/*
 * @Author: lyc
 * @Date: 2020-12-02 12:00:17
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-20 13:27:11
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Pages/Main';
import * as serviceWorker from './serviceWorker';
import './index.less'

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
