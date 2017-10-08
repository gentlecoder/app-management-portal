/**
 * @file: index.
 * @intro: api请求索引.
 * @author: dyc.
 * @email: 610249080@qq.com.
 * @Date: 2017/9/30 15:31.
 * @Copyright(©) 2017 by dyc.
 *
 */

//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'
import * as api_softrsy from './softrsy'
import * as api_blueprint from './blueprint'
import * as api_app from './app'
import * as api_log from './log'

const apiObj = {
  api_file,
  api_table,
  api_user,
  api_softrsy,
  api_blueprint,
  api_app,
  api_log
};

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
