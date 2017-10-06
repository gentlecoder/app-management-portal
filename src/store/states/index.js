/**
 * Created by dyc on 2017/9/30.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/9/30 16:04
 * @Copyright(©) 2017 by dyc.
 *
 */

import {cookieStorage} from 'common/storage'

export default {
  //用户信息和是否登录
  user_info: cookieStorage.get('user_info'),
  sidebar: {
    collapsed: false,
    show:true,
  }
}
