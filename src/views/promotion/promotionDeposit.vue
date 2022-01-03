<template>
  <div class="box flex flex-direction position-re">
    <div class="flex align-center rdx-p-t-10 rdx-p-b-30">
      <span class="my-title-tag rdx-m-r-12"></span>
      <span class="font-strong">提现</span>
    </div>
    <div class="flex justify-between align-end">
      <div class="flex sales-bg align-center rdx-p-tb-20 rdx-p-lr-30">
        <img :src="user.icon" class="head-img" >
        <div class="flex rdx-light-color flex-direction rdx-p-l-30">
          <span class="rdx-font-20">{{user.nick_name}}</span>
          <span class="rdx-font-14 rdx-line-height-26">{{user.vip_pack_name}}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between line-bottom rdx-p-b-14 align-end">
      <div class="flex align-end rdx-m-t-24">
        <span class="rdx-font-14">可提现金额</span>
        <span class="rdx-font-24 rdx-p-lr-4 rdx-line-height-24">0.00</span>
        <span class="rdx-font-14">元</span>
        <span class="rdx-font-14 rdx-p-l-80">总收入金额</span>
        <span class="rdx-font-24 rdx-p-lr-4 rdx-line-height-24">0.00</span>
        <span class="rdx-font-14">元</span>
        <span class="rdx-font-14 rdx-p-l-80">可提现金额</span>
        <span class="rdx-font-24 rdx-p-lr-4 rdx-line-height-24">0.00</span>
        <span class="rdx-font-14">元</span>
      </div>
      <div class="pro-sales button-a" @click="clickDep">提现</div>
    </div>
    <div class="flex align-center rdx-p-t-30 rdx-p-b-20">
      <span class="my-title-tag rdx-m-r-12"></span>
      <span class="font-strong">提现记录</span>
    </div>
    <el-table stripe :data="withdrawalList">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column prop="apply_amount" label="提现金额" align="center">
      </el-table-column>
      <el-table-column prop="apply_account" label="收款卡号" align="center"></el-table-column>
      <el-table-column prop="create_time" label="提交时间" align="center"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
      <el-table-column prop="apply_status" label="状态" align="center"></el-table-column>
    </el-table>
    <div class="align-center rdx-m-t-14" style="text-align: center; border-radius: 5px"
      v-if="withdrawalTotal!=''">
      <el-pagination background layout="prev, pager, next" :total="withdrawalTotal"
        :page-size="withdrawalParams.size" @current-change="handleWithdrawalCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="integral" width="500px">
      <template slot="title">
        <div>
          <span class="font-strong rdx-font-16 rdx-main-color rdx-m-r-14">提现</span>
          <span class="rdx-font-12 rdx-content-color">(每月仅限一次)</span>
        </div>
      </template>
      <div class="flex align-center rdx-m-b-30 rdx-m-l-30">
        <span class="rdx-primary">*</span>
        <span class="rdx-font-14 rdx-content-color rdx-m-r-14">提现金额：</span>
        <span class="rdx-font-14 rdx-main-color">
          <el-input type="text" v-model="tiMoney" style="width: 110px;"></el-input>
          <span class="rdx-m-l-10">元</span>
        </span>
        <span class="rdx-font-14 rdx-content-color rdx-m-l-10">可提现{{walletData.left_withdraw_amount}}元</span>
      </div>
      <div class="flex align-center rdx-m-b-30 rdx-m-l-30">
        <div class="rdx-primary">*</div>
        <div class="rdx-font-14">支付宝账号：</div>
        <el-input type="text" placeholder="请输入支付宝账号" style="width: 296px;" v-model="val.zfbname"></el-input>
      </div>
      <div class="flex align-center rdx-m-b-24 rdx-m-l-30">
        <div class="rdx-primary">*</div>
        <div class="rdx-font-14">收款人姓名：</div>
        <el-input type="text" placeholder="请输入收款人姓名" style="width: 296px;" v-model="val.skrname"></el-input>
      </div>
      <div class="rdx-primary-bg rdx-light-color flex justify-center rdx-font-16 button-a with_audit"
        @click="clickAudit">提交审核</div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import noData from '../../components/noData.vue'
  export default {
    components: {
      noData
    },
    data() {
      return {
        integral: false,
        tiMoney: 0,
        walletData: '',
        withdrawalList: [],
        withdrawalTotal:0,
        withdrawalParams:"",
        val: {
          zfbname: '',
          skrname: '',
        },
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      this.getWithdrawalList()
    },
    methods: {
      //提现记录的分页
      handleWithdrawalCurrentChange(val) {
        this.withdrawalParams.page = val
        this.getWithdrawalList()
      },
      //提现弹窗
      clickDep() {
        this.integral = true
      },
      clickAudit() {
        this.addWithdrawal()
      },
      //提现页面数据展示
      async getWallet() {
        const {
          data
        } = await this.$get('/api/user/getWallet')
        if (data != undefined) {
          this.walletData = data
        }
      },
      //提现记录
      async getWithdrawalList() {
        var param = {
          "userId": this.user.user_id,
          "page": this.withdrawalParams.page,
          "size": this.withdrawalParams.size,
        }
        const {
          data
        } = await this.$get('/api/push/getWithdrawalList', param)
        if (data != undefined) {
          this.withdrawalList = data.list
          this.withdrawalList.forEach((item) => {
            item.create_time = tools.time_cycle(1, (item.create_time / 1000))
            item.update_time = tools.time_cycle(1, (item.update_time / 1000))
          })
          this.withdrawalTotal = data.page_info.total
        }
      },
      //提现审核
      async addWithdrawal() {
        var param = {
          "amount": this.tiMoney,
          "mobile": '15170066873',
          "account": this.val.zfbname,
          "realName": this.val.skrname,
        }
        const {
          data
        } = await this.$post('/api/push/addWithdrawal', param)
        if (data.data == 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.integral = false
        }
        console.log('data', data)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
  .with_audit {
    width: 155px;
    border-radius: 5px;
    padding: 12px 40px;
    margin: 0 auto;
  }
</style>
