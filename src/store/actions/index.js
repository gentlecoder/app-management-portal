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

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  //设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, userinfo) {
    commit(mutations.SET_USER_INFO, userinfo)
  },
  [actions.SET_SIDE_BAR]({commit}, opened) {
    commit(mutations.TOGGLE_SIDEBAR, opened)
  }
}
