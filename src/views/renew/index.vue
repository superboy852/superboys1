<template>
  <div style="margin: 0px auto;background: #5D5D5D;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction renwe-show" style="margin: 0px auto; max-width: 1620px; min-width: 1200px;">
      <div class="flex flex-direction align-center">
        <span class="renwe-title rdx-m-t-60">抖音一站式数据分析平台</span>
        <div class="flex align-center">
          <img src="../../assets/imgs/pay_bg_8.png" style="width: 118px; height: 8px;" >
          <span class="renwe-title2 rdx-p-lr-22">多项权益，助力抖音直播电商</span>
          <img src="../../assets/imgs/pay_bg_9.png" style="width: 118px; height: 8px;" >
        </div>
      </div>
      <div class="flex w-100 justify-between" v-if="groupItemNew != ''">
        <div class="flex renwe-item flex-direction rdx-m-t-80" v-for="(box,index) in 5" :key="index">
          <div class="flex flex-direction align-center position-re rdx-p-b-20" :class="'renweItem' + index">
            <span class="rdx-font-20 font-strong rdx-p-t-58" :class="index >2 ? 'rdx-light-color' : ''">{{groupItemNew.vip_pack_info_response_list[index].name}}</span>
            <div class="flex rdx-font-14 rdx-p-t-46 align-end":class="index >2 ? 'rdx-light-color' : ''">￥ <span class="rdx-font-30 font-strong" style="margin: 3px 6px 0px 6px; position: relative; top: 3px;">{{groupItemNew.vip_pack_info_response_list[index].month_price}}</span> /月</div>
            <div class="flex rdx-line-height-36 rdx-p-t-28" :class="index >2 ? 'rdx-light-color' : ''" v-html="groupItemNew.vip_pack_info_response_list[index].intro">
            </div>
            <div class="button-1 rdx-content-color rdx-m-t-28 rdx-m-b-28 position-ab" style="bottom: -6px;" v-if="index == 0">当前已是免费版</div>
            <div class="button-2 rdx-content-color rdx-m-t-28 rdx-m-b-28 position-ab" style="bottom: -6px;" v-if="index > 0"  @click="buyAdmin(index - 1)">购买</div>
            <div class="position-ab" style="top: 0px; left: -1px;">
              <img src="../../assets/imgs/pay_bg_6.png" style="width: 77px; height: 32px;" v-if="index != 0 && index < 3">
              <img src="../../assets/imgs/pay_bg_7.png" style="width: 77px; height: 32px;" v-if="index != 0 && index >= 3">
            </div>
          </div>
          <div class="flex rdx-font-14 flex-direction rdx-p-lr-30 w-100 rdx-bg-color rdx-line-height-30" v-for="(boxS,index2) in groupItemNew.vip_function_groupItem_list" :key="index2">
            <span class="rdx-font-14 title-1 font-strong">{{boxS.function_group}}</span>
            <div class="flex justify-between" v-for="(boxSS, index3) in boxS.vip_function_item_list" :key="index3">
              <span class="con-title">{{boxSS.function_name}}</span>
              <span class="rdx-font-12" :class="numberS.value > 0 ? 'rdx-primary' : 'rdx-success'" v-for="(numberS,index4) in groupItemNew.vip_pack_info_response_list[index].vip_pack_function_item_list" v-if="numberS.function_id == boxSS.function_id">
                {{numberS.value > 0 ? numberS.value + '条' : "无限制"}}
              </span>
            </div>
          </div>
          <div class="rdx-bg-color w-100 flex" style="height: 15px;"></div>
        </div>
      </div>
    </div>
    <!--付费弹窗-->
    <pay-up class="position-ab zIndex" :members='val.members' v-if="show.payShow" @submitOk="submitOk"
      @closePay="closePay"></pay-up>
</div>
</template>
<script>
  import payUp from "@/components/payUp.vue"
  import top from '@/layout/components/Top.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      payUp,top
    },
    data() {
      return {
        groupItemNew:"",
        interestsData: [],
        groupItem: [],
        interestsGroup: {},
        listItem: [],
        show: {
          payShow: false, //付费弹窗
        },
        val: {
          members: '1', //会员等级 1免费普通  2基础 3高级 4专业 5旗舰
        },
        paramsSub: {}, //轮询订单id
      }
    },
    computed: {
      ...mapGetters(['token','user'])
    },
    mounted() {
      this.interestsList()
      console.log("user1",this.user)
    },
    methods: {
      //购买会员
      buyAdmin(index) {
        console.log("token", index)
        if (this.token == '') {
          this.saveTokenOk("51000")
          return false
        }
        this.show.payShow = true
        this.val.members = index

      },
      //关闭购买会员弹窗
      closePay() {
        this.show.payShow = false
      },
      //提交订单
      submitOk(order_id) {
        // this.val.orderId = order_id
        this.paramsSub = {
          orderId: order_id
        }
        //轮询暂时未用
        // this.submitTime = setInterval(()=>{
        //   this.getOrder()
        // },5000)
        // this.show.payShow = false
      },
      //轮询订单
      async getOrder() {
        const {
          data
        } = await this.$get('/api/vip/queryOrderPayState', this.paramsSub)
        console.log("okkk", data, this.paramsSub)
        if (data.pay_status == 1) {
          this.show.payShow = false
          this.$message.success("购买会员支付成功")
          clearInterval(this.submitTime)
        }
      },
      //获取会员权益数据
      async interestsList() {
        const {
          data
        } = await this.$get('/api/vip/queryVipInfo')
        this.groupItemNew = data
      },
      ...mapActions(['saveTokenOk']),
    }
  }
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
