<template>
    <div>
      <div style="position: fixed; height: 100%; width: 100%; left: 0px; top: 0px; z-index: 98;" v-if="show.searchMain" @click="closeSearch"></div>
      <div class="base-header-item">
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
                      <img src="../assets/imgs/search_ico_1.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">博主</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.userData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlUser">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">博主搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="user in getData.userData" :key="user.author_id" @click="linkUser(user.author_id)">
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
                      <img src="../assets/imgs/search_ico_2.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">商品</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.projectData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlProduct">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo"
                    class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">商品搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="project in getData.projectData" :key="project.promotion_id"
                    @click="linkGoods(project.promotion_id)">
                    <img :src="project.image" class="round" style="width: 40px; height: 40px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-4">
                      <span class="rdx-line-2" style="width: 260px;">{{project.title}}</span>
                      <span class="rdx-primary">￥{{project.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between rdx-p-t-36">
                <div class="flex flex-direction rdx-flex-1 rdx-p-r-30">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../assets/imgs/search_ico_3.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">直播记录</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.liveData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlLive">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
                    <span class="rdx-font-14 rdx-tips-color rdx-m-t-10">直播搜索暂无结果</span>
                  </div>
                  <div v-if="!show.searchGo"
                    class="flex line-bottom rdx-p-b-10 rdx-p-t-10 align-center position-re rdx-p-l-10 button-active"
                    v-for="live in getData.liveData" :key="live.live_id" @click="linkLiving(live.live_id)">
                    <img :src="live.live_cover" style="width: 44px; height: 55px;">
                    <div class="flex flex-direction rdx-font-12 rdx-p-l-12">
                      <span class="rdx-tips-color rdx-line-height-26 rdx-line-1" style="width: 260px;">{{live.room_title}}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-direction rdx-flex-1">
                  <div class="flex justify-between rdx-p-b-6">
                    <div class="flex align-center">
                      <img src="../assets/imgs/search_ico_4.png" style="width: 15px; height: 15px;">
                      <span class="rdx-font-14 font-strong rdx-p-l-10">抖音小店</span>
                      <span class="rdx-tips-color rdx-font-12 rdx-p-l-10">相关结果为{{getData.shopData.length}}个</span>
                    </div>
                    <div class="flex rdx-primary">
                      <span class="rdx-font-12 more button-active" @click="jumUrlShop">更多</span>
                      <i class="iconfont icon-e616"></i>
                    </div>
                  </div>
                  <div v-if="show.searchGo" class="flex justify-center flex-direction align-center rdx-p-t-20">
                    <img src="../assets/imgs/data_not.png" style="width: 80px ;height: 60px;">
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
            <div class="flex w-100 justify-center rdx-p-t-20" v-if="!show.dataShow">
              <img src="../assets/imgs/loading.gif" style="width: 40px; height: 40px;">
            </div>
          </div>
        </div>
      </div>
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
    import noData from "@/components/noData.vue"
    export default {
      components: {
        noData
      },
      data() {
        return {
          search: '',
          loginShow: false, //登录弹窗
          butShow: false,
          getData: {
            projectData: [],
            liveData: [],
            shopData: [],
            userData: [],
          },
          show: {
            dataShow: false,
            searchMain: false, //搜索弹窗
            searchAnimation: false, //动画加载
            searchGo:false,//搜索是否有结果
          },
          params: {},
        }
      },
      mounted() {
        this.searchAll()
      },
      methods: {
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
        linkUser(id) {
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
            if(data.product != ''){
              this.getData.projectData = data.product
            }else{
              this.show.searchGo = true
            }
            if(data.live != ''){
              this.getData.liveData = data.live
            }else{
              this.show.searchGo = true
            }
            if(data.shop != ''){
              this.getData.shopData = data.shop
            }else{
              this.show.searchGo = true
            }
            if(data.user != ''){
              this.getData.userData = data.user
            }else{
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
              this.show.dataShow = true
              this.searchAll()
            }, 1000)

          }
        },
      }
    }
  </script>
  <style lang="scss" scoped>
    //input搜索
    /deep/.search .el-input__inner {
      width: 300px;
      border-radius: 17px;
      height: 32px;
      font-size: 16px;
      padding: 0 25px;
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
      background: url('../assets/imgs/search_top.png') no-repeat left top;
      background-size: 100% 100%;
      position: absolute;
      top: 35px;
      z-index: 99;
      padding: 32px;
    }

    .search-living {
      width: 38px;
      height: 19px;
      background: url('../assets/imgs/search_ico_5.png') no-repeat left top;
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
  </style>
