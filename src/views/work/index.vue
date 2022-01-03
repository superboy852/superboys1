<template>
  <div class="box">
    <div class="flex work-top flex-direction align-center">
      <div class="flex w-100 justify-center align-center rdx-m-b-26">
        <div class="rdx-m-l-28 button-a":class="val.topSearch == '4' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('4')">达人</div>
        <div class="rdx-m-l-28 button-a" :class="val.topSearch == '7' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('7')">商品</div>
        <div class="rdx-m-l-28 button-a" :class="val.topSearch == '1' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('1')">直播</div>
        <div class="rdx-m-l-28 button-a" :class="val.topSearch == '6' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('6')">小店</div>
        <div class="rdx-m-l-28 button-a" :class="val.topSearch == '5' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('5')">品牌</div>
        <div class="rdx-m-l-28 button-a" :class="val.topSearch == '2' ? 'rdx-radius-6 bg-content2 rdx-p-lr-16 rdx-light-color rdx-line-height-26' : ''" @click="clickSearch('2')">视频</div>
      </div>
      <search-item searchWidth="697" @clickKey='clickKey' :searchType="val.topSearch" :searchPlaceholder="val.topSearchPlace"></search-item>
      <div class="work-living flex flex-direction justify-between">
        <div class="flex w-100 justify-between" >
          <div class="flex flex-direction button-a rdx-flex-1" @click="clickTop('1')">
            <div class="font-strong color-content">
              <span class="rdx-font-36">
                <count-up :delay="val.delay" :endVal="Number(val.amountNew)" :options="options"></count-up>
              </span>
              <span class="rdx-font-32">场</span>
            </div>
            <div class="flex align-center rdx-p-t-20">
              <img src="../../assets/imgs/work_head.png" class="work-living-topImg"/>
              <div class="flex align-center">
                <div class="rdx-m-r-6 rdx-m-l-18"><img src="../../assets/imgs/living_ico_3.gif" style="width: 26px;height: 26px; margin-top: 3px;"/></div>
                <div class="rdx-content-color rdx-m-r-6">流量大盘</div>
                <img src="../../assets/imgs/even.png" style="width: 16px; height: 16px;" />
              </div>
            </div>
          </div>
          <div class="flex flex-direction button-a rdx-flex-1" @click="clickTop('2')" v-if="getData.incFansRankDataNew!=''">
            <div class="font-strong color-content rdx-font-36 rdx-p-l-24">{{getData.incFansRankDataNew.follower_incr}}</div>
            <div class="flex align-center rdx-p-t-20">
              <img :src="getData.incFansRankDataNew.avatar" class="work-living-topImg"/>
              <div class="flex align-center">
                <div class="rdx-content-color rdx-m-r-6 rdx-m-l-18">新增粉丝榜</div>
                <img src="../../assets/imgs/even.png" style="width: 16px; height: 16px;" />
              </div>
            </div>
          </div>
          <div class="flex flex-direction button-a rdx-flex-1" @click="clickTop('3')" v-if="getData.authorSaleRankDataNew!=''">
            <div class="font-strong color-content rdx-font-36 rdx-p-l-24">{{getData.authorSaleRankDataNew.sales_amount}}</div>
            <div class="flex align-center rdx-p-t-20">
              <img :src="getData.authorSaleRankDataNew.avatar" class="work-living-topImg"/>
              <div class="flex align-center">
                <div class="rdx-content-color rdx-m-r-6 rdx-m-l-18">达人带货榜</div>
                <img src="../../assets/imgs/even.png" style="width: 16px; height: 16px;" />
              </div>
            </div>
          </div>
          <div class="flex flex-direction button-a rdx-flex-1" @click="clickTop('4')" v-if="getData.goodsRankDataNew!=''">
            <div class="font-strong color-content rdx-font-36 rdx-p-l-24">{{getData.goodsRankDataNew.amount}}</div>
            <div class="flex align-center rdx-p-t-20">
              <img :src="getData.goodsRankDataNew.image" class="work-living-topImg"/>
              <div class="flex align-center">
                <div class="rdx-content-color rdx-m-r-6 rdx-m-l-18">抖音商品榜</div>
                <img src="../../assets/imgs/even.png" style="width: 16px; height: 16px;" />
              </div>
            </div>
          </div>
          <div class="flex flex-direction button-a rdx-flex-1" @click="clickTop('5')" v-if="getData.realRankDataNew!=''">
            <div class="font-strong color-content rdx-font-36 rdx-p-l-24">{{getData.realRankDataNew.amount}}</div>
            <div class="flex align-center rdx-p-t-20">
              <img :src="getData.realRankDataNew.image" class="work-living-topImg"/>
              <div class="flex align-center">
                <div class="rdx-content-color rdx-m-r-6 rdx-m-l-18">实时销量榜</div>
                <img src="../../assets/imgs/even.png" style="width: 16px; height: 16px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="work-top-banner2 button-a" :style="'background: url(' + getData.bannerCentreImg + ') no-repeat center center'" @click="linkBannerTwo"></div>
    <div class="work-talent flex position-re">
      <div class="rdx-m-l-16 button-a" :class="show.talentShow == index ? 'work-talent-box2 flex rdx-radius-6' : '' " v-for="(item,index) in getData.livingList" v-if="index < 5" :key="index" @click="linkLiving(item.room_id)" @mouseenter="enters(index)" @mouseleave="leaver(index)">
        <div class="flex work-talent-box position-re rdx-light-color rdx-radius-6" :style="{'background':'url('+item.live_cover+')'+'no-repeat','background-size':'100%'+'100%'}">
          <div class="flex flex-direction w-100 demo_pic" style="padding: 10px;">
            <div class="flex align-center">
              <div class="flex position-re rdx-m-b-8">
                <img :src="item.avatar" class="work-talent-avater" />
                <div class="tag-living rdx-text-center" style="font-size: 6px;">直播</div>
              </div>
              <div class="flex flex-direction rdx-p-l-10">
                <span class="rdx-font-14 rdx-line-1" style="width: 130px;">{{item.nickname}}</span>
                <span class="rdx-font-12 rdx-line-height-24">粉丝数：<span style="color: #F5AF4B;">{{item.follower_count}}</span></span>
              </div>
            </div>
          </div>
          <div class="position-ab flex flex-direction" style="bottom: 12px; padding: 0px 10px;">
            <div class="flex">
              <div class="bg-content2 rdx-line-height-22 rdx-radius-4 rdx-p-lr-10 rdx-font-12">{{item.live_type}}</div>
            </div>
            <div class="rdx-font-14 rdx-line-1 rdx-line-height-26" style="width: 180px;">{{item.title}}</div>
          </div>
        </div>
        <div class="flex flex-direction rdx-flex-1 rdx-p-t-16 rdx-p-b-36" v-show="show.talentShow == index">
          <div class="flex rdx-p-l-26 rdx-p-r-28 justify-between position-re">
            <div class="rdx-font-14">已开播 {{item.duration}}</div>
            <div class="flex position-re work-living-tab">
              <img src="../../assets/imgs/work_living.png" style="width: 31px; height: 31px;" >
              <div class="position-ab rdx-font-12 talent-tag work-living-ok" style="bottom: -26px; left: -13px;">数据大屏</div>
            </div>
          </div>
          <div class="flex flex-direction align-center rdx-m-t-40">
            <div class="rdx-font-14">总销售额</div>
            <div class="rdx-font-26 font-strong rdx-m-t-10" style="color: #FF5E0F;">￥<count-up :delay="val.delay" :endVal="Number(item.amount)" :options="options"></count-up></div>
          </div>
          <div class="flex justify-around rdx-m-t-32">
            <div class="flex flex-direction align-center">
              <span class="rdx-font-14 rdx-tips-color">销售量(件)</span>
              <span class="rdx-font-20 font-strong">{{item.volume}}</span>
            </div>
            <div class="flex flex-direction align-center">
              <span class="rdx-font-14 rdx-tips-color">人气峰值</span>
              <span class="rdx-font-20 font-strong">{{item.total_user}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="position-ab talent-right flex align-center justify-center button-a" @click="livingGO">
        <i class="iconfont icon-e632 rdx-light-color rdx-font-26"></i>
      </div>

    </div>
    <div class="work-monitor flex flex-direction">
      <div class="flex rdx-p-b-16 justify-between">
        <div class="flex rdx-p-l-18">
          <div class="flex flex-direction align-center position-re button-a" @click="onTab('1')">
            <strong :class="show.monitorIndex == 1 ? 'rdx-primary' : 'rdx-content-color'">抖音号监测</strong>
            <div class="work-monitor-line rdx-m-t-8" v-if="show.monitorIndex == 1"></div>
          </div>
          <div class="flex flex-direction align-center position-re rdx-p-l-70 button-a" @click="onTab('2')">
            <strong :class="show.monitorIndex == 2 ? 'rdx-primary' : 'rdx-content-color'">直播监测</strong>
            <div class="work-monitor-line rdx-m-t-8" v-if="show.monitorIndex == 2"></div>
          </div>
        </div>
        <div class="flex rdx-m-t-4 rdx-m-r-20" style="height: 26px;" v-if="show.monitorIndex == 1">
          <el-tooltip content="新增抖音号监测" placement="top">
            <div class="button-all flex align-center justify-center rdx-p-lr-16 rdx-radius-6 rdx-light-color" @click="addTrill('4','新增抖音号监测')">
              <i class="iconfont icon-e600 rdx-font-14" style="margin-top: 2px;"></i>
              <span class="rdx-font-14 rdx-p-l-4">新增抖音号检测</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex rdx-m-t-4 rdx-m-r-20" style="height: 26px;" v-if="show.monitorIndex == 2">
          <el-tooltip content="新增直播监测" placement="top">
            <div class="button-all flex align-center justify-center rdx-p-lr-16 rdx-radius-6 rdx-light-color" @click="addTrill('1','新增直播监测')">
              <i class="iconfont icon-e600 rdx-font-14" style="margin-top: 2px;"></i>
              <span class="rdx-font-14 rdx-p-l-4">新增直播监测</span>
            </div>
          </el-tooltip>
        </div>
      </div>
      <el-table v-loading="loading" :data="getData.trillMonitor" v-if="show.monitorIndex == 1" @row-click="linkTrill">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30">
            <div class="button-all rdx-radius-6 rdx-line-height-30 rdx-font-14 rdx-p-lr-10 rdx-m-b-30"
              style="height: 30px;" @click="addTrill('4','新增抖音号监测')">新增一个抖音号</div>
          </no-data>
        </template>
        <el-table-column label="达人">
          <template slot-scope="{ row }">
            <div class="flex rdx-m-l-10 align-center info">
              <img :src="row.avatar" class="img" style="width: 60px;height: 60px; border-radius: 60px;" />
              <div class="flex flex-direction rdx-p-l-10">
                <div class="flex align-center">
                  <span class="rdx-line-1 link-primary rdx-p-r-10" style="max-width: 120px;">{{ row.nickname }}</span>
                  <span class="work-living-tag rdx-font-12">直播</span>
                  <i class="iconfont icon-e610 rdx-primary" style="margin: 2px 0px 0px 5px;"></i>
                </div>
                <div class="rdx-font-14 rdx-tips-color">抖音号：{{row.author_id}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="新增粉丝" align="center" width="160">
          <template slot-scope="{ row }">
            <div class="flex">
              <div class="flex rdx-font-14 flex-direction">
                <div class="flex">今日</div>
                <div class="flex rdx-tips-color">昨日</div>
              </div>
              <div class="flex rdx-font-14 flex-direction align-center" style="width: 100px;">
                <div class="flex">{{row.today_follower_inc}}</div>
                <div class="flex rdx-tips-color">{{row.yesterday_follower_inc}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="begin_time" label="新增视频" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_video_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_video_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="新增点赞" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_digg_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_digg_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="新增评论" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_comment_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_comment_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="新增转发" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_forward_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_forward_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="新增直播" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_live_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_live_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="观看人次" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_user_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_user_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="人数峰值" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_user_count_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_user_count_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="新增音浪" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_ticket_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_ticket_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="直播销售额" width="100">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_amount_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_amount_inc}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-loading="loading" :data="getData.liveMonitorList" v-if="show.monitorIndex == 2" @row-click="linkLivingMonitor">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30">
            <div class="button-all rdx-radius-6 rdx-line-height-30 rdx-font-14 rdx-p-lr-10 rdx-m-b-30"
              style="height: 30px;" @click="addTrill('1','新增直播监测')">新增一个直播监测</div>
          </no-data>
        </template>
        <el-table-column label="抖音号">
          <template slot-scope="{ row }">
            <div class="flex rdx-m-l-10 align-center info">
              <img :src="row.avatar" class="img" style="width: 60px;height: 60px; border-radius: 60px;" />
              <div class="flex flex-direction rdx-p-l-10">
                <div class="flex align-center">
                  <span class="rdx-line-1 link-primary rdx-p-r-10">{{ row.nickname }}</span>
                </div>
                <div class="rdx-font-14 rdx-tips-color">观看人次：{{row.follower_count}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="观看人次" width="160">
          <template slot-scope="{ row }">
            <div class="flex">
              <div class="flex rdx-font-14 flex-direction">
                <div class="flex">今日</div>
                <div class="flex rdx-tips-color">昨日</div>
              </div>
              <div class="flex rdx-font-14 flex-direction align-center" style="width: 100px;">
                <div class="flex">{{row.today_user_inc}}</div>
                <div class="flex rdx-tips-color">{{row.yesterday_user_inc}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="人数峰值" width="160">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_user_count_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_user_count_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收获音浪" width="160">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_ticket_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_ticket_inc}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="直播销售额" width="160">
          <template slot-scope="{ row }">
            <div class="flex rdx-font-14 flex-direction align-center">
              <div class="flex">{{row.today_amount_inc}}</div>
              <div class="flex rdx-tips-color">{{row.yesterday_amount_inc}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="w-100 rdx-text-center rdx-p-t-20 rdx-p-b-20"
        :style="getData.trillMonitor !='' && show.monitorIndex == 1 ? '':'display: none;'">
        <el-pagination background layout="prev, pager, next" :page-size="paramsMonitor.size" :total="val.trillTotal"
          @current-change="trillPage"></el-pagination>
      </div>
      <div class="w-100 rdx-text-center rdx-p-t-20 rdx-p-b-20"
        :style="getData.liveMonitorList !='' && show.monitorIndex == 2 ? '':'display: none;'">
        <el-pagination background layout="prev, pager, next" :page-size="paramsMonitor.size" :total="val.liveTotal"
          @current-change="livingPage"></el-pagination>
      </div>
    </div>

    <monitor-living :monitorType="val.monitorType" :title="val.monitorTitle" @closeMonitor='closeDialog' @submitOk="submitOk" v-if="show.livingShowBox"></monitor-living>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '@/components/noData.vue'
  import monitorLiving from '@/components/monitorLiving.vue'
  import countUp from 'vue-countup-v2'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      searchItem,
      noData,
      countUp,
      monitorLiving
    },
    data() {
      return {
        loading: false,
        getData: {
          bannerList: [], //头部banner
          bannerCentre: [], //中间banner
          bannerCentreImg: "", //中间banner url
          livingList: [], //直播带货
          talentList: [], //涨粉达人榜
          saleList: [], //带货达人榜
          saleRankList: [], //抖音商品榜
          realSalesRankList: [], //实时销量榜
          trillMonitor: [], //抖音监测数据
          liveMonitorList: [], //直播监测
          incFansRankData: [],  //新增粉丝数
          incFansRankDataNew:'', //新增粉丝数单条数据
          authorSaleRankData: [],   //达人带货榜
          authorSaleRankDataNew:'', //达人带货榜单条数据
          goodsRankData: [],        //抖音商品榜
          goodsRankDataNew:'', //抖音商品榜单条数据
          realRankData: [],         //实时销量榜
          realRankDataNew:'', //实时销量榜单条数据
        },
        show: {
          monitorIndex: 1, //监测tab
          livingShowBox: false, //添加监测弹窗
          talentShow:'0',//鼠标移入效果 下标
        },
        options: {
          useEasing: true,
          useGrouping: true,
        },
        val: {
          delay: 0,
          endVal: 0,
          amountNew:0,   //流量大盘单条数据
          liveTotal: 0, //直播监测 总条数
          trillTotal:0,//抖音监测 总条数
          monitorType:'4',//监控类型(直播1,视频2,评论3,达人4)
          monitorTitle:"添加抖音号监测",//监测标题
          incFansIndex:0,//新增粉丝数下标
          authorSaleIndex:0,//达人带货榜下标
          goodsIndex:0,//抖音商品数下标
          realIndex:0,//实时销量榜下标
          topSearch:'4', //头部搜索类型和下标
          topSearchPlace:'请输入达人名称、抖音号关键词',//头部搜索关键词
        },
        params: {
          keyword: ""
        },
        paramsMonitor: {
          page: 1,
          size: 5,
        },
      }
    },
    computed: {
      ...mapGetters(['token', 'tokenOk'])
    },
    beforeDestroy(){
      clearInterval(this.incFansRankTime)
      clearInterval(this.authorSaleRankTime)
      clearInterval(this.goodsRankTime)
      clearInterval(this.realRankTime)
    },
    mounted() {
      //this.getBanner()
      this.getWorkRank()
      this.getActualLive()
      this.getBannerTwo()
      this.getLiving()
      this.getTalent()
      this.getSale()
      this.getSaleRank()
      this.getRealSalesRank()
      this.getLiveMonitor()
      this.getTrillMonitor()
      this.clearTime = setInterval(() => {
        this.getData.livingList.forEach((item)=>{
          item.amount=0
        })
        //this.getData.livingList.amount = 0
        this.val.amountNew=0;
        this.getLiving()
        this.getActualLive()
      }, 12000)
      //新增粉丝榜
      this.incFansRankTime = setInterval(() => {

        if(this.val.incFansIndex <  this.getData.incFansRankData.length){
          this.val.incFansIndex ++
          this.getData.incFansRankDataNew = this.getData.incFansRankData[this.val.incFansIndex];

          if(this.getData.incFansRankDataNew!=undefined){
            this.getData.incFansRankDataNew.follower_incr= tools.numberVerify(this.getData.incFansRankDataNew.follower_incr)
          }

          if(this.val.incFansIndex > 4){
            this.val.incFansIndex = 0
            this.getData.incFansRankDataNew = this.getData.incFansRankData[0]
          }
        }

      }, 5000)
      //达人带货榜
      this.authorSaleRankTime = setInterval(() => {
        if(this.val.authorSaleIndex <  this.getData.authorSaleRankData.length){
          this.val.authorSaleIndex ++
          this.getData.authorSaleRankDataNew = this.getData.authorSaleRankData[this.val.authorSaleIndex];

          if(this.getData.authorSaleRankDataNew!=undefined){
            this.getData.authorSaleRankDataNew.sales_amount= tools.numberVerify(this.getData.authorSaleRankDataNew.sales_amount)
          }

          if(this.val.authorSaleIndex > 4){
            this.val.authorSaleIndex = 0
            this.getData.authorSaleRankDataNew = this.getData.authorSaleRankData[0]
          }
        }
      }, 6000)
      //抖音商品榜
      this.goodsRankTime = setInterval(() => {
        if(this.val.goodsIndex <  this.getData.goodsRankData.length){
          this.val.goodsIndex ++
          this.getData.goodsRankDataNew = this.getData.goodsRankData[this.val.goodsIndex];

          if(this.getData.goodsRankDataNew!=undefined){
            this.getData.goodsRankDataNew.amount= tools.numberVerify(this.getData.goodsRankDataNew.amount)
          }

          if(this.val.goodsIndex > 4){
            this.val.goodsIndex = 0
            this.getData.goodsRankDataNew = this.getData.goodsRankData[0]
          }
        }
      }, 7000)
      //实时销量榜
      this.realRankTime = setInterval(() => {
        if(this.val.realIndex <  this.getData.realRankData.length){
          this.val.realIndex ++
          this.getData.realRankDataNew = this.getData.realRankData[this.val.realIndex];

          if(this.getData.realRankDataNew!=undefined){
            this.getData.realRankDataNew.amount= tools.numberVerify(this.getData.realRankDataNew.amount)
          }
          if(this.val.realIndex > 4){
            this.val.realIndex = 0
            this.getData.realRankDataNew = this.getData.realRankData[0]
          }
        }
      }, 8000)

    },
    beforeDestroy() {
      clearInterval(this.clearTime)
      clearInterval(this.LlapTime)
    },
    methods: {
      //搜索跳转
      clickKey(val) {
        if(this.val.topSearch == 1){
          var url = this.$router.resolve({path: '/living/living_search',query: {keyword: val}})
          window.open(url.href, '_top')
        }else if(this.val.topSearch == 2){
          var url = this.$router.resolve({path: '/video/video_search',query: {keyword: val}})
          window.open(url.href, '_top')
        }else if(this.val.topSearch == 4){
          var url = this.$router.resolve({path: '/talent/talent_search',query: {keyword: val}})
          window.open(url.href, '_top')
        }else if(this.val.topSearch == 5){
          var url = this.$router.resolve({path: '/shop/brands_search',query: {keyword: val}})
          window.open(url.href, '_top')
        }else if(this.val.topSearch == 6){
          var url = this.$router.resolve({path: '/shop/shop_rank',query: {keyword: val}})
          window.open(url.href, '_top')
        }else{
          var url = this.$router.resolve({path: '/goods/goods_search',query: {keyword: val}})
          window.open(url.href, '_top')
        }
      },
      //头部搜索判断
      clickSearch(index){
        this.val.topSearch = index
        if(index == 1){
          this.val.topSearchPlace = '请输入达人名称、抖音号关键词'
        }else if(index == 2){
          this.val.topSearchPlace = '请输入视频关键词'
        }else if(index == 4){
          this.val.topSearchPlace = '请输入达人名称、抖音号关键词'
        }else if(index == 5){
          this.val.topSearchPlace = '请输入品牌关键词'
        }else if(index == 6){
          this.val.topSearchPlace = '请输入小店关键词'
        }else{
          this.val.topSearchPlace = '请输入商品关键词'
        }
      },
      //流量大盘场次数据
      async getActualLive() {
        const {
          data
        } = await this.$get('/api/work/bench/actualLive')
        //console.log('qqww',data)
        if (data != undefined) {
          this.val.amountNew=data.total_live_count
        }
      },
      //顶部排行榜接口
      async getWorkRank() {
        const {
          data
        } = await this.$get('/api/work/bench/workRank')
        if (data != undefined) {
          //新增粉丝榜
          if(data.incFansRank!=''){
            this.getData.incFansRankData = data.incFansRank
            this.getData.incFansRankDataNew = this.getData.incFansRankData[0]

            this.getData.incFansRankDataNew.follower_incr= tools.numberVerify(this.getData.incFansRankDataNew.follower_incr)
          }

          //达人带货榜
          if(data.authorSaleRank!=''){
            this.getData.authorSaleRankData = data.authorSaleRank
            this.getData.authorSaleRankDataNew = this.getData.authorSaleRankData[0]
            console.log("daran",this.getData.authorSaleRankDataNew)
            this.getData.authorSaleRankDataNew.sales_amount= tools.numberVerify(this.getData.authorSaleRankDataNew.sales_amount)
          }

          //抖音商品榜
          if(data.goodsRank!=''){
            this.getData.goodsRankData = data.goodsRank
            this.getData.goodsRankDataNew = this.getData.goodsRankData[0]
            this.getData.goodsRankDataNew.amount= tools.numberVerify(this.getData.goodsRankDataNew.amount)
          }

          //实时销量榜
          if(data.realRank!=''){
            this.getData.realRankData = data.realRank
            this.getData.realRankDataNew = this.getData.realRankData[0]
            this.getData.realRankDataNew.amount= tools.numberVerify(this.getData.realRankDataNew.amount)
          }


        }
      },
      //顶部排行榜跳转（流量大盘，新增粉丝数，达人带货数，抖音商品数，实时销量）
      clickTop(type){
        if(type==1){

        }else if(type==2){
          this.$router.push({
            path: '/talent/talent_search'
          })
        }else if(type==3){
          this.$router.push({
            path: '/living/living_delivery'
          })
        }else if(type==4){
          this.$router.push({
            path: '/living/living_goods'
          })
        }else{
          this.$router.push({
            path: '/goods/goods_realsales'
          })
        }
      },
      //直播时长
      time_minus(timeDiff) {
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let minute = parseInt((timeDiff % 86400 % 3600) / 60)
        let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)
        day = day ? (day + 'd') : ''
        hour = hour ? (hour + 'h') : ''
        minute = minute ? (minute + 'm') : ''
        second = second ? (second + 's') : ''
        return day + hour + minute
      },
      //新增抖音监测
      submitOk(){
        this.show.livingShowBox = false
        if(this.val.monitorType == 4){
          this.getTrillMonitor()
        }else{
          this.getLiveMonitor()
        }
      },
      //点击抖音监测第几条
      trillPage(val) {
        this.paramsMonitor.page = val
        this.getTrillMonitor()
      },
      //跳转到抖音详情
      linkTrill(e){
        var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: e.author_id}})
        window.open(url.href, '_blank')
      },
      //获取抖音监测
      async getTrillMonitor() {
        this.loading = true
        const {
          data
        } = await this.$get('/api/work/bench/userMonitor', this.paramsMonitor)
        //console.log('qqqq',this.paramsMonitor)
        this.loading = false
        if (data != undefined) {
          this.getData.trillMonitor = data.list
          this.val.trillTotal = data.page_info.total
          // this.paramsMonitor.size = data.pageSize
          //console.log("抖音监测", this.val.liveTotal, this.getData.trillMonitor)
          this.getData.trillMonitor.forEach((item) => {
            item.today_follower_inc = tools.numberVerify(item.today_follower_inc)
            item.yesterday_follower_inc = tools.numberVerify(item.yesterday_follower_inc)
            item.today_video_inc = tools.numberVerify(item.today_video_inc)
            item.yesterday_video_inc = tools.numberVerify(item.yesterday_video_inc)
            item.today_digg_inc = tools.numberVerify(item.today_digg_inc)
            item.yesterday_digg_inc = tools.numberVerify(item.yesterday_digg_inc)
            item.today_comment_inc = tools.numberVerify(item.today_comment_inc)
            item.yesterday_comment_inc = tools.numberVerify(item.yesterday_comment_inc)
            item.today_forward_inc = tools.numberVerify(item.today_forward_inc)
            item.yesterday_forward_inc = tools.numberVerify(item.yesterday_forward_inc)
            item.today_live_inc = tools.numberVerify(item.today_live_inc)
            item.yesterday_live_inc = tools.numberVerify(item.yesterday_live_inc)
            item.today_user_inc = tools.numberVerify(item.today_user_inc)
            item.yesterday_user_inc = tools.numberVerify(item.yesterday_user_inc)
            item.today_user_count_inc = tools.numberVerify(item.today_user_count_inc)
            item.yesterday_user_count_inc = tools.numberVerify(item.yesterday_user_count_inc)
            item.today_ticket_inc = tools.numberVerify(item.today_ticket_inc)
            item.yesterday_ticket_inc = tools.numberVerify(item.yesterday_ticket_inc)
            item.today_amount_inc = tools.numberVerify(item.today_amount_inc)
            item.yesterday_amount_inc = tools.numberVerify(item.yesterday_amount_inc)
          })
        }

      },
      //点击直播监测第几页
      livingPage(val) {
        this.paramsMonitor.page = val
        this.getLiveMonitor()
      },
      //跳转到直播详情
      linkLivingMonitor(e){
        var url = this.$router.resolve({path: '/living/living_detail',query: {id: e.room_id}})
        window.open(url.href, '_blank')
      },
      //获取直播监测
      async getLiveMonitor() {
        this.loading = true
        const {
          data
        } = await this.$get('/api/work/bench/liveMonitoring', this.paramsMonitor)
        if (data != undefined) {
          this.getData.liveMonitorList = data.list
          this.val.liveTotal = data.page_info.total
          //console.log("直播监测", this.val.liveTotal, this.getData.liveMonitorList)
          this.getData.liveMonitorList.forEach((item) => {
            item.follower_count = tools.numberVerify(item.follower_count)
            item.today_user_inc = tools.numberVerify(item.today_user_inc)
            item.yesterday_user_inc = tools.numberVerify(item.yesterday_user_inc)
            item.today_user_count_inc = tools.numberVerify(item.today_user_count_inc)
            item.yesterday_user_count_inc = tools.numberVerify(item.yesterday_user_count_inc)
            item.today_ticket_inc = tools.numberVerify(item.today_ticket_inc)
            item.yesterday_ticket_inc = tools.numberVerify(item.yesterday_ticket_inc)
            item.today_amount_inc = tools.numberVerify(item.today_amount_inc)
            item.yesterday_amount_inc = tools.numberVerify(item.yesterday_amount_inc)
          })
        }
        this.loading = false
      },
      //实时销量榜
      async getRealSalesRank() {
        var params = {
          size: 3,
          page: 1
        }
        const {
          data
        } = await this.$get('/api/rank/home/realSalesRank', params)
        if (data != undefined) {
          this.getData.realSalesRankList = data.list
          //
          //console.log("实时销量榜", this.getData.realSalesRankList)
          // this.getData.realSalesRankList.forEach((item) => {
          //   item.sales_volume = item.sales_volume >= 10000 ? (item.sales_volume / 10000).toFixed(1) + 'w' : item
          //     .sales_volume
          // })
        }
      },
      //抖音商品榜
      async getSaleRank() {
        var params = {
          size: 3,
          page: 1,
          dayType: 'day',
          day: '20211005'
        }
        const {
          data
        } = await this.$get('/api/rank/home/yesterdaySaleRank', params)
        if (data != undefined) {
          this.getData.saleRankList = data.list
          //console.log("抖音商品榜", this.getData.saleRankList)
        }
      },
      //带货达人榜
      async getSale() {
        var params = {
          size: 3,
          page: 1
        }
        const {
          data
        } = await this.$get('/api/rank/author/sale', params)
        //console.log("带货达人榜", data)
        if (data != undefined) {
          this.getData.saleList = data.list
          this.getData.saleList.forEach((item) => {
            item.icons = item.live_show_count
            if (item.live_show_count < 0) {
              item.live_show_count = Math.abs(item.live_show_count)
            }
          })
        }
      },
      //涨粉达人榜
      async getTalent() {
        var talentParams = {
          day: '20211003',
          size: 3,
          page: 1
        }
        const {
          data
        } = await this.$get('/api/rank/author/fans', talentParams)
        //console.log("涨粉达人榜",data)
        if (data != undefined) {
          this.getData.talentList = data.list
          this.getData.talentList.forEach((item) => {
            item.icons = item.rank_change
            if (item.rank_change < 0) {
              item.rank_change = Math.abs(item.rank_change)
            }
          })
        }
      },
      //获取直播带货
      async getLiving() {
        var params = {}
        const {
          data
        } = await this.$get('/api/live/recommend',params,true)
        if (data != undefined) {
          this.getData.livingList = data.list
          this.getData.livingList.forEach((item) => {
            // item.begin_time = tools.getDateDiff(item.begin_time)
            if(item.volume<0){
              item.volume=Math.abs(item.volume)
              item.volume=tools.numberVerify(item.volume)
            }
            item.volume=tools.numberVerify(item.volume)
            item.follower_count = tools.numberVerify(item.follower_count)
            item.duration = this.time_minus(item.duration)
            item.amount=Math.abs(item.amount)
          })
        }
      },
      //鼠标移入
      enters(index){
        this.show.talentShow = index
      },
      //鼠标移出
      leaver(index){
        this.show.talentShow = index
      },
      //直播带货跳转到实时大屏
      linkLiving(id) {
        var url = this.$router.resolve({path: '/data_large',query: {id: id}})
        window.open(url.href, '_blank')
      },
      //跳转到热门直播
      livingGO() {
        this.$router.push({
          path: '/living/redboard'
        })
      },
      //获取头部banner
      async getBanner() {
        var params = {
          type: "5"
        }
        const {
          data
        } = await this.$get('/api/work/bench/banner', params)
        this.getData.bannerList = data
      },
      //头部banner跳转
      linkBannerTwo() {
        window.open(this.getData.bannerCentre[0].link, '_top')
      },
      //获取中间banner
      async getBannerTwo() {
        var params = {
          type: "6"
        }
        const {
          data
        } = await this.$get('/api/work/bench/banner', params)
        this.getData.bannerCentre = data
        this.getData.bannerCentreImg = data[0].img
      },
      //点击监测
      onTab(index) {
        this.val.liveTotal = 0
        this.val.trillTotal = 0
        this.show.monitorIndex = index
        this.paramsMonitor.page = 1
        if (index == 1) {
          this.getTrillMonitor()
        } else {
          this.getLiveMonitor()
        }
      },
      //新增抖音号
      addTrill(type,title) {
        //console.log("this",this.token)
        if(this.token == ''){
          this.saveTokenOk('51000')
          //console.log("112")
          return false
        }
        this.show.livingShowBox = true
        this.val.monitorType = type
        //console.log('this.val.monitorType',this.val.monitorType)
        this.val.monitorTitle = title
      },
      //关闭弹窗
      closeDialog() {
        this.show.livingShowBox = false
      },
      ...mapActions(['saveTokenOk']),
    }
  }
</script>

<style lang="scss" scoped>
  @import "./workIndex.scss";
  .link-primary:hover{
    font-weight: bold!important;
  }
  .tag-living{position: absolute; bottom:0px; width: 38px; height: 13px; line-height: 13px; background: linear-gradient(rgba(248,83,83,1.00) 0%, #c91313 100%); border-radius: 9px;}

  .demo_pic{
    height: 260px;
    width: 200px;
    background: rgba(0,0,0,0.5);
    border-radius: 6px;
  }
  .demo_pic:hover{
    height: 260px;
    width: 200px;
    background: rgba(0,0,0,0.6);
    border-radius: 6px;
  }
</style>
