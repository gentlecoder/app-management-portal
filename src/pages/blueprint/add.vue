<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="蓝图名:" prop="name">
              <el-input v-model="form.name" placeholder="请输入蓝图名" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="版本号:" prop="version">
              <el-input v-model="form.version" placeholder="请输入版本号" style="width: 444px;"></el-input>
            </el-form-item>
            <el-form-item label="服务类型:" prop="type">
              <el-select v-model="form.type" placeholder="请选择服务类型" style="width: 444px;">
                <el-option label="微服务" value="微服务"></el-option>
                <el-option label="服务" value="服务"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="蓝图文件:" prop="blueprintFile">
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList">
                <el-button icon="upload" style="width: 444px;">导入蓝图文件</el-button>
                <div slot="tip" class="el-upload__tip">请选择json文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox-group v-model="form.blueprintType">
                <el-checkbox label="发布为公共蓝图" name="blueprintType"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="">
              <el-input type="textarea" v-model="form.blueprintJson" :rows="8" placeholder="导入蓝图"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">上传</el-button>
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
  import {port_file} from 'common/port_uri'

  export default {
    data() {
      return {
        form: {
          name: '',
          version: '',
          type: '',
          blueprintType: '',
          blueprintJson: ''
        },
        uploadUrl: port_file.json_upload,
        fileList: [],
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{
            required: true,
            message: '以a-z或0-9开始、结束，仅限下列字符：a-z 0-9 _ - . 长度1-64',
            trigger: 'blur',
            pattern: /^[a-z 0-9]{1}[a-z 0-9 _ - .]{0,62}[a-z 0-9]$/
          }],
          version: [{
            required: true,
            message: '以字母或数字开始，仅限下列字符: a-z A-Z 0-9 - _ . 长度1-64',
            trigger: 'blur',
            pattern: /^[a-z A-Z 0-9]{1}[a-z A-Z 0-9 - _ .]{0,63}/
          }],
          type: [{
            required: true,
            message: '请选择服务类型',
            trigger: 'change'
          }]
        }
      }
    },
    created() {
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        let reader = new FileReader();
        let _this = this;
        reader.onload = function () {
          _this.form.blueprintJson = this.result;
        };
        reader.readAsText(file.raw);
      },
      //提交
      on_submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_blueprint.save(this.form)
            .then(({msg}) => {
              this.$message.success(msg)
              setTimeout(this.$router.back(), 500)
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
  .el-upload {
    .el-button {
      color: #1778e6
    }
  }
</style>
