<template>
  <div class="base-box2">
    <div class="flex flex-direction rdx-radius-10 rdx-bg-color rdx-p-b-20">
      <div class="flex justify-between align-center">
        <div class="flex align-center rdx-m-t-20 rdx-m-b-10">
          <div class="nav rdx-p-lr-20" style="border-bottom: 0px;">
            <span class="nav-title">订单类型</span>
          </div>
          <el-select v-model="orderType" placeholder="全部" style="width: 170px; margin-top: -20px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="button-kong rdx-p-lr-30 rdx-m-r-20" style="height: 34px;" @click="onInvoice">开具发票</div>
      </div>
      <div class="sticky-head">
        <el-table v-loading="loading" :data="tableData">
          <template slot="empty">
            <no-data marginTop="0" class="rdx-p-t-30"></no-data>
          </template>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column align="center" prop="order_id" label="订单编号" width="220"></el-table-column>
          <el-table-column align="center" label="产品名称">
            <template slot-scope="scope">
              <span>{{scope.row.pack_name}}{{scope.row.pack_duration}}</span>
            </template>
          </el-table-column>
          <!--        <el-table-column align="center" label="类型">
                <template slot-scope="{ row }">
                  <div v-if="row.pay_type == 1">支付宝支付</div>
                  <div v-if="row.pay_type == 2">微信支付</div>
                </template>
              </el-table-column> -->

          <el-table-column align="center" prop="price" label="支付金额（元）"></el-table-column>
          <!--        <el-table-column align="center" prop="name" label="推荐人">
                <template>
                  <span>--</span>
                </template>
              </el-table-column> -->
          <el-table-column align="center" prop="create_time" label="支付时间"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="{ row }">
              <div v-if="row.pay_status == 1">未支付</div>
              <div v-if="row.pay_status == 2">已支付</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block flex justify-center rdx-p-t-20" v-if="tableData!=''">
          <el-pagination background :total="orderTotal" :page-size="params.size" :page-sizes="[10, 20, 30,]"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handlePerformanceSizeChange"
            @current-change="handlePrformanceCurrentChange">
          </el-pagination>
        </div>
      </div>
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
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '已支付'
        }, {
          value: '3',
          label: '未支付'
        }],
        loading: false,
        val: {
          type: '1'
        },
        tableData: [],
        orderTotal: 0,
        params: {
          size: 10,
          page: 1
        }
      }
    },
    mounted() {
      this.tableList()
    },
    methods: {
      //跳转到开具发票
      onInvoice(){
        this.$router.push({path:'/my/my_invoice'})
      },
      //获取订单数据
      async tableList() {
        const {
          data
        } = await this.$get('/api/user/queryVipOrder', this.params)
        this.tableData = data.list
        this.orderTotal = data.page_info.total
      },
      clickInvoice() {
        this.$router.replace('/my/my_invoice');
      },
      //业绩奖励的分页
      handlePrformanceCurrentChange(val) {
        this.params.page = val
        this.tableList()
      },
      handlePerformanceSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.tableList()
      },
    }
  }
</script>
<style lang="scss" scoped>
  //表格控制
  /deep/.el-table th {
    font-size: 14px;
    background-color: #E7ECF1;
    color: #666666;
    height: 34px;
  }

  /deep/.el-table--small th {
    padding: 0px;
  }

  /deep/.el-table td {
    padding: 12px 0px;
  }

  .base-box2 {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 80px);
  }
</style>
