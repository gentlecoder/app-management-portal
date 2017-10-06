 /**
 * Created by dyc on 2017/9/30.
 *
 * 自定义插件
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/9/30 18:29
 * @Copyright(©) 2017 by dyc.
 *
 */
import dateFormat from 'plugins/date'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $dateFormat: {
      get() {
        return dateFormat
      }
    }
  })
}

export default {
  install
}
