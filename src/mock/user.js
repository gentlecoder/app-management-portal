/**
 * Created by dyc on 2017/9/30.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/9/30 10:55
 * @Copyright(©) 2017 by dyc.
 *
 */

import Mock from 'mockjs'
import {port_code, port_user} from 'common/port_uri'

Mock.mock(new RegExp(port_user.login), ({body}) => {
  const {username, password} = JSON.parse(body)
  if (username === 'admin' && password === 'admin') {
    return Mock.mock({
      code: port_code.success,
      msg: "登录成功",
      data: {
        'name': '@cname',
        'avatar': 'static/images/user.jpg',
        'age|20-25': 20,
        'desc': '@csentence()'
      }
    })
  } else {
    return Mock.mock({
      code: port_code.error,
      msg: "账号或密码错误"
    })
  }
})

Mock.mock(new RegExp(port_user.logout), {
  code: port_code.success,
  msg: "退出成功"
})
