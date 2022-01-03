<template>
  <div>
    <div class="close-login" @click="closePay"></div>
    <div class="flex flex-direction pay-box" style="width: 956px;" :style="show.payOk == true?'display: none;' : ''">
        <!--弹窗 -->
        <div class="flex flex-direction" v-if="!show.payOk">
            <div class="pay-head flex justify-between rdx-p-l-36 rdx-p-r-20 rdx-light-color align-center">
              <span>您当前是{{user.vip_pack_name}}</span>
              <i class="iconfont icon-e686 rdx-font-30 button-a" @click="closePay"></i>
            </div>
            <div class="flex position-re pay-top">
              <img :src="val.membersNew == index ? locationUrl + urlS.urlA : locationUrl + urlS.urlB" v-for="(urlS,index) in getData.tabList" :key="index" @click="gjhy(index)" style="width: 239px; height: 63px;" class="button-a">
            </div>
            <div class="rdx-font-12 rdx-p-l-34 rdx-tips-color rdx-p-t-34 rdx-p-b-24">发现热门商品、品牌 分析助力商家投放</div>
            <!-- 续费时间 -->
            <div class="flex justify-around rdx-p-lr-10" v-if="getData.infoData != ''">
              <div class="flex xfxz align-center button-a position-re" v-for="(priceS,index2) in getData.infoDataBox" :class="show.timeIndex == index2 ? 'xfxz-ok' : '' " @click="timeOk(index2,priceS.id,priceS.real_price)">
                <span class="rdx-m-l-8">{{priceS.title}}</span>
                <b style="margin-top: -3px;">
                  <span class="rdx-font-18 rdx-primary rdx-m-l-20">￥</span>
                  <span class="rdx-font-24 rdx-primary rdx-m-l-4">{{priceS.real_price}}</span>
                </b>
                <div class="time-bg" v-if="show.timeIndex == index2">
                  <i class="iconfont icon-e608 rdx-light-color position-ab" style="bottom: 1px; right: 0px;"></i>
                </div>
              </div>

            </div>
            <!-- 支付方式 -->
            <div class="flex align-center rdx-m-t-30">
              <p class="flex rdx-m-l-35 rdx-font-14">支付方式</p>
              <div class="flex rdx-m-l-30 zf-button align-center button-a position-re rdx-m-r-12" :class="params.payType == 'alipay' ? 'zf-button-ok' : '' " @click="payType('alipay')">
                <img src="../assets/imgs/zfb.png" style="width: 23px; height: 23px;margin-left: 27px;" />
                <p class="rdx-m-l-12">支付宝</p>
                <div class="time-bg2" v-if="params.payType == 'alipay'">
                  <i class="iconfont icon-e608 rdx-light-color position-ab rdx-font-10" style="bottom: 0px; right: 0px;"></i>
                </div>
              </div>
    <!--          <div class="flex rdx-m-l-30 zf-button align-center button-a position-re rdx-m-r-12" :class="params.payType == 'wxpay' ? 'zf-button-ok' : '' " @click="payType('wxpay')">
                <img src="../assets/imgs/wxzf.png"  style="width: 23px; height: 23px;margin-left: 27px;" />
                <p class="rdx-m-l-12">微信</p>
                <div class="time-bg2" v-if="params.payType == 'wxpay' ">
                  <i class="iconfont icon-e608 rdx-light-color position-ab rdx-font-10" style="bottom: 0px; right: 0px;"></i>
                </div>
              </div> -->
              <el-button type="text" @click="publicTransfer">对公转账？</el-button>
            </div>




            <!-- 推荐人 -->
        <!--    <div class="flex position-re" style="width: 825px;">
              <div class="flex  rdx-m-t-25 align-center" style="display: none;">
                <p style="font-size: 14px;margin-left: 35px;">推荐人</p>
                <el-input placeholder="输入推荐人姓名" style="width: 283px;margin-left: 44px;"></el-input>
              </div>

            </div> -->
            <!-- 支付金额 -->
            <div class="flex position-re flex-direction">
              <div class="flex align-end rdx-p-t-28 rdx-p-b-40 rdx-p-l-36">
                <span style="color: #333;font-size: 14px;margin-bottom: 5px;">支付金额</span>
                <b class="rdx-primary">
                  <span class="rdx-font-24 rdx-m-l-30">￥</span>
                  <span class="rdx-font-30 rdx-m--8">{{val.price}}</span>
                </b>
              </div>

