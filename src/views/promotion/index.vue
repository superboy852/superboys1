<template>
  <div class="box flex flex-direction position-re">
    <div class="promo-bg flex flex-direction rdx-m-t-20 position-re">
      <span class="rdx-font-40 rdx-p-t-28" style="color: #6802CF;">【观星树】—— 点击链接注册即可免费使用 。</span>
      <div class="promo-url flex align-center position-re">
        <span class="rdx-light-color">{{locationUrl}}/work/index?shareId={{userData.share_key}}</span>
        <span class="promo-go flex align-center justify-center position-ab font-strong rdx-font-22 button-a"
          style="right: -40px;" @click="copys('http://121.40.149.42:8086/work/index')">
          <img src="../../assets/imgs/go.png">
        </span>
      </div>
      <div class="flex rdx-m-t-28 rdx-font-20 rdx-line-height-30" style="color: #030306;">
        抖音视频直播电商大数据监测平台，带货主播直播销量数据，<br>
        潜力达人排行榜，挖掘实时爆款商品，以及热门素材提供；<br>
        有效助力品牌策略投放，抖音号主运营变现。
      </div>
      <div class="flex rdx-font-28 rdx-p-t-80">
        <span class="promo-buttonA button-all-all" @click="copys('http://121.40.149.42:8086/work/index')">复制推广文案</span>
        <span class="promo-buttonB button-all-all" @click="clickPoster">生成推广海报</span>
      </div>
      <div class="rdx-primary-bg rdx-light-color font-strong button-a dl_style position-ab" style="top: 20px; right: 20px;" @click="clickAgency">代理合作</div>
    </div>

    <div class="flex justify-between w-100" style="padding-bottom: 20px;">
      <div class="flex rdx-flex-1 position-re rdx-p-r-15">
        <div class="position-ab bjj rdx-font-20" style="top: 36px;left: 24px;">推广规则</div>
        <div class="flex fis_width flex-direction position-re" style="padding-bottom: 0px;padding-right: 20px;">
          <div class="flex align-center rdx-m-b-10" v-for="item in tableData.promotionRules">
            <div class="rdx-primary-bg rdx-m-l-26px rdx-m-r-10 dot"></div>
            <div class="rdx-font-14">{{item}}</div>
          </div>
          <div class="rdx-primary button-a rdx-font-14 position-ab" style="top: 69px;left: 305px;" @click="clickTg">
            查看具体规则</div>
        </div>
      </div>
      <div class="flex rdx-flex-1 position-re rdx-p-l-15">
        <div class="position-ab bjj rdx-font-20" style="top: 36px;left: 46px;">返利规则</div>
        <div class="fis_width " style="padding-bottom: 20px;">
          <div class="flex align-center rdx-m-b-10" v-for="item in tableData.rebateRules">
            <div class="rdx-primary-bg rdx-m-l-26px rdx-m-r-10 dot">
            </div>
            <div class="rdx-font-14">{{item}}</div>
          </div>
          <div class="rdx-m-l-18 rdx-font-14 rdx-primary button-a rdx-p-b-10" @click="clickRebate">查看具体规则</div>
        </div>
      </div>
      <!-- 推广规则弹窗 -->
      <div>
        <el-dialog :visible.sync="spread" width="520px">
          <template slot="title">
            <div>推广规则</div>
          </template>
          <div v-if="lists != ''">
            <div class="flex align-center">
              <div class="flex align-center justify-center position-re tgv">
                <img src="../../assets/imgs/seo_1.png" class="position-ab" style="bottom: 0px; left: 0px; width: 68px; height: 48px;">
                <span class="position-re rdx-main-color" style="z-index: 10;">免费版</span>
              </div>
              <div class="rdx-content-color">邀请 {{lists[0].invitationNumber}}人注册，升为{{lists[0].obtainDays}}天试用版，最多可邀请 {{lists[0].mostNumber}}人；</div>
            </div>
            <div class="flex align-center">
              <div class="flex align-center justify-center position-re tgv">
                <img src="../../assets/imgs/seo_2.png" class="position-ab" style="bottom: 0px; left: 0px; width: 68px; height: 48px;">
                <span class="position-re rdx-main-color" style="z-index: 10; color: #BD4700;">个人标准</span>
              </div>
              <div class="rdx-content-color">邀请 {{lists[1].invitationNumber}}人注册，升为{{lists[1].obtainDays}}天试用版，最多可邀请 {{lists[1].mostNumber}}人；</div>
            </div>
            <div class="flex align-center">
              <div class="flex align-center justify-center position-re tgv">
                <img src="../../assets/imgs/seo_3.png" class="position-ab" style="bottom: 0px; left: 0px; width: 68px; height: 48px;">
                <span class="position-re rdx-main-color" style="z-index: 10; color: #794500;">个人专业</span>
              </div>
              <div class="rdx-content-color">邀请 {{lists[2].invitationNumber}}人注册，升为{{lists[2].obtainDays}}天试用版，最多可邀请 {{lists[2].mostNumber}}人；</div>
            </div>
            <div class="flex align-center">
              <div class="flex align-center justify-center position-re tgv">
                <img src="../../assets/imgs/seo_4.png" class="position-ab" style="bottom: 0px; left: 0px; width: 68px; height: 48px;">
                <span class="position-re rdx-main-color" style="z-index: 10; color: #FFD3D3;">企业标准</span>
              </div>
              <div class="rdx-content-color">邀请 {{lists[3].invitationNumber}}人注册，升为{{lists[3].obtainDays}}天试用版，最多可邀请 {{lists[3].mostNumber}}人；</div>
            </div>
            <div class="flex align-center">
              <div class="flex align-center justify-center position-re tgv">
                <img src="../../assets/imgs/seo_5.png" class="position-ab" style="bottom: 0px; left: 0px; width: 68px; height: 48px;">
                <span class="position-re rdx-main-color" style="z-index: 10; color: #EBE2FF;">企业专业</span>
              </div>
              <div class="rdx-content-color">邀请 {{lists[4].invitationNumber}}人注册，升为{{lists[4].obtainDays}}天试用版，最多可邀请 {{lists[4].mostNumber}}人；</div>
            </div>
          </div>
        </el-dialog>
      </div>

      <!-- 代理合作弹窗 -->
      <div>
        <el-dialog :visible.sync="agency" class="agency-head" width="380px" style="padding: 10px 20px 20px 20px;">
          <div class="rdx-font-18 font-strong rdx-main-color flex justify-center rdx-m-b-20">扫一扫添加顾问，立即加入代理合作</div>
          <div class="flex justify-center rdx-m-b-16">
            <img src="../../assets/imgs/rebate_code.png" style="width: 180px;height: 180px;" />
          </div>
          <div class="rdx-primary-bg rdx-light-color"
            style="padding: 10px 16px;border-radius: 5px;width: 118px;margin: 0 auto;">扫描添加微信</div>
        </el-dialog>
      </div>

      <!-- 返利规则弹窗 -->
      <div>
        <el-dialog :visible.sync="rebate" width="540px">
          <template slot="title">
            <div>返佣规则</div>
          </template>
          <div class="rdx-font-14 rdx-content-color position-re" v-for="(item,index) in tableData.rebateRulesSpecific"
            :key="index">
            <div class="rdx-line-height-30">{{item}}</div>
          </div>
        </el-dialog>
      </div>

      <!-- 海报弹窗 -->
      <div>
        <el-dialog :visible.sync="poster" width="600px">
          <template slot="title">
            <div>推广海报</div>
          </template>
          <div class="flex justify-between">
            <!-- 图片海报 -->
            <div>
              <img :src="posterData.url" style="width: 288px;height: 550px;" id="imgs" />
            </div>
            <!-- 文案内容 -->
            <div class="flex flex-direction rdx-m-l-18">
              <div class="font-strong rdx-font-16 rdx-main-color rdx-m-b-20">推荐场景</div>
              <div class="rdx-font-14 rdx-content-color rdx-m-b-16">在朋友圈、微信群等私域，或者知乎、微博、豆瓣和贴吧等公共流量网站中分享图片有助于达到更好的宣传目的。
              </div>
              <div class="font-strong rdx-font-16 rdx-main-color rdx-m-b-16">目标人群</div>
              <div class="rdx-font-14 rdx-content-color rdx-m-b-50">电商变现人群</div>
              <div class="rdx-primary-bg rdx-light-color rdx-m-l-44 poster_sty button-a" @click="downLoadImg">
                下载图片
              </div>
            </div>

          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import * as tools from '@/common/tools.js';
  import {
    locationUrl
  } from '@/config'
  export default {
    data() {
      return {
        locationUrl: '',
        userData: {},
        generatePosterData: {},
        params: {
          type: '1',
          page: 1,
          size: 10
        },

        tableData: [],
        distributionData: [],
        total: 0,
        integralRecord: false,
        rebate: false,
        poster: false,
        spread: false,
        agency: false,
        task: false,

        lists: [],
        users: {}, //用户基本信息

        posterData: {},
        withdrawalParams: {
          page: 1,
          size: 5,
        },
        performanceTotal: '',
        performanceParams: {
          page: 1,
          size: 10,
        },
        distributionTotal: '',
        distributionParams: {
          page: 1,
          size: 10,
        },
        heightCon: 0,
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      //获取屏幕高度
      this.heightCon = document.documentElement.clientHeight - 90
      this.locationUrl = locationUrl
      this.users = this.user
      this.getPushRule()
      this.getGeneratePoster()
      this.getUserDistributionList()
      this.getWallet()
      this.getSharePosters()
      this.getUserInfoDetail()
      this.getGeneratePosters()
    },
    methods: {
      //复制信息
      copys(text) {
        tools.copy(text)
      },
      //获取分享链接
      async getUserInfoDetail() {
        const {
          data
        } = await this.$get('/api/user/getUserInfoDetail')
        this.userData = data
      },
      //获取放大海报图
      async getGeneratePosters() {
        const {
          data
        } = await this.$get('/api/user/getGeneratePoster', this.params)
        if (data != undefined) {
          this.GenerateImg = data
          window.open(this.GenerateImg.url)
          // var name = "邀请新好友注册_" + val
          //tools.downloadImg(this.GenerateImg.url,this.GenerateImg.nickname)

        }
      },
      //获取下载海报的信息
      async getGeneratePoster() {
        var param = {
          "type": '1',
          "linkUrl": this.users.share_key,
        }
        const {
          data
        } = await this.$get('/api/user/getGeneratePoster', param)
        if (data != undefined) {
          this.posterData = data
        }
      },
      //获取推广分销的数据
      async getUserDistributionList() {
        var param = {
          "id": this.users.user_id,
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
      //获取推广素材的数据
      async getPushRule() {
        const {
          data
        } = await this.$get('/api/push/getPushRule')
        if (data != undefined) {
          this.tableData = data
          this.tableData.promotionRulesSpecific.forEach((item) => {
            this.lists.push(item)
          })
        }
      },
      //代理合作弹窗
      clickAgency() {
        this.agency = true
      },
      //推广规则弹窗
      clickTg() {
        this.spread = true
      },
      //海报弹窗
      clickPoster() {
        this.poster = true
      },
      //返利规则弹窗
      clickRebate() {
        this.rebate = true
      },
      //复制信息
      copys(text) {
        tools.copy(text)
      },

      //提现记录弹窗
      clickDepRec() {
        this.integralRecord = true
      },
      //点击切换
      // onTab(index) {
      //   this.show.tabIndex = index
      //   this.params.type = this.show.tabIndex
      //   //this.tableList()
      // },
      //下载海报图片
      downLoadImg() {
        tools.downloadImg(this.posterData.url, this.posterData.nickname)
      },

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";

  .starview {
    padding: 20px;
    background: $rdx-bg-color;
    border-radius: 10px;

    .line {
      width: 100%;
      height: 4px;
      background-color: #DD001B;
      font-size: 20px;
      font-weight: bold;
      border-radius: 3px;
    }
  }

  .block {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 20px;
    overflow: visible !important;
  }

  .bjj {
    width: 165px;
    text-align: center;
    color: #E22239;
    height: 47px;
    background: #FFE5E8;
    border-radius: 4px;
    padding: 10px 0px;
    border-radius: 4px;
  }

  .dl_style {
    width: 103px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background: #DD001B;
    border-radius: 4px;
    top: -10px;
    right: 0px;
  }

  .dl_style:hover {
    background: $rdx-pink;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .tgcom {
    width: 924px;
    border: 2px solid #dcdcdc;
    border-radius: 4px;
  }

  .tgv {
    background-size: 68px 48px;
    width: 68px;
    height: 48px;
    margin-right: 20px;
  }

  .fis_width {
    padding: 40px 30px;
    margin-top: 56px;
    border-radius: 4px;
    background: $rdx-light-color;
    width: 100%;
    box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.11)
  }

  .sec_width {
    box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.11);
    width: 1010px;
  }

  .writer {
    width: 116px;
    padding: 10px 14px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    text-align: center;
  }

  .img_style {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .deposits {
    width: 72px;
    padding: 6px 20px;
    border-radius: 4px;
  }

  .deposits_record {
    width: 90px;
    padding: 6px 16px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
  }

  .poster_sty {
    width: 160px;
    padding: 12px 52px;
    border-radius: 5px;
  }



  .wdrw {
    width: 390px;
    border-radius: 5px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.13);
  }

  .with_record {
    width: 100px;
    border-radius: 4px;
    padding: 6px 10px;
    background: $rdx-light-color;
    border: 1px solid #e5e5e5;
  }

  .with_tix {
    width: 74px;
    border-radius: 4px;
    padding: 6px 20px;
  }

  .tabbutton {
    color: #fff;
    background-color: $rdx-primary;
  }

  /deep/.tab_button {
    color: #fff;
    background-color: $rdx-primary;
  }

  /deep/.el-table .el-table__body-wrapper .cell {
    padding: 10px 0px;
  }

  /deep/.el-dialog__body {
    padding: 10px 20px 20px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  .money-boxA {
    /deep/.el-dialog__body {
      padding: 10px 0px 20px 0px;
    }
  }
  .promotion-box{
    .el-table{
      /deep/.el-table__body-wrapper td{font-weight: lighter; color:#B1B1B1; padding: 8px 0px!important;}
      /deep/.el-table__body-wrapper td:nth-child(2){color: #DD001B;}
      /deep/.el-table__body-wrapper td:nth-child(3){color: #DD001B;}
    }
  }
</style>
