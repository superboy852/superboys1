<template>
  <div class="flex w-100 justify-between starview rdx-bg-color">
    <div class="news-left flex flex-direction" v-if="getData.info != ''">
      <h1 class="rdx-font-26">{{getData.info.title}}</h1>
      <div class="news-tips rdx-font-14 rdx-m-t-15 rdx-line-2">{{getData.info.article_content}}</div>
      <div class="flex rdx-line-height-40 flex-direction rdx-font-14 rdx-m-t-20">
        <p class="flex justify-center"><img :src="getData.info.cover_image_addr" style="width: 70%;"></p>
        <p style="text-indent: 32px;">{{getData.info.article_content}}</p>
      </div>
      <div class="rdx-font-14 rdx-tips-color flex align-center rdx-m-t-20">
        <i class="iconfont icon-e7ac"></i>
        <span class="rdx-p-l-4">发表于 {{getData.info.release_time}} 阅读 ( {{getData.info.view_number}} )</span>
      </div>
      <div class="rdx-m-t-28 flex justify-center">
        <div class="button-news flex justify-center button-all rdx-light-color rdx-font-20" @click="clickDigg(getData.info.is_like)">
          <i class="iconfont icon-ec7f rdx-font-22 rdx-m-r-6"></i>
          <span>{{getData.info.like_number}}</span>
        </div>
      </div>
    </div>
    <div class="news-right">
      <!--      <div class="news-user flex align-center">
        <img src="../../assets/imgs/1.png" class="round" style="width: 60px; height: 60px;" >
        <div class="rdx-p-l-8 flex flex-direction">
          <strong class="font-strong rdx-line-height-24">铁汉</strong>
          <span class="rdx-line-1 rdx-font-14 rdx-tips-color rdx-line-height-24">短视频大数据分析服务</span>
          <span class="rdx-font-14 rdx-tips-color">177 篇文章</span>
        </div>
      </div> -->
      <div class="flex flex-direction rdx-p-t-16">
        <strong class="rdx-font-18">你可能感兴趣的文章</strong>
        <div class="rdx-font-14 rdx-p-t-10" v-for="(listS,index) in getData.info.articleItemList" :key="index">
          {{listS.title}} <span class="rdx-tips-color" v-if="listS.view_number != null">{{listS.view_number}}人观看</span>
        </div>
      </div>
      <!--      <div class="flex flex-direction rdx-m-t-12 rdx-p-t-12" style="border-top: 1px solid #e5e5e5;">
        <strong class="rdx-font-18">相似问题</strong>
        <div class="rdx-font-14 rdx-p-t-10">怎么才能升级成精选联盟正式版？评价数量 总是超不过20个 <span class="rdx-tips-color">0 回答</span></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import * as tools from '@/common/tools.js';
  export default {
    data() {
      return {
        getData: {
          info: ""
        },
        params: {},
        isLike: 0,
      }
    },
    computed: {
      menusWidth() {
        return this.collapsed ? menuShrinkWidth : menuEunfoldWidth
      },
      ...mapGetters(['collapsed', 'token', 'user', 'tokenOk'])
    },
    mounted() {
      this.getList()
    },
    methods: {
      //点赞+1或-1
      clickDigg(val){
        if(val == 0){
          this.getData.info.like_number += 1
          this.getData.info.is_like = 1
          this.isLike = 1
          console.log('测试1',this.getData.info.is_like,this.isLike)
        }else{
          this.getData.info.like_number -= 1
          this.getData.info.is_like = 0
          this.isLike = 0
          console.log('测试2',this.getData.info.is_like,this.isLike)
        }
        console.log('qqqqqqq',val)
        this.getLikeCount()
      },
      async getList() {
        this.params = {
          userId: this.user.user_id,
          articleId: this.$route.query.id
        }
        var {
          data
        } = await this.$get("/api/article/byIdArticle", this.params)
        console.log('测试', data)
        this.getData.info = data
        this.getData.info.release_time = tools.getDateDiff(Math.round(this.getData.info.release_time / 1000))
        //console.log("this.getData.info.release_time", tools.getDateDiff())
      },
      //点赞
      async getLikeCount() {
        var param = {
          userId: this.user.user_id,
          id: this.$route.query.id,
          type: 1,
          isLike: this.isLike,
        }
        var {
          data
        } = await this.$get("/api/xgSchool/updateLikeCount", param)
        console.log('111',param)
        console.log('data',data)
      }

    },
  }
</script>

<style lang="scss">
  @import './starview.scss';
</style>
