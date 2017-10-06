/**
 * @file: softrsy.
 * @intro: softrsy请求数据配置.
 * @author: dyc.
 * @email: 610249080@qq.com.
 * @Date: 2017/9/30 15:25.
 * @Copyright(©) 2017 by dyc.
 *
 */

import fetch from 'common/fetch'
import {port_softrsy} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_softrsy.list,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_softrsy.get,
    method: 'get',
    params
  })
}

//镜像部署
export function deploy(params) {
  return fetch({
    url: port_softrsy.deploy,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_softrsy.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: port_softrsy.save,
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_softrsy.batch_del,
    method: 'post',
    data
  })
}
