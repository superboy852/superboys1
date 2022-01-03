<template>
  <div class="base-box">
    <div class="nav">
      <span class="nav-title">子账号管理</span>
      <span class="rdx-font-lg rdx-tips-color rdx-m-l-20">子账号不够？</span>
      <span class="rdx-font-lg rdx-primary">去购买</span>
    </div>
    <div class="base-header">
      <div class="rdx-font-lg rdx-tips-color">
        <i class="el-icon-warning rdx-primary rdx-m-r-10"></i> 请勿进行违规行为，否则可能导致主账号和子账号一同封禁，对您造成损失
      </div>
      <el-button type="primary">添加子账号</el-button>
    </div>

    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30"></no-data>
        </template>
        <el-table-column align="center" prop="name" label="账号"></el-table-column>
        <el-table-column align="center" prop="name" label="到期时间"></el-table-column>
        <el-table-column align="center" prop="name" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue"
  export default {
    components: {
      noData
  },
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  //表格控制
  /deep/.el-table th {
    font-size: 16px;
    background-color: #E7ECF1 !important;
    color: #333333;
    font-weight: bold;
    height: 40px;
  }

  /deep/.el-table .is-sortable .cell {
    top: 3px;
  }

  /deep/.el-table--small {
    font-size: 16px;
  }

  /deep/.el-table--small th,
  .el-table--small td {
    padding: 0px;
  }

  /deep/.el-table--medium th,
  .el-table--medium td {
    padding: 0px;
  }
</style>
