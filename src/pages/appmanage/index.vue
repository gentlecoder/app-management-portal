<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="400">
          <template scope="props">
            <span v-text="props.row.deploy_name"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="deployStatus"
          label="部署状态"
          align="center"
          min-width="200">
          <template scope="props">
            <div :class="props.row.deploy_status == 'deploy_ok' ? 'circle-green' : props.row.deploy_status == 'deploying' ? 'circle-blue' : 'circle-red'"></div>
            <span v-text="props.row.deploy_status == 'deploy_ok' ? '部署成功' : props.row.deploy_status == 'deploying' ? '部署中' : '部署失败'"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="运行状态"
          align="center"
          min-width="200">
          <template scope="props">
            <div :class="props.row.run_status == 'running' ? 'circle-green' : 'circle-red'"></div>
            <span v-text="props.row.run_status == 'running' ? '运行中' : '停止'"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmNum"
          label="告警数"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          min-width="280">
          <template scope="props">
            <!--<router-link :to="{name: 'blueprintDeploy', params: {name: props.row.name}}" tag="span">-->
            <!--<el-button type="info" size="small" icon="edit">部署</el-button>-->
            <!--</router-link>-->
            <el-button type="success" size="small" icon="arrow-right" @click="start(props.row)">启动</el-button>
            <el-button type="warning" size="small" icon="minus" @click="stop(props.row)">停止</el-button>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default {
    data() {
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created() {
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh() {
        this.get_table_data()
      },
      //获取数据
      get_table_data() {
        this.load_data = true
        this.$fetch.api_app.list({
          page: this.currentPage,
          length: this.length
        })
          .then(({data: {result, page}}) => {
            this.table_data = result.list;
            this.currentPage = page;
            this.total = result.list.length;
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //启动
      start(item) {
        this.$confirm('此操作将启动该应用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_app.start(item)
              .then(({msg}) => {
                this.get_table_data();
                this.$message({
                  type: 'success',
                  message: msg
                });
              })
              .catch(() => {
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启动！'
            });
          })
      },
      //停止
      stop(item) {
        this.$confirm('此操作将停止该应用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_app.stop(item)
              .then(({msg}) => {
                this.get_table_data()
                this.$message({
                  type: 'success',
                  message: msg
                });
              })
              .catch(() => {
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消停止！'
            });
          })
      },
      //单个删除
      delete_data(item) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_app.del(item)
              .then(({msg}) => {
                this.get_table_data()
                this.$message({
                  type: 'success',
                  message: msg
                });
              })
              .catch(() => {
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除！'
            });
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val) {
        this.batch_select = val
      },
      //批量删除
      on_batch_del() {
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_app.batch_del(this.batch_select)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .circle-green {
    position: absolute;
    left: 65px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #73cf22;
  }

  .circle-blue {
    position: absolute;
    left: 65px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #20a0ff;
  }

  .circle-red {
    position: absolute;
    left: 65px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ff4949;
  }
</style>
