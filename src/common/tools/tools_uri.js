/**
 * @file: tools_uri.
 * @intro: uri编码工具类.
 * @author: dyc.
 * @email: 610249080@qq.com.
 * @Date: 2017/9/30 14:03.
 * @Copyright(©) 2017 by dyc.
 *
 */

export default new class Uri {
  constructor() {
  }

  //URI 解码
  decode(value) {
    return decodeURIComponent(value)
  }

  //URI 编码
  encode(value) {
    return encodeURIComponent(value)
  }
}
