/*
 * @Author: lyc
 * @Date: 2020-12-01 16:15:24
 * @LastEditors: lyc
 * @LastEditTime: 2021-06-15 17:46:44
 * @Description: file content
 */
// let ipUrl = 'http://127.0.0.1:8080/'
let ipUrl = 'http://localhost:8080/'
// let ipUrl = 'http://47.93.249.50:8080/'
// let ipUrl = 'http://192.168.83.138:8080/'

let servicePath = {
  checkLogin: ipUrl + 'login',              // 登录
  goods: ipUrl + 'goods',                   // 商品
  getGoodsList: ipUrl + 'goods/list',       // 查看所有货物
  fuzzyGoods: ipUrl + 'goods/fuzzy',        // 根据商品名 模糊查询
  user: ipUrl + 'usr',                      // 用户
  getUser: ipUrl + 'usr/list',              // 获取所有用户
  supplier: ipUrl + 'supplier',
  getSupplier: ipUrl + 'supplier/list',     // 查询所有供应商
  toRecycle: ipUrl + 'recycle',             // 放入回收站
  Emp: ipUrl + 'emp',                       // 雇员
  getEmp: ipUrl + 'emp/list',               // 查询所有雇员
  storeToCounter: ipUrl + 'storeToCounter', // 商品到柜台
  counter: ipUrl + 'counter',
  tokenContent: ipUrl + 'user',              // 柜台
  orders: ipUrl + 'order',                   // 订单
  noSign: ipUrl + '/usr/nosign',             // 未签到人的名单
  
}
export default servicePath;