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
            <el-form-item label="旧密码:" prop="oldPwd">
              <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧密码" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPwd">
              <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码:" prop="newPwdRepeat">
              <el-input v-model="form.newPwdRepeat" type="password" placeholder="请再次输入新密码" style="width: 444px;"></el-input>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.form.newPwdRepeat !== '') {
            this.$refs.form.validateField('newPwdRepeat');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          name: 'zte',
          oldPwd: '',
          newPwd: '',
          newPwdRepeat: '',
        },
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          newPwd: [{ validator: validatePass, trigger: 'blur' }],
          newPwdRepeat: [{ validator: validatePass2, trigger: 'blur' }],
        }
      }
    },
    methods: {
      //提交
      on_submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false;
          this.on_submit_loading = true;
          this.$fetch.api_user.changePwd(this.form)
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