<!--              <div class="flex align-center position-ab button-a" style="right: 0px;top: -28px;">
                <p style="font-size: 14px;color: #a5a5a5;">微信客服</p>
                <img src="../assets/imgs/wx.png" style="width: 28px; height: 28px; margin-left: 8px; margin-right: 34px;" />
              </div> -->
              <div class="flex rdx-p-l-36 rdx-m-b-40">
                <div class="tabbutton flex align-center justify-center button-a" @click="submitOk">立即开通</div>
              </div>
              <div>
              </div>
            </div>
            <!-- 底部 -->
            <div class="flex rdx-m-l-35 rdx-m-r-34 align-center" style="border-top: 1px solid #e5e5e5;">
              <div class="flex rdx-m-t-26 w-100 rdx-m-b-26 justify-between align-center">
                <p class="font-strong rdx-font-14 rdx-tips-color">会员特权</p>
                <div class="rdx-m-l-20 flex align-center">
                  <img src="../assets/imgs/cxgdsj.png" style="width: 16px; height: 15px;" />
                  <span style="margin-left: 6px;font-size: 14px;color: #666;">查询更多数据</span>
                </div>
                <div class="rdx-m-l-20 flex align-center">
                  <img src="../assets/imgs/zyscxz.png" style="width: 15px; height: 13px;" />
                  <span style="margin-left: 6px;font-size: 14px;color: #666;">资源收藏下载</span>
                </div>
                <div class="rdx-m-l-20 flex align-center">
                  <img src="../assets/imgs/gdxgj.png" style="width: 13px; height: 12px;" />
                  <span style="margin-left: 6px;font-size: 14px;color: #666;">更多小工具</span>
                </div>
                <div class="rdx-m-l-20 flex align-center">
                  <img src="../assets/imgs/dhzstq.png" style="width: 13px; height: 13px;" />
                  <span style="margin-left: 6px;font-size: 14px;color: #666;">带货助手特权</span>
                </div>
                <el-button style="width: 146px;height: 30px; margin-left: 20px;color: #666;">了解更多会员特权</el-button>
                <div class="flex align-center button-a">
                  <img src="../assets/imgs/wx.png" style="width: 28px; height: 28px; margin-right: 4px;" />
                  <p style="font-size: 14px;color: #a5a5a5;">微信客服</p>
                </div>
              </div>
            </div>
          </div>
          <!--支付完成-->
          <div class="flex w-100 justify-center align-center" v-if="show.payOk">
            <div class="flex flex-direction" style="width: 186px;">
              <div class="flex justify-center rdx-font-20 rdx-primary rdx-p-t-24">微信扫描二维码</div>
              <div class="login-wx rdx-m-t-18 flex align-center justify-center position-re">
                <img :src="val.linkUrl" style="width: 155px; height: 155px;" >
              </div>
              <div class="flex rdx-font-12 flex-direction align-center rdx-p-t-26 rdx-p-b-30">
                <span>欢迎使用观星树数据</span>
                <span class="rdx-p-t-10">请使用微信扫码支付</span>
              </div>
            </div>
          </div>
      </div>


  <!-- 对公转账弹窗 -->
      <div v-if="transfer" style="width: 750px; position: fixed; top: 100px; left: 500px; z-index: 9999999; background-color: #FFFFFF;border-radius: 10px;">

        <p style="padding: 20px 0 0 20px; font-size: 16px;">企业对公转账</p>
        <div class=" justify-around flex flex-direction justify-center" style="margin-top: 30px;">
          <div class="borderb rdx-p-b-30 flex flex-direction rdx-font-16 rdx-main-color" style="width: 560px;padding: 30px 50px;margin: 0 70px;">
            <div class="rdx-m-b-20 flex justify-between">
              <span class="rdx-content-color " style="width: 67px;">账户名称</span>
              <span style="width: 300px;" class="rdx-line-1 rdx-m-l-30" id="copy">{{accountTitle}}</span>
              <el-button type="primary" class="button-all rdx-m-l-20" style="width: 50px;height: 22px;padding: 0px 5px;line-height: 22px;" @click="copy(accountTitle)"><span style="">复制</span></el-button>
            </div>
            <div class="rdx-m-b-20 flex justify-between">
              <span class="rdx-content-color" style="width: 67px;">银行账户</span>
              <span style="width: 300px;" class="rdx-line-1 rdx-m-l-30">{{bankAccount}}</span>
              <el-button type="primary" class="button-all rdx-m-l-20" style="width: 50px;height: 22px;padding: 0px 5px;line-height: 22px;" @click="copy(bankAccount)">复制</el-button>
            </div>
            <div class=" flex justify-between">
              <span class="rdx-content-color" style="width: 67px;height: 20px;">开户行</span>
              <span style="width: 300px;" class="rdx-line-1 rdx-m-l-30">{{openingBank}}</span>
              <el-button type="primary" class="button-all rdx-m-l-20" style="width: 50px;height: 22px;padding: 0px 5px;line-height: 22px;" @click="copy(openingBank)">复制</el-button>
            </div>
          </div>
          <div style="text-align: center;" class="rdx-tips-color rdx-font-14 rdx-m-t-26 flex flex-direction">
            <span>对公转账到账时间可能受银行处理时间影响，建议采用在线支付</span>
            <span>请通过网银转账或自行到银行进行转账，转账成功后请将汇款底单拍照或截图发送给客服</span>
            <span>确认汇款到账后即会为您开通相关会员,开通后可在个人中心索取发票</span>
          </div>
          <div class="w-100  rdx-p-b-60" style="text-align: center;margin-top: 94px;">
            <el-button type="primary" style="width: 192px;" class="button-all rdx-font-16" @click="know">知道了</el-button>
          </div>

        </div>

      </div>


  </div>
