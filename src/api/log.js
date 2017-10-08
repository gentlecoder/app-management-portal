/**
 * Created by dyc on 2017/10/8.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/10/8 10:16
 * @Copyright(©) 2017 by dyc.
 *
 */

import fetch from 'common/fetch'
import {port_log} from 'common/port_uri'

//数据列表
export function search(params) {
  return fetch({
    url: port_log.search,
    method: 'get',
    params
  })
}
