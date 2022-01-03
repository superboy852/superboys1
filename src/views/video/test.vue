<template>
  <div class="box flex flex-direction">
    <div class="flex justify-between">
      <div class="flex w-70 rdx-line-height-30 box-shadow">
        <img :src="getData.awemes.aweme_cover" class="rdx-radius-20" style="width: 180px; height: 210px;">
        <div class="flex flex-direction rdx-p-l-16 rdx-flex-1 position-re">
          <strong class="font-strong btn_hover">{{getData.awemes.aweme_title}}</strong>
          <div class="flex flex-direction justify-between" style="height: 180px;">
            <div class="flex justify-between">
              <div class="flex w-70">
                <i class="iconfont icon-e7ac"></i>
                <span class="rdx-font-14 rdx-tips-color">发布时间 {{getData.awemes.aweme_create_time}}</span>
              </div>
              <div class="rdx-font-14 rdx-tips-color flex flex-direction position-ab" style="top: 0px; right: 0px;">
                <div class="flex rdx-p-b-10">
                  <el-tooltip class="item" effect="dark" content="复制" placement="top">
                    <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" @click="copys(getData.awemes.aweme_title)">
                      <i class="iconfont icon-e781 rdx-font-22"></i>
                    </div>
                  </el-tooltip>

                  <!-- <div class="tag rdx-radius-8 flex align-center justify-center rdx-m-r-16 btn_hover"
                    @click="copys(getData.)">
                    <i class="iconfont icon-e781 rdx-font-22"></i>
                  </div> -->

                 <!-- <el-tooltip class="item" effect="dark" content="分享" placement="top">
                    <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a">
                      <i class="iconfont icon-e612 rdx-font-22"></i>
                    </div>
                  </el-tooltip> -->
                  <!-- <el-tooltip class="item" effect="dark" content="二维码" placement="top">
                    <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a">
                      <i class="iconfont icon-e951 rdx-font-22"></i>
                    </div>
                  </el-tooltip> -->

                  <el-tooltip class="item" effect="dark" content="收藏" placement="top" v-if="!show.favoriteYes">
                    <div class="rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavorite">
                      <i class="iconfont icon-e629 rdx-font-22"></i>
                    </div>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="取消收藏" placement="top" v-if="show.favoriteYes">
                    <div class="rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavoriteNot">
                      <i class="iconfont icon-e629 rdx-font-22"></i>
                    </div>
                  </el-tooltip>
                </div>
                <div>数据更新于 {{getData.awemes.crawl_time}}</div>
              </div>
            </div>
            <div class="flex justify-between align-center">
              <div class="flex w-100 justify-between">
                <div class="flex flex-direction">
                  <div class="font-strong">{{getData.awemes.digg_count}}</div>
                  <div class="rdx-">总点赞数</div>
                  <div>超过该达人平均点赞数{{getData.awemes.digg_exceed_avg_rate}}%</div>
                </div>
                <div class="flex flex-direction">
                  <div class="font-strong">{{getData.awemes.share_count}}</div>
                  <div class="rdx-">总转发数</div>
                  <div>超过该达人平均点赞数{{getData.awemes.share_exceed_avg_rate}}%</div>
                </div>
                <div class="flex flex-direction">
                  <div class="font-strong">{{getData.awemes.comment_count}}</div>
                  <div class="rdx-">总评论数</div>
                  <div>超过该达人平均点赞数{{getData.awemes.comment_exceed_avg_rate}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-direction rdx-line-height-30 rdx-flex-1 rdx-p-l-30 rdx-m-l-20 box-shadow">
        <div class="flex line-bottom rdx-p-b-25">
          <img :src="getData.talents.avatar" class="round" style="width: 88px; height: 88px;">
          <div class="flex flex-direction rdx-p-l-16 justify-center">
            <strong class="font-strong">{{getData.talents.nickname}}</strong>
            <span class="rdx-font-14 rdx-tips-color">抖音号 {{getData.talents.unique_id}}</span>
          </div>
        </div>
        <div class="flex justify-around rdx-p-t-30">
          <div class="flex flex-direction justify-between align-center">
            <span class="font-strong">{{getData.talents.follower_count}}</span>
            <span class="rdx-font-14 rdx-tips-color">粉丝</span>
          </div>
          <div class="flex flex-direction justify-center align-center">
            <span class="font-strong">{{getData.talents.following_count}}</span>
            <span class="rdx-font-14 rdx-tips-color">关注数</span>
          </div>
          <div class="flex flex-direction justify-center align-center">
            <span class="font-strong">{{getData.talents.total_favorited}}</span>
            <span class="rdx-font-14 rdx-tips-color">点赞</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex rdx-m-t-20">

      <div class=" flex flex-direction searchWh  justify-between" style=" position: sticky; top: 80px;height: 186px;">
        <div class="flex justify-center align-center rdx-p-t-28 button-a" @click="scrollToView('dzqs')">
          <i class="iconfont icon-ec7f" style="font-size: 21px;" :class="show.tabIndex == 'dzqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'dzqs' ? 'rdx-primary' : 'rdx-tips-color'">点赞趋势</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('zfqs')">
           <i class="iconfont icon-e605" style="font-size: 21px;" :class="show.tabIndexs == 'zfqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="searchdh" :class="show.tabIndexs == 'zfqs' ? 'rdx-primary' : 'rdx-tips-color'">转发趋势</span>
        </div>
        <div class="flex justify-center align-center rdx-p-b-28 button-a" @click="scrollToView('plqs')">
           <i class="iconfont icon-e606" style="font-size: 23px;" :class="show.tabIndex == 'plqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="  searchdh"  :class="show.tabIndex == 'plqs' ? 'rdx-primary' : 'rdx-tips-color'">评论趋势</span>
        </div>
      </div>

     <div class=" rdx-m-l-20 searchWh-right">

    <div class="flex  justify-between w-100">
      <div class="flex  flex-direction  w-50 box-shadow">
        <div class="flex flex-direction rdx-p-r-20">
          <div class="flex align-center rdx-p-b-20" id="dzqs">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">点赞趋势</h2>
          </div>
        </div>
        <diggs-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></diggs-line>
      </div>
      <div class="flex flex-direction rdx-m-l-20 w-50 box-shadow">
        <div class="flex flex-direction rdx-p-r-20">
          <div class="flex align-center rdx-p-b-20" id="zfqs">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">转发趋势</h2>
          </div>
        </div>
        <share-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></share-line>
      </div>
    </div>
    <div class="flex rdx-m-t-20 justify-between w-100">
      <div class="flex rdx-flex-1 flex-direction w-50 box-shadow">
        <div class="flex flex-direction rdx-p-r-20">
          <div class="flex align-center rdx-p-b-20" id="plqs">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">评论趋势</h2>
          </div>
        </div>
        <comment-line :awemeId="awemeId" :startDate="startDate" :endDate="endDate"></comment-line>
      </div>
      <div class="flex rdx-flex-1 flex-direction w-50 rdx-m-l-20 box-shadow">
        <div class="flex flex-direction rdx-p-r-20">
          <div class="flex align-center rdx-p-b-20">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">使用音乐</h2>
          </div>
        </div>
        <div class="flex flex-direction">
          <div class="flex align-center rdx-p-b-20">
            <img :src="getData.comments.cover_image" class="round" style="width: 88px; height: 88px;">
            <div class="flex flex-direction rdx-p-l-20">
              <span class="rdx-font-20">{{getData.comments.title}}</span>
              <span class="rdx-font-14 rdx-p-t-10"><i class="rdx-tips-color rdx-p-r-6">作者</i>{{getData.comments.author}}<i class="rdx-tips-color rdx-p-r-6 rdx-p-l-6">时长</i> {{getData.comments.audition_duration}}</span>
              <span class="rdx-font-14 rdx-p-t-10">{{getData.comments.user_count}}人使用</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import lineChart from '@/components/lineChartY.vue';
  import * as tools from '@/common/tools.js';
  import noData from '../../components/noData.vue';
  import commentLine from './components/commentLine.vue';
  import shareLine from './components/shareLine.vue';
  import diggsLine from './components/diggsLine.vue';
  export default {
    components:{
      lineChart,noData,commentLine,shareLine,diggsLine
    },
    data() {
      return {
        getData: {
          talents: '',
          awemes: '',
          comments: '',
          text: ''
        },
        show:{
          tabIndex:'',
          tabIndexs:'',
          favoriteYes:false,//收藏显示
        },
        val: {
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
        },
        chartData:{
          likeData:{},
          shareData:{},
          commentData:{},
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
        params:{},//后台参数
        awemeId:'',   //视频Id
        startDate:'',
        endDate:'',
      }
    },
    created() {
      this.params.awemeId = this.$route.query.id
      this.awemeId=this.$route.query.id
      this.initialTime()
      this.queryCollect()
    },
    mounted() {
      this.getTalentInfo()
      this.getComments()
    window.addEventListener("scroll", this.onScrolls) //实时监控滑块在
    this.isFavorite()
    },
    destroyed(){                                    //取消实时监控滑块
      window.removeEventListener('scroll', this.onScrolls)
    },
    methods: {
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
      async isFavorite(){
        var favorite = {
          collectId:this.params.awemeId,
          collectType:3
        }
        const data = await this.$get('/api/user/user_collection/query_is_collect', favorite)
        if(data.data > 0){
          this.show.favoriteYes = true
        }else{
          this.show.favoriteYes = false
        }
      },
      //查询是否收藏
      async queryCollect(){
        if(this.show.favoriteYes = true){ //模拟，真实数据要根据获取的字段判断
          var param = {
            collectId:this.params.awemeId ,
            collectType:3//收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/query_is_collect', param)
          if(data.errCode == 0){
            this.show.favoriteYes = false
          }else{
            this.$message.error("收藏失败，请联系管理员")
          }
        }
      },
      //取消收藏
      async onFavoriteNot(){
        if(this.show.favoriteYes = true){ //模拟，真实数据要根据获取的字段判断
          var favoriteParam = {
            collectId:this.params.awemeId ,
            collectType:3//收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/cancel_collection', favoriteParam)
          if(data.errCode == 0){
            this.show.favoriteYes = false
          }else{
            this.$message.error("收藏失败，请联系管理员")
          }
        }

      },
      //点击收藏夹
      async onFavorite(id){
        var favoriteParam = {
          dataId:this.awemeId,
          collectType:3//收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
        }
        const {
          data
        } = await this.$post('/api/user/user_collection/add_collection', favoriteParam)
        if(data.errCode == 0){
          this.show.favoriteYes = true
        }else{
          this.$message.error("收藏失败，请联系管理员")
        }
      },
      onScrolls(){
        let scrolleds = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrolleds < 400 && scrolleds > 0){
          this.show.tabIndex = "dzqs"
          this.show.tabIndexs = "zfqs"
        }else if(scrolleds < 800 && scrolleds > 400){
          this.show.tabIndex = "plqs"
          this.show.tabIndexs = "-1"
        }
      },
      //点击滚动固定位置
      scrollToView(index) {
        this.show.tabIndex = index
        if (index == 'dzqs') {
          document.getElementById('dzqs').scrollIntoView({ block: 'start', inline: 'nearest',  behavior: 'smooth' })
        }
        if (index == 'zfqs') {
          document.getElementById('zfqs').scrollIntoView({ block: 'start', inline: 'nearest',  behavior: 'smooth' })
        }
        if (index == 'plqs') {
          document.getElementById('plqs').scrollIntoView({ block: 'start', inline: 'nearest',  behavior: 'smooth' })
        }
      },
      //获取达人信息
      async getTalentInfo(){
        const {
          data
        } = await this.$get('/api/video/detail/videoAuthorDetail',this.params)
        if(data!=undefined){
          this.getData.talents=data.author
          this.getData.awemes=data.aweme
          if(this.getData.awemes.crawl_time == 0 || this.getData.awemes.crawl_time == null){
            this.getData.awemes.crawl_time = '--'
          }else{
            this.getData.awemes.crawl_time=tools.time_cycle('3',this.getData.awemes.crawl_time)
          }
          if(this.getData.awemes.aweme_create_time == ''){
            this.getData.awemes.aweme_create_time = '--'
          }else{
            this.getData.awemes.aweme_create_time=tools.time_cycle('3',this.getData.awemes.aweme_create_time)
          }
          this.getData.awemes.total_time=this.calculateDiffTime(this.getData.awemes.total_time)

          this.getData.awemes.digg_count=tools.numberVerify(this.getData.awemes.digg_count)     //总点赞数
          this.getData.awemes.share_count=tools.numberVerify(this.getData.awemes.share_count)     //总转发数
          this.getData.awemes.comment_count=tools.numberVerify(this.getData.awemes.comment_count)     //总评论数
          this.getData.talents.follower_count=tools.numberVerify(this.getData.talents.follower_count)     //粉丝数
          this.getData.talents.following_count=tools.numberVerify(this.getData.talents.following_count)     //关注数
          this.getData.talents.total_favorited=tools.numberVerify(this.getData.talents.total_favorited)     //点赞数
        }
      },
      //使用音乐
      async getComments(){
        var param={
          "awemeId":this.awemeId,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get('/api/video/detail/data/chart/music',param)
        if(data!=undefined){
          this.getData.comments=data
          this.getData.comments.audition_duration = this.time_minus(this.getData.comments.audition_duration)
          this.getData.comments.user_count = tools.numberVerify(this.getData.comments.user_count)
        }
      },
      //复制信息
      copys(text){
        tools.copy(text)

      },
      YMD(type,times){
        tools.time_cycle(type,timers)
      },
      //获取开播总时长
      calculateDiffTime(timeDiff){
        //let timeDiff=endTime-startTime
        let day=parseInt(timeDiff/86400)
        let hour=parseInt((timeDiff%86400)/3600)
        let minute=parseInt((timeDiff%86400%3600)/60)
        let second=parseInt((timeDiff%86400%3600)%60%60)

        day=day?(day+'天'):''
        hour=hour?(hour+'时'):''
        minute=minute?(minute+'分'):''
        second=second?(second+'秒'):''
        return day+hour+minute+second
      },



    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
</style>