</template>

<script>
  import { baseUrl } from '@/config'
  import * as tools from '@/common/tools.js';
  import { locationUrl } from '@/config'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props:{
      members:{
        type:Number,
        default:0
      }
    },
    data() {
      return {
        locationUrl:'',
        transfer:false,
        accountTitle:'厦门蝉羽网络科技有限公司',
        bankAccount:'3515 0198 8701 0000 2552',
        openingBank:'中国建设银行股份有限公司厦门科技支行',
        getData:{
          infoData:[],//会员等级及价格
          infoDataBox:[],//几个月及价格
          tabList:[
            {
              urlA:"/img/pay_tab1.png",
              urlB:"/img/pay_tab1A.png"
            },
            {
              urlA:"/img/pay_tab2.png",
              urlB:"/img/pay_tab2A.png"
            },
            {
              urlA:"/img/pay_tab3.png",
              urlB:"/img/pay_tab4A.png"
            },
            {
              urlA:"/img/pay_tab4.png",
              urlB:"/img/pay_tab4A.png"
            }
          ]
        },
        val:{
          price:0,//价格
          linkUrl:"",//二维码地址
          membersNew:"",//头部tab
        },
        show:{
          timeIndex:'0',//选择时间
          payOk:false,//弹窗二维码
        },
        params:{
           payType:'alipay',//选择支付
           orderSource:'pc',//支付源（pc，app，h5
           aliReturnUrl:"http://121.40.149.42:8086/my/my_order"//支付回跳地址 上线要修改成正式网址
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'user'])
    },
    mounted() {
      this.val.membersNew = this.members
      this.locationUrl = locationUrl
      this.getPrice()
    },
    methods: {
      copy(text){
        tools.copy(text)
        this.$message.success('复制成功!')
      },
      //提交订单
      async submitOk(){
        const {data} = await this.$post('/api/vip/createOrder',this.params)
        // console.log("data",data)
        if(data.errCode == 0){
          if(this.params.payType == 'alipay'){
            console.log("123",this.params)
            this.datadorm = data.data.alipay_url;
            const div = document.createElement('div');
            div.innerHTML = this.datadorm;
            document.body.appendChild(div);
            document.forms.punchout_form.submit();
          }else{
            this.val.linkUrl = data.data.wechat_img
            this.show.payOk = true
          }
        }else{
          this.$message.error("会员购买不成功,请联系客服")
        }
        setTimeout(()=>{
          this.$emit("submitOk",data.data.order_id)
        },600)
      },
      //关闭弹窗
      closePay(){
        this.$emit("closePay",false)
      },
      publicTransfer(){ //对公转账
        this.transfer = true
        this.show.payOk = true
      },
      //选择时间
      timeOk(index,id,price){
        this.show.timeIndex = index
        this.params.vipPackPriceId = id
        this.val.price = price
      },
      //选择支付方式
      payType(index){
        this.params.payType = index
      },
      gjhy(i) {
        this.getData.infoDataBox = []
        this.val.membersNew = i;
        this.getData.infoDataBox = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list
        this.val.price = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list[this.show.timeIndex].real_price
        this.params.vipPackPriceId = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list[this.show.timeIndex].id
        this.$forceUpdate()
      },
      //获取套餐价格
      async getPrice(){
        var data = await this.$get('/api/vip/queryPriceInfo')
        this.getData.infoData = data.data.vip_pack_info_response_list
        this.getData.infoData.shift()
        this.params.vipPackPriceId = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list[0].id
        this.val.price = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list[0].real_price
        this.getData.infoDataBox = this.getData.infoData[this.val.membersNew].vip_pack_price_item_list
        this.$forceUpdate()
      },
      ...mapActions(['saveToken', 'saveUser']),
      know(){
        this.transfer = false
        this.show.payOk = false
      }
    }
  }
