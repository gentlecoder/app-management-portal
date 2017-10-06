/**
 * @file: user.
 * @intro: 用户请求数据配置.
 * @author: dyc.
 * @email: 610249080@qq.com.
 * @Date: 2017/9/30 15:18.
 * @Copyright(©) 2017 by dyc.
 *
 */

import fetch from 'common/fetch'
import {port_user} from 'common/port_uri'

//登录
export function login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    data
  })
}

//登出
export function logout() {
  return fetch({
    url: port_user.logout,
    method: 'post'
  })
}

//保存
export function save() {
  return fetch({
    url: port_user.save,
    method: 'post'
  })
}

//更换密码
export function changePwd() {
  return fetch({
    url: port_user.changePwd,
    method: 'post'
  })
}
