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
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  [type.TOGGLE_SIDEBAR] (state, collapsed) {
    if (collapsed == null) collapsed = !state.sidebar.collapsed;
    state.sidebar.collapsed = collapsed;
  },
  [type.TOGGLE_SIDEBAR_SHOW] (state,show) {
    if (show == null) state.sidebar.show = !state.sidebar.show;
    else{
      state.sidebar.show = show;
    }
  },
}
