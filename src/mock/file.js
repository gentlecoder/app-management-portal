/**
 * Created by dyc on 2017/9/30.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/9/30 15:14
 * @Copyright(©) 2017 by dyc.
 *
 */

import Mock from 'mockjs'
import {port_code, port_file} from 'common/port_uri'

Mock.mock(new RegExp(port_file.image_upload), {
  code: port_code.success,
  msg: "图片上传成功",
  data: {
    'id|10-100': 1,
    "name": "@ctitle",
    "image": "@image"
  }
})

Mock.mock(new RegExp(port_file.json_upload), {
  code: port_code.success,
  msg: "文件上传成功",
  data: {}
})
