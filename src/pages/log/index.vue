<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <div class="block time-picker">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          :picker-options="pickerOptions"
          placeholder="选择时间范围"
          align="right">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>

      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        style="width: 100%"
        :show-header="false">
        <el-table-column
          prop="date"
          label="日期"
          width="220">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="140">
          <template scope="scope">
            <span style="color: #13ce66">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="log"
          label="日志">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: [new Date().getTime() - 3600 * 1000 * 24 * 3, new Date()],
        //请求时的loading效果
        load_data: true,
        //log
        table_data: null
      }
    },
    created() {
      this.search()
    },
    methods: {
      //获取数据
      search() {
        this.load_data = true;
        debugger
        this.$fetch.api_log.search({})
          .then(({data: {result}}) => {
            this.table_data = result.list;
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
    },
    components: {panelTitle}
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .time-picker {
    padding: 0 0 14px 0;
  }
</style>
