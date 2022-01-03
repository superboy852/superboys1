<template>
  <div class="box flex flex-direction position-re">
    <div class="flex align-center rdx-p-t-10 rdx-p-b-30">
      <span class="my-title-tag rdx-m-r-12"></span>
      <span class="font-strong">业绩奖励</span>
    </div>
    <div class="flex justify-between align-end">
      <div class="flex sales-bg align-center rdx-p-tb-20 rdx-p-lr-30">
        <img :src="user.icon" class="head-img" >
        <div class="flex rdx-light-color flex-direction rdx-p-l-30">
          <span class="rdx-font-20">{{user.nick_name}}</span>
          <span class="rdx-font-14 rdx-line-height-26">{{user.vip_pack_name}}</span>
        </div>
      </div>
      <div class="rdx-primary-bg rdx-light-color flex justify-center button-a award_task" @click="clickTask">
        我的任务</div>
    </div>
    <el-table :data="rewardList" class="rdx-m-t-20">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column align="center" label="时间" prop="reward_time"></el-table-column>

      <el-table-column align="center" prop="quarter_target" label="业绩目标"></el-table-column>
      <el-table-column align="center" prop="bonus" label="奖金"></el-table-column>
      <el-table-column align="center" prop="receive_time" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间"></el-table-column>
    </el-table>
    <div class="block" v-if="performanceTotal!=''">
      <el-pagination background :total="performanceTotal" :page-size="performanceParams.size"
        :page-sizes="[10, 20, 30,]" layout="total, sizes, prev, pager, next, jumper"
        @size-change="handlePerformanceSizeChange" @current-change="handlePrformanceCurrentChange">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="task" width="860px">
      <template slot="title">
        <div class="flex">
          <div class="rdx-font-16 rdx-main-color rdx-m-r-6">我的任务</div>
          <div class="rdx-font-12 rdx-content-color flex align-end">任务数<span
              class="rdx-primary rdx-font-14 rdx-m-l-6">{{MissionTotal}}</span></div>
        </div>
      </template>
      <div class="flex flex-wrap rdx-p-t-10">
        <div class="rdx-m-b-14 rdx-m-r-20 wdrw" v-for="(item,index) in MissionList" :key="index">
          <div class="flex rdx-m-b-20 rdx-m-l-12 rdx-p-t-14">
            <div class="rdx-main-color rdx-p-r-10">{{item.time_name}}</div>
            <div class="rdx-primary-light-bg rdx-primary rdx-font-12" style="border-radius: 10px;padding: 2px 10px;"
              :style="item.state=='0'?'background: #F5F5F5;color: #666666':item.state=='1'?'background: #FFDBE0;color: #FF4C65':item.state=='2'?'background: #F5F5F5;color: #666666':'color: #FE9800; background: #FFF7EB;'">
              {{item.state=='0'?'未开始':item.state=='1'?'已完成':item.state=='2'?'未完成':'进行中'}}
            </div>
          </div>
          <div class="flex justify-around rdx-m-b-12 rdx-p-tb-6" style="background: #F8F8F8;"
            v-if="item.target!=null||item.bonus!=null||item.performance!=null">
            <div v-if="item.target!=null">
              <div class="rdx-font-18 rdx-main-color font-strong">{{item.target}}</div>
              <div class="rdx-font-12 rdx-tips-color flex justify-center">业绩目标</div>
            </div>
            <div v-if="item.bonus!=null">
              <div class="rdx-font-18 rdx-main-color font-strong">{{item.bonus}}</div>
              <div class="rdx-font-12 rdx-tips-color flex justify-center">奖励金</div>
            </div>
            <div v-if="item.performance!=null">
              <div class="rdx-font-18 rdx-main-color font-strong">{{item.performance}}</div>
              <div class="rdx-font-12 rdx-tips-color flex justify-center">我的业绩</div>
            </div>
          </div>
          <div class="flex justify-between rdx-m-l-12 rdx-m-r-12 rdx-p-b-10 align-center">
            <div class="rdx-font-12 rdx-tips-color">{{item.receive_time}}至{{item.end_time}}</div>
            <div>
              <span class="rdx-font-14 rdx-tips-color">剩余时间:</span>
              <span
                class="rdx-font-14 rdx-m-l-8 rdx-main-color">{{item.surplus_time==null?'0':item.surplus_time}}天</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import noData from '../../components/noData.vue'
  import * as tools from '@/common/tools.js';
export default {
  components: {
    noData
  },
  data(){
    return{
      MissionList: [],
      rewardList: [],
      task:false,
      performanceTotal:0,
      performanceParams:{},
      MissionTotal: '',
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getPerformanceRewardList()
    this.getMyMissionList()
  },
  methods:{
    //获取任务列表的数据
    async getMyMissionList() {
      var param = {
        "userId": this.user.user_id,
      }
      const {
        data
      } = await this.$post('/api/push/getMyMissionList', param)
      if (data != undefined) {
        this.MissionList = data.data.list
        this.MissionList.forEach((item) => {
          item.receive_time = tools.time_cycle(3, (item.receive_time / 1000))
          item.end_time = tools.time_cycle(3, (item.end_time / 1000))
          item.target = item.target > 10000 ? (item.target / 10000).toFixed(1) + 'w' : item.target
          item.bonus = item.bonus > 10000 ? (item.bonus / 10000).toFixed(1) + 'w' : item.bonus
          item.performance = item.performance > 10000 ? (item.performance / 10000).toFixed(1) + 'w' : item
            .performance
        })
        this.MissionTotal = data.data.page_info.total;
      }
    },
    //代理合作弹窗
    clickTask() {
      this.task = true
    },
    //获取业绩奖励的数据
    async getPerformanceRewardList() {
      var param = {
        "userId": this.user.user_id,
        "page": this.performanceParams.page,
        "size": this.performanceParams.size,
      }
      const {
        data
      } = await this.$post('/api/push/getPerformanceRewardList', param)
      if (data != undefined) {
        this.rewardList = data.data.list
        this.rewardList.forEach((item) => {
          item.reward_time = tools.time_cycle(1, (item.reward_time / 1000))
          item.receive_time = tools.time_cycle(1, (item.receive_time / 1000))
          item.end_time = tools.time_cycle(1, (item.end_time / 1000))
        })
        this.performanceTotal = data.data.page_info.total
      }
    },
    //业绩奖励的分页
    handlePrformanceCurrentChange(val) {
      this.performanceParams.page = val
      this.getPerformanceRewardList()
    },
    handlePerformanceSizeChange(val) {
      this.performanceParams.page = 1
      this.performanceParams.size = val
      this.getPerformanceRewardList()
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
  /deep/.el-table--small td:nth-child(2){color: $rdx-old;}
  /deep/.el-table--small td:nth-child(3){color: $rdx-old;}
</style>
