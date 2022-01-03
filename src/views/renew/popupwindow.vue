<template>
  <div class="renwe-show flex flex-direction" style="min-width: 1360px;">
    <div class="flex"><img src="../../assets/imgs/renew_banner.png" style="width: 100%; height: 400px;"></div>
    <div class="flex justify-around" style="margin-top: -140px;" v-if="listItem != ''">
      <div class="flex flex-direction" style="width: 250px;">
        <div class="renwe-item flex flex-direction align-center position-re" style="z-index: 2;">
          <strong class="font-strong rdx-font-20 rdx-p-t-56">{{listItem[0].name}}</strong>
          <div class="rdx-font-14 font-strong rdx-p-t-48">￥ <i class="rdx-font-26">{{listItem[0].month_price}}</i> /月
          </div>
        </div>
        <div class="flex w-100 item-box position-re flex-direction rdx-line-height-35"
          style="z-index: 8; margin-top: -3px;">
          <span v-html="listItem[0].intro"></span>
          <div class="flex justify-center rdx-line-height-42 rdx-radius-24 border-item rdx-tips-color position-ab"
            style="bottom: 26px;">当前已是免费版</div>
        </div>
      </div>
      <div class="flex flex-direction" style="width: 250px;">
        <div class="renwe-item flex flex-direction align-center position-re" style="z-index: 2;">
          <div class="flex align-center justify-center rdx-p-t-30">
            <img src="../../assets/imgs/renew_ico_1.png" style="width: 44px; height: 48px;">
            <strong class="font-strong rdx-font-20 rdx-p-l-16">{{listItem[1].name}}</strong>
          </div>
          <div class="rdx-font-14 font-strong rdx-p-t-48">￥ <i class="rdx-font-26">{{listItem[1].month_price}}</i> /月
          </div>
        </div>
        <div class="flex w-100 item-box position-re flex-direction rdx-line-height-35"
          style="z-index: 8; margin-top: -3px;">
          <span v-html="listItem[1].intro"></span>
          <!-- <span style="text-decoration:line-through" class="rdx-tips-color">电商相关功能受限</span> -->
          <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role == 1" @click="buyAdmin('0')">续费</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role < 1 && user.role != 1" @click="buyAdmin('0')">购买升级</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role > 1  && user.role != 1" @click="buyAdmin('0')">购买</div>
        </div>
      </div>
      <div class="flex flex-direction" style="width: 250px;">
        <div class="renwe-item2 flex flex-direction align-center position-re" style="z-index: 2;">
          <div class="flex align-center justify-center rdx-p-t-30">
            <img src="../../assets/imgs/renew_ico_2.png" style="width: 44px; height: 48px;">
            <strong class="font-strong rdx-font-20 rdx-p-l-16">{{listItem[2].name}}</strong>
          </div>
          <div class="rdx-font-14 font-strong rdx-p-t-48">￥ <i class="rdx-font-26">{{listItem[2].month_price}}</i> /月
          </div>
        </div>
        <div class="flex w-100 item-box position-re flex-direction rdx-line-height-35"
          style="z-index: 8; margin-top: -3px;">
          <span v-html="listItem[2].intro"></span>
          <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role == 2" @click="buyAdmin('1')">续费</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role < 2 && user.role != 2" @click="buyAdmin('1')">购买升级</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role > 2  && user.role != 2" @click="buyAdmin('1')">购买</div>
        </div>
      </div>
      <div class="flex flex-direction" style="width: 250px;">
        <div class="renwe-item3 flex flex-direction align-center position-re" style="z-index: 2;">
          <div class="flex align-center justify-center rdx-p-t-30">
            <img src="../../assets/imgs/renew_ico_2.png" style="width: 44px; height: 48px;">
            <strong class="font-strong rdx-font-20 rdx-p-l-16">{{listItem[3].name}}</strong>
            <span class="item-tag flex justify-center align-center rdx-font-12 position-ab">个人</span>
          </div>
          <div class="rdx-font-14 font-strong rdx-p-t-48">￥ <i class="rdx-font-26">{{listItem[3].month_price}}</i> /月
          </div>
        </div>
        <div class="flex w-100 item-box position-re flex-direction rdx-line-height-35"
          style="z-index: 8; margin-top: -3px;">
          <span v-html="listItem[3].intro"></span>
          <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role == 3" @click="buyAdmin('2')">续费</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role < 3 && user.role != 3" @click="buyAdmin('2')">购买升级</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role > 3  && user.role != 3" @click="buyAdmin('2')">购买</div>
        </div>
      </div>
      <div class="flex flex-direction" style="width: 250px;">
        <div class="renwe-item3 flex flex-direction align-center position-re" style="z-index: 2;">
          <div class="flex align-center justify-center rdx-p-t-30">
            <img src="../../assets/imgs/renew_ico_2.png" style="width: 44px; height: 48px;">
            <strong class="font-strong rdx-font-20 rdx-p-l-16">{{listItem[4].name}}</strong>
            <span class="item-tag flex justify-center align-center rdx-font-12 position-ab">企业</span>
          </div>
          <div class="rdx-font-14 font-strong rdx-p-t-48">￥ <i class="rdx-font-26">{{listItem[4].month_price}}</i> /月
          </div>
        </div>
        <div class="flex w-100 item-box position-re flex-direction rdx-line-height-35"
          style="z-index: 8; margin-top: -3px;">
          <span v-html="listItem[4].intro"></span>

          <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role == 4" @click="buyAdmin('3')">续费</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role < 4 && user.role != 4" @click="buyAdmin('3')">购买升级</div>
            <div class="button-a flex justify-center rdx-line-height-42 rdx-radius-24 border-item2 rdx-p-lr-16 position-ab" style="bottom: 26px;" v-if="user.role > 4  && user.role != 4" @click="buyAdmin('3')">购买</div>
        </div>
      </div>
    </div>
    <div class="flex flex-direction align-center" v-for="(group, index) in groupItem" :key="index">
      <strong class="rdx-font-32 rdx-p-t-60 rdx-p-b-30">{{ group.function_group }}</strong>
      <div class="flex flex-direction w-100 rdx-p-10">
        <div class="flex">
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30"></div>
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30 font-strong">普通会员</div>
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30 font-strong">基础版</div>
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30 font-strong">高级版</div>
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30 font-strong">专业版</div>
          <div class="rdx-flex-1 rdx-text-center rdx-p-t-10 rdx-p-b-30 font-strong">旗舰版</div>
        </div>
        <div class="fun-con flex rdx-font-16 flex-direction">

          <div class="flex w-100 line-bottom" v-for="(line, index) in group.vip_function_item_list" :key="index">
            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center">{{ line.function_name }}</div>

            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center fun-con-left">{{line.putong}}</div>
            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center fun-con-left">{{line.jichu}}</div>
            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center fun-con-left">{{line.gaoji}}</div>
            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center fun-con-left">{{line.zhuanye}}</div>
            <div class="rdx-flex-2 rdx-line-height-80 rdx-text-center">{{line.qijian}}</div>
          </div>
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
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      payUp
    },
    data() {
      return {
        interestsData: [],
        groupItem: [],
        interestsGroup: {},
        listItem: [],
        show: {
          payShow: false, //付费弹窗
        },
        val: {
          members: '0', //会员等级
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
        console.log("token", this.token)
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
        this.groupItem = data.vip_function_groupItem_list
        console.log(this.groupItem);
        this.listItem = data.vip_pack_info_response_list
        for (var x = 0; x < this.groupItem.length; x++) {
          for (var y = 0; y < this.groupItem[x].vip_function_item_list.length; y++) {
            for (var i = 0; i < this.listItem.length; i++) {
              var key = this.listItem[i].pack_id
              for (var j = 0; j < this.listItem[i].vip_pack_function_item_list.length; j++) {
                if (this.groupItem[x].vip_function_item_list[y].function_id == this.listItem[i]
                  .vip_pack_function_item_list[j].function_id) {
                  this.$set(this.groupItem[x].vip_function_item_list[y], key, this.listItem[i]
                    .vip_pack_function_item_list[j].title)
                }
              }
            }
          }
        }
        // console.log(1111111111111111111111111111111111);
        // console.log(this.groupItem);
        this.groupItem.forEach(item => {
          this.interestsData.push(item.vip_function_item_list)
        })
        // console.log('1', this.groupItem)
        // console.log('2', this.listItem)
        // console.log('3', this.interestsData)
      },
      ...mapActions(['saveTokenOk']),
    }
  }
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
