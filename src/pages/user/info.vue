<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="用户名:" prop="name">
              <el-input v-model="get_user_info.user.name" placeholder="请输入用户名" style="width: 444px;" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="登陆用户名:" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入登陆用户名" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="工号:" prop="jobNum">
              <el-input v-model="form.jobNum" placeholder="请输入工号" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="固定电话:" prop="telNum">
              <el-input v-model="form.telNum" placeholder="请输入固定电话号码" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-radio class="radio" v-model="form.status" label="1">未激活</el-radio>
              <el-radio class="radio" v-model="form.status" label="2">已激活</el-radio>
            </el-form-item>
            <el-form-item label="用户类型:" prop="userType">
              <el-radio class="radio" v-model="form.userType" label="1">注册用户</el-radio>
              <el-radio class="radio" v-model="form.userType" label="2">后台配置用户</el-radio>
            </el-form-item>
            <el-form-item label="备注:" prop="remarks">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.remarks">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import {panelTitle} from 'components'
  import {GET_USER_INFO} from 'store/getters/type'

  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    data() {
      return {
        form: {
          name: 'zte',
          loginName: 'zte',
          phone: '12345678910',
          email: 'zte@zte.com',
          jobNum: '10206072',
          telNum: '025-12345678910',
          status: '2',
          userType: '2',
          remarks: 'vue-demo',
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
        }
      }
    },
    methods: {
      //提交
      on_submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false;
          this.on_submit_loading = true;
          this.$fetch.api_user.save(this.form)
            .then(({msg}) => {
              this.$message({
                type: 'success',
                message: msg
              });
              this.on_submit_loading = false
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {panelTitle}
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
