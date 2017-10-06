/**
 * Created by dyc on 2017/10/2.
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/10/2 11:05
 * @Copyright(©) 2017 by dyc.
 *
 */

import Mock from 'mockjs'
import {port_code, port_app} from 'common/port_uri'

const data_list = {
  'srv_list|1-4': [{
    'bp_tenant_id': '@first',
    'create_by': '@first',
    'created_at': '@datetime',
    'deploy_name': '@first',
    'deploy_status': 'deploy_ok',
    'run_status': 'running',
    'version': 'latest'
  }],
  'ms_list|1-4':[{
    'bp_ms_name':'@first',
    'create_by':'@first',
    'deploy_name':'@first',
    'deploy_status':'deploy_ok',
    'deploy_type':'dc',
    'kind':'dc',
    'run_status':'running',
    'version':'2.0'
  }]
};

Mock.mock(new RegExp(port_app.list), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功！',
    data: {
      result: data_list,
      page: 1,
    }
  })
});

Mock.mock(new RegExp(port_app.start), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '启动成功！',
  })
});

Mock.mock(new RegExp(port_app.stop), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '停止成功！',
  })
});

Mock.mock(new RegExp(port_app.del), ({url}) => {
  return Mock.mock({
    code: port_code.success,
    msg: '删除成功！',
  })
});
