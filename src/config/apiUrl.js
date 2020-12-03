/*
 * @Author: lyc
 * @Date: 2020-12-01 16:15:24
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-03 12:01:19
 * @Description: file content
 */
let ipUrl = 'http://127.0.0.1:8080/'

let servicePath = {
  checkLogin: ipUrl + 'login',  //登录
  goods: ipUrl + 'goods', //商品
  getGoodsList: ipUrl + 'goods/list', //查看所有货物
  user: ipUrl + 'usr',    //  用户
  getSupplier: ipUrl + 'supplier/list', //查询所有供应商
  toRecycle: ipUrl + 'recycle',    // 放入回收站
}
export default servicePath;