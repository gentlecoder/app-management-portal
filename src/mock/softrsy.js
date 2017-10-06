/**
 * Created by dyc on 2017/10/1.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/10/1 16:11
 * @Copyright(©) 2017 by dyc.
 *
 */
//获取url参数
const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

import Mock from 'mockjs'
import {port_code, port_softrsy} from 'common/port_uri'

const data_list = {
  'list|2-6': [{
    'reponame': '@first',
    'name': '@first',
    'tags|1-3': [{
      'id|0-100': 1,
      'imgtype': ''
    }]
  }]
};

const data_info = {
  'list': [{
    'reponame': '@first',
    'name': '',
    'tags|1-2': [{
      'id|0-100': 20,
      'version': '@pick(["1.0","2.0"])'
    }],
  }]
};

Mock.mock(new RegExp(port_softrsy.list), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      result: data_list,
      page: 1,
    }
  })
});

Mock.mock(new RegExp(port_softrsy.get), ({url}) => {
  const params = parseQueryString(url);
  data_info.list[0].name = params.name;
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      result: data_info,
    }
  })
});

Mock.mock(new RegExp(port_softrsy.deploy), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '部署成功',
    data: {}
  })
});
