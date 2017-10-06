<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="镜像:" prop="imageName">
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
            <el-form-item label="名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="部署实例:">
              <el-input-number v-model="form.instance" @change="handleChange" :min="1" :max="100" style="width: 444px;"></el-input-number>
            </el-form-item>
            <el-form-item label="资源配置:">
              <div class="resource-input">
                Min
                <el-input-number v-model="form.cpu[0]" @change="changeMinCpu" :min="0" :max="10" :step="0.1" style="width: 120px;"></el-input-number>
                Max
                <el-input-number v-model="form.cpu[1]" @change="changeMaxCpu" :min="0" :max="10" :step="0.1" style="width: 120px;"></el-input-number>
              </div>
              <span class="demonstration">CPU(Core)</span>
              <el-slider v-model="form.cpu" range :max="10" :step="0.1"></el-slider>
              <div class="resource-input">
                Min
                <el-input-number v-model="form.memory[0]" @change="changeMinMem" :min="0" :max="10" :step="0.1" style="width: 120px;"></el-input-number>
                Max
                <el-input-number v-model="form.memory[1]" @change="changeMaxMem" :min="0" :max="10" :step="0.1" style="width: 120px;"></el-input-number>
              </div>
              <span class="demonstration">Memory(Gi)</span>
              <el-slider v-model="form.memory" range :max="10" :step="0.1"></el-slider>
            </el-form-item>
            <el-form-item label="独占CPU:">
              <el-input-number v-model="form.aloneCpu" :min="0" :max="100" style="width: 444px;"></el-input-number>
            </el-form-item>
            <el-form-item label="巨页:">
              <el-input-number v-model="form.bigPage" :min="0" :max="100" style="width: 444px;"></el-input-number>
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
      changeMinCpu(value) {
        this.form.cpu = [value, this.form.cpu[1]]
      },
      changeMaxCpu(value) {
        this.form.cpu = [this.form.cpu[0], value]
      },
      changeMinMem(value) {
        this.form.memory = [value, this.form.memory[1]]
      },
      changeMaxMem(value) {
        this.form.memory = [this.form.memory[0], value]
      },
      handleChange(value) {
        console.log(value);
      },
      //获取数据
      get_form_data() {
        this.load_data = true
        this.$fetch.api_softrsy.get({
          name: this.route_name
        })
          .then(({data}) => {
            this.form.imageName = data.result.list[0].reponame + '/' + data.result.list[0].name;
            this.form.name = data.result.list[0].name;
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
          this.$fetch.api_softrsy.deploy(this.form)
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
  .demonstration {
    color: #9f99a8
  }

  .resource-input {
    float: right;
    color: #9f99a8
  }
</style>
