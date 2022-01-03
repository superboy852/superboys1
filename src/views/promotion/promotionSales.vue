<template>
  <div class="box flex flex-direction position-re">
    <div class="flex align-center rdx-p-t-10 rdx-p-b-30">
      <span class="my-title-tag rdx-m-r-12"></span>
      <span class="font-strong">推广分销</span>
    </div>
    <div class="flex justify-between align-end">
      <div class="flex sales-bg align-center rdx-p-tb-20 rdx-p-lr-30">
        <img :src="user.icon" class="head-img" >
        <div class="flex rdx-light-color flex-direction rdx-p-l-30">
          <span class="rdx-font-20">{{user.nick_name}}</span>
          <span class="rdx-font-14 rdx-line-height-26">{{user.vip_pack_name}}</span>
        </div>
      </div>
      <div class="rdx-content-color">拉新延长天数：0天</div>
    </div>
    <el-table :data="distributionData" class="rdx-m-t-20">
      <template slot="empty">
        <div class="rdx-font-14 flex flex-direction align-center rdx-m-t-80 rdx-m-b-50">
          <img src="../../assets/imgs/pro_no.png" style="width: 187px; height: 185px;" >
          <div style="color: #B1B3BC;">还没推广过？去<span class="rdx-primary button-a" @click="inviteFriends = true">邀请好友</span></div>
        </div>
      </template>
      <el-table-column label="客户名称" prop="nickname"></el-table-column>
      <el-table-column align="center" prop="createTime" label="注册时间"></el-table-column>
      <el-table-column align="center" prop="payFrequency" label="付费次数"></el-table-column>
      <el-table-column align="center" prop="payMoney" label="付费金额"></el-table-column>
      <el-table-column align="center" prop="commission" label="返利佣金"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作"></el-table-column>
    </el-table>
    <div class="block rdx-font-14" v-if="distributionTotal!=''">
      <el-pagination background :total="distributionTotal" :page-size="distributionParams.size"
        :page-sizes="[10, 20, 30,]" layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleDistributionSizeChange" @current-change="handleDistributionCurrentChange">
      </el-pagination>
    </div>
    <!-- 邀请好友 -->
    <el-dialog :visible.sync="inviteFriends" width="680px">
      <template slot="title">
        <div>邀请新好友注册</div>
      </template>
      <!--        <div class="rdx-font-17 rdx-main-color" style="margin-top: -30px;">邀请新好友注册</div> -->
      <div class="rdx-content-color">邀请好友注册得300积分，每日封顶1500积分</div>
      <div class="flex justify-between">
        <div class="flex flex-direction rdx-flex-1 rdx-p-r-20">
          <div class="rdx-m-t-24 rdx-m-b-16 rdx-font-17">保存海报发给好友</div>
          <div class="flex w-100">
            <el-carousel :interval="5000" height="470px" class="w-100" arrow="always" :autoplay='autoplayShow'
              indicator-position='none' @change='changeCar'>
              <el-carousel-item v-for="generatePoster in generatePosterData" :key="generatePoster.type">
                <img :src="generatePoster.url" style="width: 100%; height: 470px;">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="flex rdx-flex-1 flex-direction rdx-p-l-20">
          <div class="rdx-font-17 rdx-m-t-30">分享注册链接</div>
          <span class="rdx-font-12 rdx-content-color rdx-m-t-26 rdx-p-14 flex"
            style="background-color: #FDF2F3;">{{locationUrl}}/work/index?shareId={{userData.share_key}}</span>
          <span class="prom-button2 button-a rdx-m-t-14">复制链接 转发好友</span>
          <span class="prom-button2 button-a rdx-m-t-14 rdx-radius-6 rdx-m-t-50" style="width: 118px;"
            @click="downloadPosters">下载海报</span>
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
  import {locationUrl} from '@/config'
export default {
  data(){
    return{
      autoplayShow: false,
      distributionParams:{},
      distributionData:[],
      distributionTotal:'',
      inviteFriends: false,
      generatePosterData:[],
      locationUrl: '',
      userData: {},
      carIndex:'0'
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.locationUrl = locationUrl
    this.getUserDistributionList()
    this.getSharePosters()
    this.getUserInfoDetail()
  },
  methods:{
    //获取分享链接
    async getUserInfoDetail() {
      const {
        data
      } = await this.$get('/api/user/getUserInfoDetail')
      this.userData = data
    },
    downloadPosters() { //下载图片
      this.params.type = this.generatePosterData[this.carIndex].type
      this.params.linkUrl = this.generatePosterData[this.carIndex].url
      this.getGeneratePosters()
    },
    //获取海报下标
    changeCar(e) {
      this.carIndex = e - 1
    },
    //获取海报缩略图
    async getSharePosters() {
      const {
        data
      } = await this.$get('api/user/getSharePosters')
      this.generatePosterData = data.list
    },
    //获取推广分销的数据
    async getUserDistributionList() {
      console.log("112")
      var param = {
        "id": this.user.user_id,
        "page": this.distributionParams.page,
        "size": this.distributionParams.size,
      }
      const {
        data
      } = await this.$get('/api/push/getUserDistributionList', param)
      if (data != undefined) {
        this.distributionData = data.list
        this.distributionData.forEach((item) => {
          item.createTime = tools.time_cycle(1, (item.createTime / 1000))
        })
        this.distributionTotal = data.page_info.total
      }
    },
    //推广分销的分页
    handleDistributionCurrentChange(val) {
      this.distributionParams.page = val
      this.getUserDistributionList()
    },
    handleDistributionSizeChange(val) {
      this.distributionParams.page = 1
      this.distributionParams.size = val
      this.getUserDistributionList()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
</style>
