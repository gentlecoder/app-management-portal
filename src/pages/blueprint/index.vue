<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'blueprintAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">导入蓝图</el-button>
      </router-link>
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
          prop="name"
          label="蓝图名称"
          align="center"
          min-width="400">
        </el-table-column>
        <el-table-column
          prop="type"
          label="服务类型"
          align="center"
          min-width="200">
          <template scope="props">
            <span v-text="props.row.tag == 'service' ? 'service' : 'microservice'"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本"
          align="center"
          min-width="200">
          <template scope="props">
            <span v-text="props.row.versions.length + '个版本'"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          min-width="280">
          <template scope="props">
            <router-link :to="{name: 'blueprintDeploy', params: {name: props.row.name}}" tag="span">
              <el-button type="info" size="small" icon="edit">部署</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
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
        this.$fetch.api_blueprint.list({
          page: this.currentPage,
          length: this.length
        })
          .then(({data: {result, page}}) => {
            this.table_data = result.list
            this.currentPage = page
            this.total = result.list.length
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
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
            this.$fetch.api_blueprint.del(item)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success({
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
            this.$fetch.api_blueprint.batch_del(this.batch_select)
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

</style>