</script>

<style lang="scss" scoped>

.borderb{border-bottom: 1px solid #eee;}
  .close-login{position: fixed; z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000000;}
  .pay-box{
    position: fixed; z-index: 999999; left:50%; top:50%;
        margin: -296px 0px 0px -412px;
        background: #FFFFFF;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        border-radius: 20px;
        .top-login {
        height: 3px;
        background: #eeeeee;
        border-radius: 2px;
      }
  }
.pay-head{width: 100%; height: 68px; background: $rdx-main-color; border-radius: 10px 10px 0px 0px;}
.time-bg{position: absolute; right:-1px; bottom:-1px; background: url(../assets/imgs/pay_ico_1.png) no-repeat left top; width:28px; height:24px; background-size: 100%;}
.time-bg2{position: absolute; right:0px; bottom:-1px; background: url(../assets/imgs/pay_ico_1.png) no-repeat left top; width:18px; height:16px; background-size: 100%;}
  .imagewh {
    width: 45px;
    height: 46px;
  }
.windowtop {
    height: 63px;
  }
.text {
    font-size: 20px;
    color: #3B3734;
  }
.xfxz {
    width: 172px;
    height: 67px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
  }
.xfxz:hover {
    border: 1px solid $rdx-primary;
    background-color: #FEE4E7;
    box-shadow: 0px 0px 3px 0px $rdx-primary;
  }
.xfxz-ok{background-color: #FEE4E7; border: 1px solid $rdx-primary;}
.clickxfxz {
    width: 172px;
    height: 67px;
    border-radius: 5px;
    border: 1px solid $rdx-primary;
  }
.zf-button {
    width: 136px;
    height: 37px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
  }
.zf-button:hover {
    border: 1px solid $rdx-primary;
    box-shadow: 0px 0px 3px 0px $rdx-primary;
  }
.zf-button-ok {
    border: 1px solid $rdx-primary;
  }
.pay-top{height:63px; width:100%;}
.pay-top-color{color: #E3CCB1;}
/deep/.tabbutton {
    color: #fff;
    background-color: $rdx-primary;
    width: 200px;
    height: 40px;
    margin-right: 34px;
    font-size: 16px;
    border-radius: 5px;
  }
  /deep/.tabbutton:hover {
      background-color: $rdx-pink;
    }
    //微信
    .login-wx{width: 186px; height: 186px; background: url(../assets/imgs/login_pc_ico_1.png) no-repeat left top; background-size: 100%;}
</style>
