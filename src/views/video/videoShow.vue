<template>
  <div style="margin: 0px auto;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction video-show">
      <div class="flex rdx-font-14 rdx-p-t-12 rdx-p-b-12 aligin-center rdx-line-height-30">
        <i class="iconfont icon-e614 rdx-m-r-4"></i>
        <span><a href="/video/video_search">视频&素材</a></span>
        <i class="iconfont icon-e616"></i>
        <span class="color-content">视频详情</span>
      </div>
      <div class="flex new-top-box justify-between">
        <img :src="getData.awemes.aweme_cover" style="width: 240px; height: 300px; border: 1px solid #F8F8F8;">
        <div class="flex rdx-flex-1 rdx-p-l-40 flex-direction">
          <div class="flex justify-between">
            <div class="flex align-center rdx-font-20 w-70">{{getData.awemes.aweme_title}}</div>
            <div class="flex align-center">
              <div class="rdx-tips-color">数据更新于 {{getData.awemes.crawl_time}}</div>
              <el-tooltip class="item" effect="dark" content="复制" placement="top">
                <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" @click="copys(getData.awemes.aweme_title)">
                  <i class="iconfont icon-e781 rdx-font-22"></i>
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="收藏" placement="top" v-if="!show.favoriteYes">
                <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavorite">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="top" v-if="show.favoriteYes">
                <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavoriteNot">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="rdx-p-t-16">
            <span class="new-top-tips rdx-font-14 rdx-p-tb-2 rdx-p-lr-10" style="color: #FF9C4C;">抖音号 <span
                class="rdx-warning-disabled">{{getData.talents.unique_id}}</span></span>
          </div>
          <div class="flex justify-between rdx-p-t-60 w-80">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.talents.follower_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">粉丝</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.talents.following_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">关注数</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.talents.total_favorited}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">点赞</span>
            </div>
          </div>
          <div class="flex justify-between w-80 rdx-p-t-20">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.awemes.digg_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">总点赞数</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.awemes.share_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">总转发数</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.awemes.comment_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">总评论数</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-100 justify-between">
        <div class="flex conten-box-left flex-direction color-7" style="position: sticky;top: 0px; height: 146px;">
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('1')">
            <i class="iconfont icon-ec7f rdx-m-r-8 rdx-font-20" :class="show.tabIndex == '1' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '1' ? 'rdx-primary' : ''">点赞趋势</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('2')">
            <i class="iconfont icon-e612 rdx-m-r-8 rdx-font-18" :class="show.tabIndex == '2' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '2' ? 'rdx-primary' : ''">转发趋势</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('3')">
            <i class="iconfont icon-e606 rdx-m-r-8 rdx-font-20" :class="show.tabIndex == '3' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '3' ? 'rdx-primary' : ''">评论趋势</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 1">
          <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">点赞趋势</span>
            </div>
            <diggs-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></diggs-line>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">转发趋势</span>
            </div>
            <share-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></share-line>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 3">
          <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">评论趋势</span>
            </div>
            <comment-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></comment-line>
          </div>
        </div>
      </div>
    </div>
    <top-up></top-up>
  </div>
</template>

