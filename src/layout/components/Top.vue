<template>
  <!--    :style="collapsed ? 'max-width:' + (val.cilenWidth - 70) + 'px' : 'max-width:' + (val.cilenWidth -200) + 'px' " style="min-width:1000px " -->
  <div class="base-header flex align-center justify-between">
    <div style="position: fixed; height: 100%; width: 100%; left: 0px; top: 0px; z-index: 98;" v-if="show.searchMain"
      @click="closeSearch"></div>
    <div class="flex rdx-font-14 align-center">
      <a href="http://www.guanxingshu.com/"><img src="../../assets/imgs/logoC.png" style="width: 122px; height: 41px;"></a>
      <ul class="flex rdx-p-l-20">
        <li v-for="(menuS,index) in menuList" :key="index" class="flex align-center rdx-p-l-20 link-primary"
          :class="show.menuIndex == menuS.m_index ? 'rdx-primary' : ''" @click="tapMenu(menuS.path,menuS.m_index)">
          {{menuS.title}}
          <i class="iconfont icon-e61a" :class="show.menuIndex == menuS.m_index ? 'rdx-primary' : ''"></i>
        </li>
      </ul>
    </div>
    <div class="flex align-center">
      <div class="base-header-item" v-if="val.cilenWidth > 1600">
        <div class="search position-re flex align-center rdx-p-l-10"
          :class="show.searchMain ? 'living-border-click' : ''">
          <el-input placeholder="搜索播主、商品、直播间、抖音小店" v-model="search" @keyup.enter.native="onSearch"></el-input>
          <div class="button-search iconfont icon-e636" @click="onSearch"></div>

          <div class="searchMain flex flex-direction" :class="show.searchMain ? 'search-open' : 'search-close'">
            <div class="flex flex-direction w-100" v-if="show.dataShow">
              <div class="rdx-tips-color rdx-font-14">观星树数据为您找到结果如下</div>
              <div class="flex justify-between rdx-p-t-20">
                <div class="flex flex-direction rdx-flex-1 rdx-p-r-30">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../../assets/imgs/search_ico_1.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">博主</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.userData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlUser">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">博主搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="user in getData.userData" :key="user.author_id" @click="linkUserA(user.author_id)">
                    <img :src="user.avatar" class="round living-border" style="width: 40px; height: 40px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-4">
                      <span class="rdx-line-1" style="width: 260px;">{{user.nickname}}</span>
                      <span class="rdx-tips-color">粉丝数：{{user.follower_count}}</span>
                    </div>
                    <div class="position-ab search-living rdx-font-12 rdx-light-color rdx-text-center"
                      style="top: 10px;">
                      直播</div>
                  </div>
                </div>
                <div class="flex flex-direction rdx-flex-1">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../../assets/imgs/search_ico_2.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">商品</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.projectData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlProduct">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">商品搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="project in getData.projectData" :key="project.promotion_id"
                    @click="linkGoods(project.promotion_id)">
                    <img :src="project.image" class="round" style="width: 40px; height: 40px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-4">
                      <span class="rdx-line-1" style="width: 260px;">{{project.title}}</span>
                      <span class="rdx-primary">￥{{project.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between rdx-p-t-36 rdx-p-b-20">
                <div class="flex flex-direction rdx-flex-1 rdx-p-r-30">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../../assets/imgs/search_ico_3.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">直播记录</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.liveData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlLive">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">直播搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="live in getData.liveData" :key="live.live_id" @click="linkLiving(live.live_id)">
                    <img :src="live.live_cover" style="width: 44px; height: 55px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-12">
                      <span class="rdx-tips-color rdx-line-height-26" style="width: 260px;">{{live.room_title}}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-direction rdx-flex-1">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../../assets/imgs/search_ico_4.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">抖音小店</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.shopData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlShop">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">小店搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="shop in getData.shopData" :key="shop.shop_id" @click="linkShop(shop.shop_id)">
                    <img :src="shop.shop_icon" style="width: 44px; height: 55px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-12">
                      <span class="rdx-line-1" style="width: 260px;">{{shop.shop_name}}</span>
                      <span class="rdx-tips-color rdx-line-height-26">昨日销量：{{shop.amount}}</span>
                      <span class="rdx-tips-color flex align-center">
                        <span>主营品类：</span>
                        <span class="search-tag rdx-primary">{{shop.category}}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-100 justify-center rdx-p-t-80 position-re align-center" v-if="!show.dataShow">
              <img src="../../assets/imgs/data_video.png" style="width: 120px; height: 114px; opacity: 0.3;">
              <img src="../../assets/imgs/loading.gif" class="position-ab" style="width: 40px; height: 40px;">
            </div>
          </div>
        </div>
      </div>


      <div class="position-re flex align-center" v-if="show.loginOk">
        <div class="flex rdx-m-l-10 align-center button-a" @click="onUser">
          <el-avatar :src="user.avatar" size="small" class="rdx-m-r-6 rdx-main-color"></el-avatar>
          <span class="rdx-font-14">{{user.nick_name}}</span>
          <i class="el-icon-arrow-down el-icon--right rdx-main-color font-strong rdx-font-12"></i>
        </div>
        <div class="user-bg" v-if="show.userShow" @click="userClose"></div>
        <div class="position-ab user-box flex flex-direction" style="top: 40px; right: 0px; z-index: 1000;" v-if="show.userShow">
          <div class="user-top flex justify-between">
            <div class="flex rdx-light-color">
              <img :src="user.avatar" class="round" style="width: 48px; height: 48px;">
              <div class="flex flex-direction rdx-p-l-16">
                <span class="rdx-font-18">{{user.nick_name}}</span>
                <span class="rdx-font-14 rdx-line-height-26" v-if="user.bind_mobile != ''">{{user.bind_mobile}}</span>
                <span class="rdx-font-14 rdx-line-height-26" v-if="user.bind_mobile == ''">未绑定</span>
              </div>
            </div>
            <div class="user-exit rdx-font-14 button-a" @click="delLogin">退出</div>
          </div>
          <div class="rdx-bg-color flex flex-direction">
            <div class="position-re flex justify-center" style="margin-top: -40px;">
              <div class="user-go flex justify-between align-center">
                <div class="flex align-center">
                  <span class="rdx-font-18 rdx-p-r-8" style="color: #F4E07D;">免费版</span>
                  <span class="rdx-font-14" style="color: #F4E07D;" @click="linkMy"> | 免费获取高级版</span>
                </div>
                <div class="flex user-button-1 align-center button-a justify-center" @click="linkVip">
                  <span class="rdx-font-13">马上升级</span>
                  <i class="iconfont icon-ea82 rdx-font-12"></i>
                </div>
              </div>
            </div>
            <div class="flex w-100">
              <div class="flex rdx-flex-1 flex-direction align-center rdx-p-t-14 rdx-p-b-26 button-a" @click="purchaseRenewal">
                <img src="../../assets/imgs/user_ico_1.png" style="width: 30px; height: 30px;">
                <span class="rdx-font-14 rdx-p-t-6 link-primary">会员购买</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center rdx-p-t-14 rdx-p-b-26 button-a" @click="subjectCollection">
                <img src="../../assets/imgs/user_ico_2.png" style="width: 36px; height: 30px;">
                <span class="rdx-font-14 rdx-p-t-6 link-primary">星光学院</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center rdx-p-t-14 rdx-p-b-26 button-a" @click="productCollection">
                <img src="../../assets/imgs/user_ico_3.png" style="width: 30px; height: 30px;">
                <span class="rdx-font-14 rdx-p-t-6 link-primary">商品收藏</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center rdx-p-t-14 rdx-p-b-26 button-a" @click="message">
                <img src="../../assets/imgs/user_ico_4.png" style="width: 35px; height: 30px;">
                <span class="rdx-font-14 rdx-p-t-6 link-primary">消息通知</span>
              </div>
            </div>
            <div style="width: 100%; height: 8px; background: #EEEEEE; margin: 20px 0px;"></div>
            <div class="flex rdx-p-l-30">
              <div class="flex">
                <div class="flex flex-direction align-center" style="width: 56px;">
                  <img src="../../assets/imgs/user_ico_5.png" style="width: 22px; height: 22px;">
                  <span class="rdx-font-12 rdx-p-t-4">个人中心</span>
                </div>
                <img src="../../assets/imgs/user_line.png" style="width: 5px; height: 50px; margin: 0px 20px;" >
              </div>
              <div class="flex flex-wrap rdx-font-14 rdx-content-color rdx-line-height-26">
                <span class="rdx-p-r-38 link-primary" @click="linkUser('1')">个人资料</span>
                <span class="rdx-p-r-38 link-primary" @click="linkUser('2')">消息通知</span>
                <span class="rdx-p-r-38 link-primary" @click="linkUser('3')">积分商城</span>
                <span class="rdx-p-r-38 link-primary" @click="linkUser('4')">我的订单</span>
                <span class="rdx-p-r-38 link-primary" @click="linkUser('5')">商品收藏</span>
                <span class="rdx-p-r-38 link-primary" @click="linkUser('6')">开具发票</span>
              </div>
            </div>
            <div class="flex justify-end rdx-p-tb-18">
              <div class="user-line-right"></div>
            </div>
            <div class="flex rdx-p-l-30">
              <div class="flex">
                <div class="flex flex-direction align-center" style="width: 56px;">
                  <img src="../../assets/imgs/user_ico_6.png" style="width: 21px; height: 22px;">
                  <span class="rdx-font-12 rdx-p-t-4">常用功能</span>
                </div>
                <img src="../../assets/imgs/user_line.png" style="width: 5px; height: 50px; margin: 0px 20px;" >
              </div>
              <div class="flex flex-direction rdx-font-14 rdx-content-color rdx-line-height-26">
                <span class="rdx-p-r-38 link-primary" @click="myFollowLive">我关注的直播</span>
                <span class="rdx-p-r-38 link-primary" @click="dataReport">新手指南</span>
              </div>
            </div>
            <div class="flex justify-end rdx-p-tb-18">
              <div class="user-line-right"></div>
            </div>
            <div class="flex rdx-p-l-30 rdx-p-b-30">
              <div class="flex">
                <div class="flex flex-direction align-center" style="width: 56px;">
                  <img src="../../assets/imgs/user_ico_7.png" style="width: 22px; height: 22px;">
                  <span class="rdx-font-12 rdx-p-t-4">数据监测</span>
                </div>
                <img src="../../assets/imgs/user_line.png" style="width: 5px; height: 50px; margin: 0px 20px;" >
              </div>
              <div class="flex flex-direction rdx-font-14 rdx-content-color rdx-line-height-26">
                <span class="rdx-p-r-38 link-primary" @click="videoMonitoring">视频检测</span>
                <span class="rdx-p-r-38 link-primary" @click="liveMonitoring">直播检测</span>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="flex rdx-m-l-20" v-if="!show.loginOk">
        <ul class="login flex">
          <li class="out color-white button-a" @click="onLogin">登录</li>
          <!--        <li class="rdx-text-center rdx-flex-1 button-a">注册</li> -->
        </ul>
      </div>
    </div>

    <!--登录弹窗-->
    <login @onLoginClose="closeLogin" @submitLoginOk="submitLoginOk" v-if="loginShow" class="position-ab zIndex">
    </login>
    <!--付费弹窗-->

    <!--   <el-dialog class="pay-up" :visible.sync="show.payShow" width="825px" :before-close="closeLogin"
      :show-close="butShow">
      <pay-up @submitOk="submitOk" @closePay="closePay"></pay-up>
    </el-dialog> -->
    <pay-up class="position-ab zIndex" v-if="show.payShow" @submitOk="submitOk" @closePay="closePay"></pay-up>
  </div>
</template>

<script>
  import {
    menuShrinkWidth,
    menuEunfoldWidth
  } from '@/config'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import * as tools from '@/common/tools.js';
  import payUp from "@/components/payUp.vue"
  import login from "@/components/login.vue"
  import noData from "@/components/noData.vue"
  export default {
    components: {
      payUp,
      login,
      noData
    },
    data() {
      return {
        menuList: [{
            id: '0',
            title: '工作台',
            path: '/work/index',
            m_index: '/work/index'
          },
          {
            id: '1',
            title: '直播',
            path: '/living/living_search',
            m_index: '/living'
          },
          {
            id: '2',
            title: '商品',
            path: '/goods/goods_search',
            m_index: '/goods'
          },
          {
            id: '3',
            title: '小店&品牌',
            path: '/shop/brands_search',
            m_index: '/shop'
          },
          {
            id: '4',
            title: '达人',
            path: '/talent/talent_search',
            m_index: '/talent'
          },
          {
            id: '5',
            title: '视频&素材',
            path: '/video/video_search',
            m_index: '/video'
          },
          {
            id: '6',
            title: '我的监控',
            path: '/data/data_video',
            m_index: '/data'
          },
          {
            id: '8',
            title: '星观学院',
            path: '/starview/starview_guide',
            m_index: '/starview'
          },
          {
            id: '9',
            title: '购买续费',
            path: '/renew/index',
            m_index: '/renew'
          },
          {
            id: '10',
            title: '个人中心',
            path: '/my/my_user',
            m_index: '/my'
          },
          {
            id: '11',
            title: '推广返利',
            path: '/promotion/index',
            m_index: '/promotion'
          },
          {
            id: '7',
            title: '工具',
            path: '/tool/tool_mind',
            m_index: '/tool'
          }
        ],
        search: '',
        loginShow: false, //登录弹窗
        butShow: false,
        getData: {
          projectData: [],
          liveData: [],
          shopData: [],
          userData: [],

          options: [{
            id: '1',
            name: '抖音',
          }]
        },
        show: {
          codeShow: false,
          loginOk: false, //是否已登录
          searchMain: false, //搜索弹窗
          searchAnimation: false, //动画加载
          dataShow: false,
          payShow: false, //付费弹窗
          loginPc: false, //登录显示 true手机  false微信
          imgIndex: '-1',
          searchGo: false, //搜索是否有结果
          menuIndex: '/work/index', //头部加红
          userShow:false
        },
        val: {
          checkUser: "", //记住账号
          cilenWidth: 0, //屏幕宽度
        },
        indexStorage: {}, //保存到本地缓存数据 包含token user
        params: {},
        dyData: {},
        reverse: false, //消息通知
        activities: [],
      }
    },
    watch: {
      localurl(val){
        this.show.menuIndex = val
        if(this.show.menuIndex == '/work/index'){
          this.show.menuIndex = '/work/index'
        }
      },
      tokenOk(val) {
        if (val == 52000) { //弹窗付费窗口
          setTimeout(() => {
            this.show.payShow = true
          }, 200)
        }
        if (val == 51000) { //弹出登录窗口
          setTimeout(() => {
            this.loginShow = true
            this.deleteToken('')
            this.deleteUser('')
            this.show.loginOk = false
            // this.getWxCode()
          }, 300)
        }
      }
    },
    computed: {
      menusWidth() {
        return this.collapsed ? menuShrinkWidth : menuEunfoldWidth
      },
      ...mapGetters(['collapsed', 'token', 'user', 'tokenOk','localurl'])
    },
    created() {
      this.getMessageList()
      this.val.cilenWidth = document.body.clientWidth
    },
    mounted() {
      //监控屏幕大小
      window.onresize = () => {
          window.screenWidth = document.body.clientWidth
          this.val.cilenWidth = window.screenWidth
          this.$forceUpdate()
        },
        setTimeout(() => {
          console.log("token ok", this.tokenOk, this.token, this.user,this.localurl)
          this.show.menuIndex = this.localurl
          if (this.tokenOk == 51000) { //需要登录
            this.deleteToken('')
            this.deleteUser('')
            this.show.loginOk = false
            this.loginShow = true
          }
        }, 1000)

      // this.searchAll()
      // this.getWxCode()
      this.maxUserRole()
      //根据token判断首页是否已经登录
      if (document.cookie.indexOf('domain') == -1 && document.cookie != '') {
        this.indexStorage = JSON.parse(document.cookie)
        this.saveToken(this.indexStorage.token)
        this.saveUser(this.indexStorage.user)
        this.show.loginOk = true
        this.getUser()
      } else if (this.token != '') {
        this.show.loginOk = true
        this.getUser()
      } else {
        this.show.loginOk = false
      }
      //第一次进来读取网址匹配导航
      if(window.location.href.split('/')[3] != 'work'){
        this.show.menuIndex = '/' + window.location.href.split('/')[3]
      }else{
        this.show.menuIndex = '/work/index'
      }
      this.saveLocalurl(this.show.menuIndex)
    },
    methods: {
      onUser(){
        this.show.userShow = true
      },
      userClose(){
        this.show.userShow = false
      },
      //user link
      linkUser(index){
        if(index==1){
          this.$router.replace('/my/my_user');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }else if(index ==2){
          this.$router.replace('/my/my_alerts');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }else if(index ==3){
          this.$router.replace('/my/my_score');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }else if(index ==4){
          this.$router.replace('/my/my_order');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }else if(index ==5){
          this.$router.replace('/my/my_goods');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }else{
          this.$router.replace('/my/my_invoice');
          this.saveLocalurl('/my')
          this.show.menuIndex = '/my'
        }
        this.show.userShow = false
      },
      //头部导航跳转
      tapMenu(url,index) {
        if(index == '/work/index'){
          this.saveLocalurl('/work/index')
          var url = this.$router.resolve({path: url})
          window.open(url.href, '_top')
        }else{
          this.saveLocalurl(index)
          this.$router.push({path: url})
        }
        this.show.menuIndex = index
      },
      //重新更新user信息
      async getUser() {
        if (this.token != '') {
          const {
            data
          } = await this.$get('/api/user/getUserInfoDetail')
          this.saveUser(data)
        }
      },
      //获取消息列表
      async getMessageList() {
        const {
          data
        } = await this.$get('/api/user/queryMessageList')
        if (data != undefined) {
          this.activities = data.list
          this.activities.forEach((item) => {
            item.timestamp = tools.time_cycle(1, (item.publish_time / 1000))
          })
        }
      },
      //点击显示浮窗
      onImg(index) {
        if (this.show.imgIndex == index) {
          this.show.imgIndex = '-1'
        } else {
          this.show.imgIndex = index
        }
      },
      goto() {
        this.show.imgIndex = '-1'
      },
      //获取抖音最高vip等级数据
      async maxUserRole() {
        const {
          data
        } = await this.$get('api/vip/queryMaxUserRole')
        if (data != null) {
          this.dyData = data
        }

      },

      //关闭购买会员弹窗
      closePay() {
        this.show.payShow = false
        clearInterval(this.submitTime)
        this.saveTokenOk('')
      },
      //提交订单
      submitOk(order_id) {
        // this.val.orderId = order_id
        this.paramsSub = {
          orderId: order_id
        }
      },
      //轮询订单 未用
      async getOrder() {
        const {
          data
        } = await this.$get('/api/vip/queryOrderPayState', this.paramsSub)
        if (data.pay_status == 1) {
          this.show.payShow = false
          this.$message.success("购买会员支付成功")
          clearInterval(this.submitTime)
        }
      },

      //跳转直播搜索
      jumUrlLive() {
        this.$router.push({
          path: "/living/living_search",
        })
        this.show.searchMain = false
      },
      linkLiving(id) {
        this.$router.push({
          path: "/living/living_detail?id=" + id,
        })
        this.show.searchMain = false
      },
      //跳转小店搜索
      jumUrlShop() {
        this.$router.push({
          path: "/shop/shop_rank",
        })
        this.show.searchMain = false
      },
      linkShop(id) {
        this.$router.push({
          path: "/shop/shop_detail?id=" + id,
        })
        this.show.searchMain = false
      },
      //跳转达人搜索
      jumUrlUser() {
        this.$router.push({
          path: "/talent/talent_search",
        })
        this.show.searchMain = false
      },
      linkUserA(id) {
        this.$router.push({
          path: "/talent/talent_detail?id=" + id,
        })
        this.show.searchMain = false
      },
      //跳转商品搜索
      jumUrlProduct() {
        this.$router.push({
          path: "/goods/goods_search",
        })
        this.show.searchMain = false
      },
      linkGoods(id) {
        this.$router.push({
          path: "/goods/goods_detail?id=" + id,
        })
        this.show.searchMain = false
      },
      //跳转到免费获取高级版
      linkMy() {
        this.$router.push({
          path: '/my/my_score'
        })
      },
      //跳转到马上升级
      linkVip() {
        this.$router.push({
          path: '/renew/index'
        })
      },
      //搜索结果
      async searchAll() {
        this.getData.projectData = []
        this.getData.liveData = []
        this.getData.shopData = []
        this.getData.userData = []
        const {
          data
        } = await this.$get('/api/search/all', this.params)
        if (data != null) {
          this.show.dataShow = true
          if (data.product != '') {
            this.getData.projectData = data.product
          } else {
            this.show.searchGo = true
          }
          if (data.live != '') {
            this.getData.liveData = data.live
          } else {
            this.show.searchGo = true
          }
          if (data.shop != '') {
            this.getData.shopData = data.shop
          } else {
            this.show.searchGo = true
          }
          if (data.user != '') {
            this.getData.userData = data.user
          } else {
            this.show.searchGo = true
          }
        }

      },
      //关闭搜索
      closeSearch() {
        this.show.searchAnimation = false
        setTimeout(() => {
          this.show.searchMain = false
        }, 100)
      },
      //点击搜索
      onSearch() {
        if (this.search != '') {
          this.params.keyword = this.search
          this.show.searchMain = true
          this.show.searchAnimation = false
          this.show.dataShow = false
          setTimeout(() => {
            this.searchAll()
          }, 1000)

        }
      },
      //退出登录
      async delLogin() {
        var params = {}
        const {
          data
        } = await this.$get('/api/user/logout', params, true)
        this.deleteToken("")
        this.deleteUser("")
        this.$message.success("退出成功")
        document.cookie = "'';path=/;domain=.guanxingshu.com"
        this.show.loginOk = false
        window.open(window.location.href, '_top')
      },
      //跳转
      message() { //消息通知
        this.$router.replace('/my/my_alerts');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      integralMall() { //积分商城
        this.$router.replace('/my/my_score');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      personalData() { //个人资料
        this.$router.replace('/my/my_user');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      purchaseRenewal() { //购买会员
        this.$router.replace('/renew/index');
        this.show.userShow = false
      },
      clickInvoice() { //开具发票
        this.$router.replace('/my/my_invoice');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      liveMonitoring() { //直播监控
        this.$router.replace('/data/data_living');
        this.saveLocalurl('/data')
        this.show.menuIndex = '/data'
        this.show.userShow = false
      },
      subjectCollection() { //数据报告
        this.$router.replace('/starview/starview_data');
        this.saveLocalurl('/starview')
        this.show.menuIndex = '/starview'
        this.show.userShow = false
      },
      productCollection() { // 商品收藏
        this.$router.replace('/my/my_goods');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      myFollowLive() { //我关注的直播
        this.$router.replace('/data/data_living');
        this.saveLocalurl('/data')
        this.show.menuIndex = '/data'
        this.show.userShow = false
      },
      subAccountManagement() { //子账号管理
        this.$router.replace('/my/child');
        this.saveLocalurl('/my')
        this.show.menuIndex = '/my'
        this.show.userShow = false
      },
      videoMonitoring() { //视频监测
        this.$router.replace('/data/data_video');
        this.saveLocalurl('/data')
        this.show.menuIndex = '/data'
        this.show.userShow = false
      },
      dataReport() { //新手指南
        this.$router.replace('/starview/starview_guide');
        this.saveLocalurl('/starview')
        this.show.menuIndex = '/starview'
        this.show.userShow = false
      },
      operatingCircle() { //运营圈
        this.$router.replace('/starview/starview_operator');
        this.saveLocalurl('/starview')
        this.show.menuIndex = '/starview'
        this.show.userShow = false
      },
      onlineCourses() { //线上公开课
        this.$router.replace('/starview/starview_online');
        this.saveLocalurl('/starview')
        this.show.menuIndex = '/starview'
        this.show.userShow = false
      },
      //开通会员
      goVip() {
        this.$router.push("/renew/index")
        this.show.userShow = false
      },
      //手机登录回调
      submitLoginOk(e) {
        this.show.loginOk = true
        this.loginShow = false
        this.indexStorage = {
          token: this.token,
          user: this.user
        }
        document.cookie = JSON.stringify(this.indexStorage) + ";path=/;domain=.guanxingshu.com"
        clearInterval(this.wxCodeTime)
        //刷新页面
        window.open(window.location.href, '_top')
      },
      //点击弹出登录
      onLogin() {
        this.loginShow = true
      },
      //关闭弹窗
      closeLogin() {
        clearInterval(this.countDown)
        this.show.payShow = false
        this.loginShow = false
      },
      handleCollapsed() {
        // 伸缩导航栏
        const collapsed = !this.collapsed
        this.saveCollapsed(collapsed)
      },
      // listenClientWidth() {
      //   // 监听窗口改变，当宽度小于1024是隐藏侧边栏
      //   window.addEventListener('resize', () => {
      //     const width = document.body.clientWidth
      //     const collapsed = width <= 900
      //     this.saveCollapsed(collapsed)
      //   })
      // },
      ...mapActions(['saveCollapsed', 'saveToken', 'saveUser', 'deleteToken', 'deleteUser', 'saveTokenOk','saveLocalurl']),
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return restaurant => {
          return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  //头部兼容
  .collapsed-not {
    width: calc(100% - 200px);
  }

  .collapsed-ok {
    width: calc(100% - 70px);
  }

  //按钮
  /deep/.button-all {
    background: $rdx-primary;
    color: #FFFFFF;
  }

  /deep/.button-all:hover {
    background: $rdx-error;
    color: #FFFFFF;
  }

  /deep/.button-sj {
    background: #3b3b3b;
    color: #FFD395;
  }

  /deep/.button-sj:hover {
    background: #000;
    color: #FFFFFF;
  }

  //付费弹窗
  /deep/.pay-up .el-dialog__body {
    padding: 0px
  }

  /deep/.pay-up .el-dialog {
    border-radius: 10px;
  }

  /deep/.el-dialog__header {
    display: none;
    padding: 0px;
    padding-bottom: 0px;
  }

  //input搜索
  /deep/.search .el-input__inner {
    width: 300px;
    border-radius: 17px;
    height: 32px;
    font-size: 16px;
    // padding: 0 25px;
    font-size: 14px;
  }

  /deep/.search .el-input__inner:hover {
    border-color: $rdx-primary
  }

  /deep/.search .el-input__inner:focus {
    border-color: $rdx-primary;
    box-shadow: 0px 0px 2px 0px $rdx-primary;
  }

  /deep/.button-search {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    border: 0px;
    right: 12px;
    font-size: 20px;
    color: $rdx-primary;
  }

  /deep/.button-search:hover {
    font-weight: bold;
  }

  .searchMain {
    width: 805px;
    height: 590px;
    background: url('../../assets/imgs/search_top.png') no-repeat left top;
    background-size: 100% 100%;
    position: absolute;
    top: 35px;
    left: -370px;
    z-index: 99;
    padding: 32px;
  }

  .search-living {
    width: 38px;
    height: 19px;
    background: url('../../assets/imgs/search_ico_5.png') no-repeat left top;
    background-size: 100% 100%;
  }

  .living-border {
    border: 2px solid $rdx-primary;
  }

  /deep/.living-border-click .el-input__inner {
    border: 1px solid $rdx-primary;
  }

  .search-tag {
    background-color: #FCE5E8;
    padding: 1px 6px;
  }

  .search-close {
    display: none;
    animation: closeS 0.1s forwards
  }

  @keyframes closeS {
    0% {
      left: 0px;
      opacity: 0.8;
      width: 100%;
      height: 500px;
      overflow: hidden;
    }

    100% {
      left: 0px;
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  }

  .search-open {
    animation: open 0.1s forwards
  }

  @keyframes open {
    0% {
      width: 10px;
      height: 10px;
      opacity: 0;
      overflow: hidden;
    }

    100% {
      width: 805px;
      height: 590px;
      opacity: 1;
    }
  }



  .input-top {
    width: 140px;
    height: 36px;
    line-height: 36px;
    background: #ffffff;
    border: 1px solid #e6e7eb;
    border-radius: 8px;
  }

  // .input-top:hover{
  //   border: 1px solid $rdx-error-disabled;
  //   cursor: pointer;
  // }
  .base-header {
    margin: 0px auto;
    max-width: 1620px;
    min-width: 1420px;
    height: 63px;
    background-color: #FFFFFF;
    // overflow: hidden;
  }

  .top {
    color: $rdx-content-color;
  }

  .icon {
    margin: 0 20px;
    font-size: 20px;
  }

  .vip {
    cursor: pointer;
    margin-right: 40px;
    padding: 7px 16px;
    color: #ffd395;
    background: #3c3b39;
    border-radius: 20px;
  }

  /deep/.el-avatar--small {
    width: 25px;
    height: 25px;
  }

  .login .out {
    width: 90px;
    height: 38px;
    line-height: 38px;
    background: $rdx-primary;
    border-radius: 19px;
    text-align: center;
    margin-right: 15px;
  }

  .login .out:hover {
    width: 90px;
    height: 38px;
    background: #cb1027;
    border-radius: 19px;
    text-align: center;
  }

  .more:hover {
    cursor: pointer;
  }

  //登录后效果
  .login-ok {
    .rebate {
      height: 30px;
      background: #fbfbfb;
      border: 1px solid #eeeeee;
      border-radius: 16px;
    }

    .rebate:hover {
      background-color: $rdx-error;
      cursor: pointer;
      color: #FFFFFF;
    }

    .mobile {
      width: 25px;
      height: 25px;
      background-color: $rdx-primary;
      border-radius: 4px;
    }

    .mobile:hover {
      background-color: $rdx-error;
    }

    .consult:hover {
      background-color: $rdx-tips-color;
    }

    .consult {
      width: 25px;
      height: 25px;
      background: #b8bccc;
    }

    .small2 {
      width: 25px;
      height: 25px
    }
  }

  /deep/.el-popover {
    animation: openPopover 1s forwards
  }

  @keyframes openPopover {
    0% {
      width: 10px;
      height: 10px;
      background: red;
      overflow: hidden;
    }

    100% {
      width: 400px;
      opacity: 1;
      background: red;
    }
  }

  .el-timeline {
    /deep/ .el-timeline-item__timestamp.is-bottom {
      position: absolute;
      font-size: 14px;
      left: -140px;
      top: -5px;
      color: #333333;
    }

  }

  .ping {
    width: 377px;
    height: 76px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.11);
  }

  .trigger:hover {
    color: #999;
  }
  //登录后
  .user-bg{position: fixed; width: 100%; height: 100%; left:0px; top:0px; z-index: 999;
   background-color: rgba(51, 51, 51, 0.7);
  }
  .user-box{width: 418px;
	.user-top{width: 100%; height:151px; background:  url('../../assets/imgs/user_bg_1.png') no-repeat left top; background-size: 100% 151px; padding: 40px 22px;}
	.user-exit{width: 61px; line-height: 28px; text-align: center; height: 28px; border: 1px solid #FFFFFF; border-radius: 14px; color:#FFFFFF; margin-top: 20px;}
	.user-exit:hover{border: 1px solid $rdx-warning-disabled; color:$rdx-warning-disabled}
	.user-go{width: 390px; height:53px; background:  url('../../assets/imgs/user_bg_2.png') no-repeat left top; background-size: 100% 53px; padding: 18px 32px;}
	.user-button-1{width: 86px; height: 27px; background: #F4E07D; border-radius: 14px;line-height: 27px; color:#303C6A}
	.user-button-1:hover{background: $rdx-warning-disabled;}
	.user-line-right{
		width: 272px;
		height: 1px;
		background: #EEEEEE;
		opacity: 0.5;
	}
  }
</style>
