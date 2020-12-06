/*
 * @Author: lyc
 * @Date: 2020-12-01 16:15:24
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-06 12:02:35
 * @Description: file content
 */
let ipUrl = 'http://127.0.0.1:8080/'

let servicePath = {
  checkLogin: ipUrl + 'login',              // 登录
  goods: ipUrl + 'goods',                   // 商品
  getGoodsList: ipUrl + 'goods/list',       // 查看所有货物
  fuzzyGoods: ipUrl + 'goods/fuzzy',        // 根据商品名 模糊查询
  user: ipUrl + 'usr',                      //  用户
  supplier: ipUrl + 'supplier',
  getSupplier: ipUrl + 'supplier/list',     // 查询所有供应商
  toRecycle: ipUrl + 'recycle',             // 放入回收站
  getEmp: ipUrl + 'emp/list',               // 查询所有雇员
  Emp: ipUrl + 'emp',                       // 雇员
  storeToCounter: ipUrl + 'storeToCounter', // 商品到柜台
  counter: ipUrl + 'counter',               // 柜台
}
export default servicePath;