<script>
  import topUp from '@/components/toUp.vue'
  import lineChart from '@/components/lineChartY.vue';
  import * as tools from '@/common/tools.js';
  import noData from '../../components/noData.vue';
  import commentLine from './components/commentLine.vue';
  import shareLine from './components/shareLine.vue';
  import diggsLine from './components/diggsLine.vue';
  import top from '@/layout/components/Top.vue'
  export default {
    components: {
      lineChart,
      noData,
      commentLine,
      shareLine,
      diggsLine,
      top,topUp
    },
    data() {
      return {
        getData: {
          talents: '',
          awemes: '',
          comments: '',
          text: ''
        },
        show: {
          tabIndex: '1',
          favoriteYes: false, //收藏显示
        },
        val: {
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
        },
        chartData: {
          likeData: {},
          shareData: {},
          commentData: {},
          chartWidth: {
            width: "100%",
            height: "350px"
          }
        },
        thumbAddCur: [],
        thumbTotalCur: [],
        shareAddCur: [],
        shareTotalCur: [],
        commentAddCur: [],
        commentTotalCur: [],
        params: {}, //后台参数
        awemeId: '', //视频Id
        startDate: '',
        endDate: '',
      }
    },
    created() {
      this.params.awemeId = this.$route.query.id
      this.awemeId = this.$route.query.id
      this.initialTime()
      this.queryCollect()
    },
    mounted() {
      this.getTalentInfo()
      this.getComments()
      this.isFavorite()
    },
    methods: {
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
      },
      //时长转换
      time_minus(timeDiff) {
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let minute = parseInt((timeDiff % 86400 % 3600) / 60)
        let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)
        day = day ? (day + '天') : ''
        hour = hour ? (hour + '时') : ''
        minute = minute ? (minute + '分') : ''
        second = second ? (second + '秒') : ''
        return day + hour + minute + second
      },
      //初始时间
      initialTime() {
        this.val.timeBengin = this.fun_date(-30).split('_')[0]
        this.val.timeEnd = this.fun_date(-30).split('_')[1]
        this.startDate = this.val.timeBengin.replace(/-/g, '')
        this.endDate = this.val.timeEnd.replace(/-/g, '')
      },
      //计算天数
      fun_date(aa) {
        var date1 = new Date();
        var m1 = date1.getMonth() + 1;
        m1 = m1 < 10 ? '0' + m1 : m1
        var d1 = date1.getDate();
        d1 = d1 < 10 ? '0' + d1 : d1
        var time1 = date1.getFullYear() + '-' + m1 + '-' + d1; //time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var m2 = date2.getMonth() + 1;
        m2 = m2 < 10 ? '0' + m2 : m2
        var d2 = date2.getDate();
        d2 = d2 < 10 ? '0' + d2 : d2
        var time2 = date2.getFullYear() + '-' + m2 + '-' + d2; //time2表示倒推几天
        return time2 + "_" + time1;
      },
      //判断是否已收藏
      async isFavorite() {
        var favorite = {
          collectId: this.params.awemeId,
          collectType: 3
        }
        const data = await this.$get('/api/user/user_collection/query_is_collect', favorite)
        if (data.data > 0) {
          this.show.favoriteYes = true
        } else {
          this.show.favoriteYes = false
        }
      },
      //查询是否收藏
      async queryCollect() {
        if (this.show.favoriteYes = true) { //模拟，真实数据要根据获取的字段判断
          var param = {
            collectId: this.params.awemeId,
            collectType: 3 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/query_is_collect', param)
          if (data.errCode == 0) {
            this.show.favoriteYes = false
          } else {
            this.$message.error("收藏失败，请联系管理员")
          }
        }
      },
      //取消收藏
      async onFavoriteNot() {
        if (this.show.favoriteYes = true) { //模拟，真实数据要根据获取的字段判断
          var favoriteParam = {
            collectId: this.params.awemeId,
            collectType: 3 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/cancel_collection', favoriteParam)
          if (data.errCode == 0) {
            this.show.favoriteYes = false
          } else {
            this.$message.error("收藏失败，请联系管理员")
          }
        }

      },
      //点击收藏夹
      async onFavorite(id) {
        var favoriteParam = {
          dataId: this.awemeId,
          collectType: 3 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
        }
        const {
          data
        } = await this.$post('/api/user/user_collection/add_collection', favoriteParam)
        if (data.errCode == 0) {
          this.show.favoriteYes = true
        } else {
          this.$message.error("收藏失败，请联系管理员")
        }
      },
      //获取达人信息
      async getTalentInfo() {
        const {
          data
        } = await this.$get('/api/video/detail/videoAuthorDetail', this.params)
        if (data != undefined) {
          this.getData.talents = data.author
          this.getData.awemes = data.aweme
          if (this.getData.awemes.crawl_time == 0 || this.getData.awemes.crawl_time == null) {
            this.getData.awemes.crawl_time = '--'
          } else {
            this.getData.awemes.crawl_time = tools.time_cycle('3', this.getData.awemes.crawl_time)
          }
          if (this.getData.awemes.aweme_create_time == '') {
            this.getData.awemes.aweme_create_time = '--'
          } else {
            this.getData.awemes.aweme_create_time = tools.time_cycle('3', this.getData.awemes.aweme_create_time)
          }
          this.getData.awemes.total_time = this.calculateDiffTime(this.getData.awemes.total_time)

          this.getData.awemes.digg_count = tools.numberVerify(this.getData.awemes.digg_count) //总点赞数
          this.getData.awemes.share_count = tools.numberVerify(this.getData.awemes.share_count) //总转发数
          this.getData.awemes.comment_count = tools.numberVerify(this.getData.awemes.comment_count) //总评论数
          this.getData.talents.follower_count = tools.numberVerify(this.getData.talents.follower_count) //粉丝数
          this.getData.talents.following_count = tools.numberVerify(this.getData.talents.following_count) //关注数
          this.getData.talents.total_favorited = tools.numberVerify(this.getData.talents.total_favorited) //点赞数
        }
      },
      //使用音乐
      async getComments() {
        var param = {
          "awemeId": this.awemeId,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get('/api/video/detail/data/chart/music', param)
        if (data != undefined) {
          this.getData.comments = data
          this.getData.comments.audition_duration = this.time_minus(this.getData.comments.audition_duration)
          this.getData.comments.user_count = tools.numberVerify(this.getData.comments.user_count)
        }
      },
      //复制信息
      copys(text) {
        tools.copy(text)

      },
      YMD(type, times) {
        tools.time_cycle(type, timers)
      },
      //获取开播总时长
      calculateDiffTime(timeDiff) {
        //let timeDiff=endTime-startTime
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let minute = parseInt((timeDiff % 86400 % 3600) / 60)
        let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)

        day = day ? (day + '天') : ''
        hour = hour ? (hour + '时') : ''
        minute = minute ? (minute + '分') : ''
        second = second ? (second + '秒') : ''
        return day + hour + minute + second
      },



    }
  }
</script>
<style lang="scss" scoped>
  @import "./videoShow.scss";
</style>
