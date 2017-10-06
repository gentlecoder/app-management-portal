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
import {port_blueprint} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_blueprint.list,
    method: 'get',
    params
  })
}

//根据name查询数据
export function get(params) {
  return fetch({
    url: port_blueprint.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_blueprint.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: port_blueprint.save,
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_blueprint.batch_del,
    method: 'post',
    data
  })
}
