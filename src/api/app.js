/**
 * Created by dyc on 2017/10/2.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/10/2 11:52
 * @Copyright(©) 2017 by dyc.
 *
 */

import fetch from 'common/fetch'
import {port_app} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_app.list,
    method: 'get',
    params
  })
}

//启动应用
export function start(params) {
  return fetch({
    url: port_app.start,
    method: 'get',
    params
  })
}

//删除应用
export function stop(params) {
  return fetch({
    url: port_app.stop,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_app.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_app.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: port_app.save,
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_app.batch_del,
    method: 'post',
    data
  })
}
