/**
 * Created by dyc on 2017/10/8.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/10/8 10:19
 * @Copyright(©) 2017 by dyc.
 *
 */

import Mock from 'mockjs'
import {port_code, port_log} from 'common/port_uri'

const data_list = {
  'list|2-6': [{
    'date': '@datetime',
    'type': 'INFO',
    'log': '@sentence(10, 20)'
  }]
};

Mock.mock(new RegExp(port_log.search), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功！',
    data: {
      result: data_list,
    }
  })
});
