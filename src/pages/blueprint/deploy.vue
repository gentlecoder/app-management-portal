<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="名称:" prop="name">
              <el-input v-model="form.imageName" placeholder="请输入内容" style="width: 444px;" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="版本:" prop="version">
              <el-select v-model="form.version" placeholder="请选择版本号" style="width: 444px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务访问配置:">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">服务名称:</span>
                  <el-input v-model="serviceName" placeholder="请输入名称" style="width: 150px" :disabled="true"></el-input>
                  <el-checkbox v-model="checked1" class="checkBox"></el-checkbox>
                </div>
                <div v-for="set in serviceSettings" class="text item">
                  {{set}}
                </div>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">服务名称:</span>
                  <el-input v-model="serviceName" placeholder="请输入名称" style="width: 150px" :disabled="true"></el-input>
                  <el-checkbox v-model="checked2" class="checkBox"></el-checkbox>
                </div>
                <div v-for="set in serviceSettings" class="text item">
                  {{set}}
                </div>
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">部署</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default {
    data() {
      return {
        options: [{
          value: '1.0',
          label: '1.0'
        }, {
          value: '2.0',
          label: '2.0'
        }],
        checked1: true,
        checked2: true,
        serviceName: 'tomcat',
        serviceSettings: ['容器端口号：8080', '访问协议类型：HTTP', '可见范围：系统间', '服务原始的URL：/tomcat', '对外端口：自动生成', '服务网络：net_api'],
        form: {
          imageName: 'test/2048',
          version: '1.0',
          name: '2048',
          instance: 1,
          cpu: [0.1, 1],
          memory: [0.1, 1],
          aloneCpu: 0,
          bigPage: 0
        },
        route_name: this.$route.params.name,
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
          version: [{required: true, message: '版本号不能为空', trigger: 'change'}]
        }
      }
    },
    created() {
      // 存在name时 通过name获取相关用户数据
      this.route_name && this.get_form_data()
    },
    methods: {
      //获取数据
      get_form_data() {
        this.load_data = true
        this.$fetch.api_blueprint.get({
          name: this.route_name
        })
          .then(({data}) => {
            this.form.imageName = data.result.list[0].reponame + '/' + data.result.list[0].name;
            let formOptions = [];
            for (let i = 0, len = data.result.list[0].tags.length; i < len; i++) {
              let tmp = {};
              tmp.value = data.result.list[0].tags[i].version;
              tmp.label = data.result.list[0].tags[i].version;
              formOptions.push(tmp)
            }
            this.options = formOptions;
            this.form.version = formOptions[0].value;
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //时间选择改变时
      on_change_birthday(val) {
        this.$set(this.form, 'birthday', val)
      },
      //提交
      on_submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_blueprint.save(this.form)
            .then(({msg}) => {
              this.$message({
                type: 'success',
                message: msg
              });
              setTimeout(this.$router.push({name: 'app'}), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .checkBox {
    float: right;
    zoom: 150%;
  }

  .el-card {
    width: 28.8%;
    float: left;
    margin-right: 20px;
  }
</style>
