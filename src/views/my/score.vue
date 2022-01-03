<template>
  <div class="box">
    <div class=" justify-between flex rdx-p-b-15">
      <div class="flex">
        <span class="flex align-center">
          <span class="tips" style="width: 4px;height: 20px;"></span>
          <span class="rdx-content-color rdx-p-l-12">个人资料及认证 </span>
        </span>
        <span class="flex align-center rdx-m-l-20">
          <span class="tips" style="width: 3px;height: 11px; background-color: #666666;"></span>
          <span class="nav-title no-p rdx-font-16 rdx-p-l-12">积分任务</span>
        </span>

      </div>
      <div class="rdx-primary-bg rdx-radius-10 rdx-light-color rdx-p-lr-16 rdx-line-height-30 button-a rdx-font-14" style="width: 89px;height: 30px;"
        @click="integralRecord=true">积分记录</div>
    </div>
    <div class="my-score">
      <el-dialog :visible.sync="integralRecord">
        <div slot="title" class="rdx-font-20">积分记录</div>
        <el-table :data="scoreRecordData">
          <el-table-column prop="create_time" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="event" label="积分事件" align="center"></el-table-column>
          <el-table-column prop="change_score" label="积分变更" align="center">
            <template slot-scope="scope">
              <span :class="scope.row.change_score>0?'rdx-success' : 'rdx-primary'">{{scope.row.change_score}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="latest_score" label="变更后积分" align="center">
          </el-table-column>
        </el-table>

        <div class="align-center rdx-m-t-14 block" style="text-align: center; border-radius: 5px">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="scoreParams.size"
            @current-change="handleGoodsCurrentChange">
          </el-pagination>
        </div>

      </el-dialog>
    </div>
    <div class="rdx-flex rdx-row-between score-top">
      <div class="cur-text">
        当前积分
        <span class="cur-score">{{nowScore}}</span>
      </div>
      <div class="rdx-primary rdx-line-height-30 rdx-p-lr-26 rdx-radius-10  rdx-light-color button-a" style="border: 1px solid #FFFFFF; width: 119px;height: 31px;"
        @click="dialogVisible = true">积分规则</div>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="588px">
        <div slot="title" class="rdx-font-20">积分规则</div>
        <div class="rdx-line-height-30" style="margin-top: -15px;">
          <div class="rdx-font-18 position-re">
            <span class="position-re"style="z-index: 10;">签到活动:</span>
            <span class="position-ab seore-bottom" style="bottom: 3px; left: 0px;"></span>
          </div>
          <div class="rdx-font-16" v-for="(item,index) in scoreRuleData" :key="index" v-if="item.rule_type==1">{{index +1}}){{item.rule_content}}</div>
          <div class="rdx-font-18 position-re rdx-m-t-20">
            <span class="position-re"style="z-index: 10;">积分规则:</span>
            <span class="position-ab seore-bottom" style="bottom: 3px; left: 0px;"></span>
          </div>
          <div v-for="(item,index3) in scoreRuleData" :key="index3" v-if="item.rule_type==3">{{index3 + 1}}){{item.rule_content}}</div>
          <div class="rdx-font-18 position-re rdx-m-t-20">
            <span class="position-re"style="z-index: 10;">邀请好友:</span>
            <span class="position-ab seore-bottom" style="bottom: 3px; left: 0px;"></span>
          </div>
          <div v-for="(item,index2) in scoreRuleData" :key="index2" v-if="item.rule_type==2">{{index2 + 1}}){{item.rule_content}}</div>
        </div>
        <div align="center">
          <el-button class="tabbutton rdx-m-t-16" style="width: 160px; border-radius: 5px;" @click="dialogVisible = false">知道了</el-button>
        </div>

      </el-dialog>
    </div>

    <div class="flex align-center cell" style="padding-bottom: 0px;">
      <div class="flex position-re justify-center rdx-p-r-50" @click="tab = 1">
        <strong class="rdx-p-b-12 button-a" :class="tab === 1 ? 'active' : 'rdx-tips-color'">每日任务</strong>
        <span class="line-data position-ab" v-if="tab === 1"></span>
      </div>
      <div class="flex position-re justify-center rdx-p-lr-50" @click="tab = 2">
        <strong class="rdx-p-b-12 button-a" :class="tab === 2 ? 'active' : 'rdx-tips-color'">成长任务</strong>
        <span class="line-data position-ab rdx-m-t-16" v-if="tab === 2">

        </span>
      </div>
    </div>
    <div class="rdx-m-t-20" v-if="tab === 1">
      已连续签到
      <span class="rdx-primary rdx-font-14">{{continuousDays}}</span>天
      <span class="rdx-tips-color rdx-m-l-20 rdx-font-14">累计连续签到7天可获得175积分+3天高级版</span>

      <div class="rdx-flex cell button-a">
        <div :class="['sign-box', item.is_attendance == '1' ? 'sign-active': '']" v-for="item in attendance"
          :key="item.task_id">
          <div class="sign-img-box">
            <img :src="item.is_attendance == '1' ? signSuccessImg : signImg" class="sign-img" alt />
            <span class="sign-text">{{item.score}}</span>
          </div>
          <div class="rdx-font-12" style="margin-top: -2px;">{{item.title}}</div>
        </div>
      </div>

      <div class="rdx-flex cell justify-between">
        <div class="flex justify-between" style="widt h: 706px;" v-for=" item in inviteData">
          <div class="rdx-font-14">
            <div>{{item.name}}</div>
            <div class="rdx-tips-color rdx-p-t-8">{{item.description}}</div>
          </div>
          <div class="flex align-center rdx-font-14" style="margin:5px 0px 0px 150px;">
            <span class="rdx-tips-color">已邀请</span>
            <span class="rdx-p-lr-20 font-strong rdx-font-16">{{item.now_count}}/{{item.max_count}}</span>
            <div class="rdx-primary-bg rdx-light-color rdx-line-height-32 rdx-p-lr-28 rdx-radius-4 tabbutton button-a" style="width: 98px;height: 32px;" @click="inviteFriends = true">去邀请</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rdx-m-t-16 " v-if="tab === 2">
      <div class="flex align-center rdx-m-b-20 rdx-p-m-20 justify-between rdx-radius-6 rdx-p-tb-8" style="border: 1px solid #FF4C62; width: 526px;"
        v-for="growth in growthData" :key="growth.task_id">
        <div class="flex align-center">
          <img :src="growth.img != '' ? growth.img : '../../assets/imgs/not_head.png'"
            style="width: 96px; height: 32px;" class="rdx-m-t-8 rdx-m-l-18 rdx-m-b-8" />

          <p class="rdx-m-l-26 rdx-flex-1 rdx-p-r-20">
            <span class="rdx-font-14 rdx-m-t-16 font-strong">{{growth.name}}</span><br />
            <span class="rdx-font-14 rdx-m-t-10 rdx-content-color rdx-line-1">{{growth.description}}</span>
          </p>
        </div>
        <div class="flex justify-between rdx-m-r-30">
          <div class="flex align-center">
            <img src="../../assets/imgs/sign-success.png" style="width: 18px; height: 18px;" />
            <p class="rdx-m-l-12 rdx-font-14" style="width: 25px;">{{growth.score}}</p>
          </div>
          <div class="rdx-m-l-18">
            <el-button class="tabbutton " style="width: 89px; height: 32px; border-radius: 6px; border: 0;" v-if="growth.now_count==0">去绑定
            </el-button>
            <el-button disabled class="tabbutton " style="width: 89px; height: 32px; border-radius: 6px; border: 0;" v-else="growth.now_count!=0">已绑定
            </el-button>
          </div>
        </div>

      </div>

    </div>

    <!-- 领取积分弹窗 -->
    <div>
      <el-dialog :visible.sync="sign" width="400px">
        <template slot="title">
          <div class="flex">连续签到{{continuousDays}}天</div>
        </template>
        <div class="rdx-p-t-10" style="text-align: center;">
          <img src="../../assets/imgs/jfjb.png" style="width: 70px; height: 70px;" />
        </div>
        <div class="flex flex-direction rdx-m-t-24 align-center">
          <span class="rdx-font-18 flex font-strong">签到成功，获得{{dayScore}}积分</span>
          <span class="rdx-font-14 rdx-m-t-10 flex">明天继续再接再厉</span>
        </div>
        <div class="rdx-m-t-20 flex flex-direction align-center" style="margin-bottom: -20px;">
          <el-button class="tabbutton" style="width: 102px;" @click="sign = false">知道了</el-button>

          <el-button type="text" class="rdx-m-t-18" @click="clickFriends">去邀请好友赚 1500积分></el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog :visible.sync="inviteFriends" width="440px">
        <div class="rdx-font-17 rdx-main-color" style="margin-top: -70px;">邀请新好友注册</div>
        <div class="rdx-p-t-16 rdx-font-13 rdx-m-t-20" style="color: c4c4c4;">邀请好友注册得300积分，每日封顶1500积分</div>
        <div class="rdx-font-17 rdx-m-t-38">分享注册链接</div>
        <div class=" rdx-m-t-18 flex justify-between " style="width: 390px;background: #FFFBF9;">
          <span class="rdx-font-12 rdx-m-l-20 rdx-m-t-16 flex flex-direction "
            style="color: #CCCCCC;">{{locationUrl}}/work/index?shareId={{userData.share_key}}</span>
          <el-button class="tabbutton flex rdx-m-t-12 rdx-m-r-12 rdx-m-b-12 rdx-m-l-12 aligin-center"
            style="width: 115px;"
            @click="copys(locationUrl + '/work/index?shareId=' + userData.share_key)"><span
              style="margin-left: -8px;" class="rdx-font-12">复制链接 转发好友</span></el-button>
        </div>
        <div class="rdx-m-t-30">保存海报发给好友</div>
        <div class="flex justify-between  rdx-m-l-24 rdx-m-r-24">
          <div class="rdx-m-t-16 align-center flex flex-direction " v-for="generatePoster in generatePosterData"
            :key="generatePoster.type">
            <img :src="generatePoster.url" style="width: 83px; height: 132px;" />
            <el-button class="tab_button rdx-m-t-8 flex align-center" style="width: 48px;height: 22px;"
              @click="downloadPosters(generatePoster.type,generatePoster.url)">
              <span style="margin-left: -5px;">下载</span>
            </el-button>
          </div>

        </div>
      </el-dialog>
    </div>

    <div class="nav shop">
      <span class="nav-title rdx-font-16">积分商城</span>
    </div>
    <div class="rdx-flex w-70 flex-wrap">
      <div class="score-card" v-for="items in scoreGoodsData" :key="items.goods_id">
        <div class="rdx-flex">
          <span class="rdx-font-16">{{items.day}}天</span>
          <img :src="items.icon" class="img" alt />
          <span class="rdx-font-14 rdx-content-color ">{{items.goods_name}}</span>
        </div>
        <div class="rdx-flex rdx-row-between rdx-m-t-10">
          <div class="rdx-flex">
            <img src="@/assets/imgs/sign-success.png" class="gold" alt />
            <span class="rdx-font-16 font-strong">{{items.score}}</span>
          </div>
          <el-button type="primary" plain class="rule-btn" size="mini"  @click="immediatelyChange(items.goods_id)">立即兑换
          </el-button>

        </div>
      </div>
    </div>

    <!-- 兑换积分 -->
    <div>
      <el-dialog :visible.sync="immediatelyChangeWindow" width="400px">
        <template slot="title">
          <div class="flex">请先完成手机号验证</div>
        </template>
        <el-form :model="exchange" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm rdx-p-r-10">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="exchange.mobile" placeholder="请输入手机号" disabled></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verification">
            <el-input v-model="exchange.verification" class="position-re" placeholder="请输入6位验证码"></el-input>

            <div class="rdx-font-14 position-ab" style="top: 4px; right: 6px;">
              <div class=" rdx-primary button-a" v-if="!show.codeShow" @click="onCode">获取验证码
              </div>
              <div class="rdx-flex-1 rdx-primary" v-if="show.codeShow">
                {{newTime}}秒
              </div>
            </div>
          </el-form-item>
          <el-form-item class="flex justify-end">
            <el-button type="primary" :disabled="disabled == 1" class="rdx-font-14 aligin-end"
              @click="verificationClick" style="width: 84px;height: 36px;">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import { locationUrl } from '@/config'
  export default {
    data() {
      return {
        locationUrl:"",
        integralRecord: false,
        dialogVisible: false,
        inviteFriends: false,
        sign: false,
        disabled: '1',
        immediatelyChangeWindow: false,
        tab: 1,
        invitation: false,
        signSuccessImg: require('@/assets/imgs/sign-success.png'),
        signImg: require('@/assets/imgs/sign.png'),
        nowScore: '',
        exchange: {
          mobile: '',
          verification: ''
        },
        newTime:60,
        show: {
          codeShow: ''
        },
        scoreGoodsData: [],
        attendance: [],
        continuousDays: 0,
        inviteData: [],
        growthData: [],
        scoreRuleData: [],
        scoreRecordData: [],
        signIntegral: {},
        total: 0,
        scoreParams: {
          page: 1,
          size: 6
        },
        dayScore: 0,
        isClock: false,
        goodId:'',
        userData: {},
        generatePosterData: [],
        GenerateImg: {},
        params: {
          type: '',
          linkUrl:'',
        },
      }
    },
    created() {
      this.getSevenClock()
    },
    mounted() {
      this.locationUrl = locationUrl
      this.getNowScore()
      this.getScoreGoods()
      this.getInvite()
      this.getGrowth()
      this.getScoreRules()
      this.getScoreRecord()
      this.getUserInfoDetail()
      this.getSharePosters()
      this.tableList()
    },
    methods: {
      //获取订单数据
      async tableList(){
        const {
          data
        } = await this.$get('/api/user/getUserInfoDetail')
        this.info = data

        this.exchange.mobile = this.info.bind_mobile

      },
      //获取海报缩略图
      async getSharePosters() {
        const {
          data
        } = await this.$get('api/user/getSharePosters')
        this.generatePosterData = data.list
      },
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

      //获取积分记录
      async getScoreRecord() {
        const {
          data
        } = await this.$get('api/score/queryScoreRecord', this.scoreParams)
        this.scoreRecordData = data.list
        this.scoreRecordData.forEach((item) => {
          item.change_score = item.change_score > 0 ? '+' + item.change_score : item.change_score
          item.create_time = tools.time_cycle(1, (item.create_time / 1000))
        })
        this.total = data.page_info && data.page_info.total //分页
      },
      //积分记录的分页
      handleGoodsCurrentChange(val) {
        this.scoreParams.page = val
        this.getScoreRecord()
      },
      //获取积分规则
      async getScoreRules() {
        const {
          data
        } = await this.$get('api/score/queryScoreRules')
        this.scoreRuleData = data
      },
      // 获取成长任务
      async getGrowth() {
        const {
          data
        } = await this.$get('api/score/queryScoreTask')
        this.growthData = data.growth
      },
      //获取邀请好友基本任务
      async getInvite() {
        const {
          data
        } = await this.$get('api/score/queryScoreTask')
        this.inviteData = data.daily
        //this.continuousDays = data.continuous_days
      },
      //签到查询
      async getSevenClock() {
        const {
          data
        } = await this.$get('api/score/querySevenClock')
        this.attendance = data.attendance
        this.continuousDays = data.continuous_days
        this.isClock = data.is_clock
        this.signIntegral = this.attendance[this.continuousDays - 1]
        this.dayScore = this.attendance[this.continuousDays - 1].score
        if (this.isClock == true) {
          this.sign = true;
        } else {
          this.sign = false;
        }
      },
      //获取当前积分
      async getNowScore() {
        const {
          data
        } = await this.$get('api/score/queryNowScore')
        this.nowScore = data.score
      },
      //查询积分商品
      async getScoreGoods() {
        const {
          data
        } = await this.$get('api/score/queryScoreGoods')
        this.scoreGoodsData = data
        // console.log("------------",data)
      },
      clickFriends() {
        //this.sign = false;
        this.inviteFriends = true;
      },

      //获取放大海报图
      async getGeneratePoster() {
        const {
          data
        } = await this.$get('/api/user/getGeneratePoster', this.params)
        if(data!=undefined){
          this.GenerateImg = data
          window.open(this.GenerateImg.url)
          // var name = "邀请新好友注册_" + val
          //tools.downloadImg(this.GenerateImg.url,this.GenerateImg.nickname)

        }
      },

      downloadPosters(val, img) {
        this.params.type = val
        this.params.linkUrl = img
        this.getGeneratePoster()
      },
      immediatelyChange(r) {
        if( this.exchange.mobile == ''){
          this.$message.error("请先绑定手机号")
        }else{
           this.immediatelyChangeWindow = true
           this.goodId = r;
        }

      },
      async verificationClick() {
        var params = {
          goodsId:this.goodId,
          orderSource:1
        }
         const data = await this.$get('api/score/buyGood',params,true)
         if (data.errCode == '0') {
           this.$message.success(data.errMsg)
           this.immediatelyChangeWindow = false
         } else {
           this.$message.error(data.errMsg)
           return false
         }
      },
      async onCode() {
        var params = {}
          const data = await this.$get('/api/user/sms/send/wxChangeBind',params,true)
        // console.log("===========",data)
          if (data.errCode == '0') {
            this.$message.success(data.errMsg)
            this.disabled = 0
          } else {
            this.$message.error(data.errMsg)
            return false
          }
          this.show.codeShow = true
          this.countDown = setInterval((res) => {
            this.newTime = this.newTime - 1;
            if (this.newTime == 0) { //移除定时器
              clearInterval(this.countDown)
              this.show.codeShow = false
              this.newTime = 60
            }
          }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
  .seore-bottom{width: 80px;
height: 9px;
background: #FFE7E7;
border-radius: 5px;}
  /deep/.tabbutton {
    font-size: 14px;
    color: #fff;
    background-color: $rdx-primary;
  }

  /deep/.tabbutton:hover {
    background-color: $rdx-error;
  }

  /deep/.tab_button {
    color: #fff;
    background-color: $rdx-primary;
  }

  /deep/.tab_button:hover {
    background-color: $rdx-error;
  }

  .banButton {
    opacity: 0.5;
  }

  .sub {
    padding-left: 20px;
    color: $rdx-tips-color;
    font-size: 14px;

    .line {
      margin: 0 6px;
    }
  }


  .no-p {
    padding-left: 6px;
  }

  .score-top {
    width: 100%;
    height: 120px;
    padding: 0 60px;
    background: url(../../assets/imgs/my_store.jpg);
    background-size: 100% 100%;

    .cur-text {
      color: $rdx-main-color;
      font-size: 14px;
    }

    .cur-score {
      margin-left: 13px;
      color: #FFFFFF;
      font-size: 32px;
    }
  }

  .rule-btn {
    background: #6F86E6;;
    width: 76px;
    height: 26px;
    border-radius: 3px;
    color: #FFFFFF;
    border: 0px;
    text-align: center;
  }

  .cell {
    padding: 20px 0 ;
    border-bottom: 1px solid $rdx-border-color;
  }

  /*视频*/
  .active {
    font-weight: bold;
    color: $rdx-primary;
    font-size: 20px;
  }

  .line-data {
    width: 60px;
    height: 4px;
    background: $rdx-primary;
    border-radius: 2px;
    bottom: 0px;
  }

  .sign-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 61px;
    height: 61px;
    margin-right: 24px;
    color: $rdx-tips-color;
    background: #eee;
    border-radius: 10px;

    .sign-img-box {
      position: relative;
      margin-top: 4px;

      .sign-img {

        width: 30px;
        height: 30px;
      }

      .sign-text {
        position: absolute;
        top: 7px;
        left: 7px;
        font-size: 12px;
      }
    }

    &.sign-active {
      color: $rdx-light-color;
      background: $rdx-primary;
    }
  }

  .rdx-m-lr-10 {
    margin: 0 10px;
  }

  .w-704 {
    width: 704px;
  }

  .shop {
    padding-top: 20px;
    border-bottom: 0;
  }

  .score-card {
    width: 252px;
    height: 100px;
    margin: 10px;
    padding: 20px;
    background: url('../../assets/imgs/my_store_bg.png') no-repeat left top;
    background-size: 100% 100%;
    .img {
      width: 20px;
      height: 22px;
      margin: 0 8px 0 10px;
    }

    .gold {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }
  /deep/.el-input--small .el-input__inner {
  	    height: 40px;
  	    line-height: 40px;
  	}
    /deep/.el-dialog__header{padding: 0px; height:60px;background: #F8F8F8; line-height:60px; padding-left: 20px;
     display: flex;
     align-items: center;
     }
  .box .my-score {
    /deep/.el-dialog__body{padding: 0px 0px 30px 0px;}
    /deep/.el-table th{background-color: transparent!important;}
    /deep/.el-table--small td{padding: 10px 0px!important; font-weight:lighter}
  }
</style>
