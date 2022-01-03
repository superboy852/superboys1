<template>
  <div class="box flex flex-direction">
    <div>
      <h2 class="rdx-font-22 rdx-main-color">{{guideNewbie.type}}</h2>
      <div class="rdx-m-t-20 flex">
        <div class="box-shadow " style="width: 875px;border-radius: 5px;">
          <div class="rdx-main-color w-100" style="text-align: center;height: 537px;background-color: #000000;">
            <no-data marginTop="20" noText="暂无视频" v-if="guideNewbie.video_url == null" class="w-100" style="padding-top: 150px;opacity: 0.5;"></no-data>
            <video :src="guideNewbie.video_url" v-else style="width: 100%; height: 537px; object-fit: cover;" controls="controls" ></video>
          </div>
          <p class="rdx-font-14 rdx-m-t-20 ">{{guideNewbie.title}}</p>
          <div class="rdx-m-t-18 flex justify-between button-a move">
            <span>{{guideNewbie.view_count}}人观看</span>
            <div class="flex">
              <span class="button-a rdx-m-r-40 aligin-center trigger" :style="give==1?'color: red;' : ''" @click="giveClick">
                <i class="iconfont icon-ec7f" style="font-size: 22px;"></i>
                <span class="rdx-font-14 rdx-m-l-8">{{guideNewbie.like_count}}</span>
              </span>
              <!-- <span class="button-a rdx-m-r-40 flex aligin-center trigger" style="margin-top: 4px;">
                <i class="iconfont icon-e606" style="font-size: 22px;"></i>
                <span class="rdx-font-14 rdx-m-l-8 ">{{guideNewbie.comments==null?'0':guideNewbie.comments}}</span>
              </span> -->
            </div>
          </div>
        </div>

        <div>
        <div class=" recommend" >
          <span class="flex justify-between">
            <h2 class="rdx-font-15">接下来播放</h2>
          </span>
          <div class="rdx-m-t-24 " >
            <div class="borderb rdx-m-t-14 rdx-p-b-14 flex button-a" style="overflow: hidden;" v-for="(item,index) in shareVideo"  v-if="index < 6" @click="showClick(item.id)">
              <img style="width: 120px;height: 68px;" :src="item.cover_img" />
              <div class="rdx-m-l-10 flex flex-direction align-stretch rdx-font-12" style="width: 170px;">
                <span class=" rdx-line-1">{{item.title}}</span>
                <div class="flex justify-between rdx-tips-color rdx-p-t-34">
                  <span class="flex align-center">
                    <i class="iconfont icon-e70d" style="font-size: 16px;"></i>
                    <span class="rdx-m-l-4">{{item.view_count}}</span>
                  </span>
                  <span> {{item.create_time}}</span>
                </div>
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
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components: {
      noData
    },
    data() {
      return {
        give:'0',
        guideNewbie:{},
        params:{
          id:''

        },
        type:'',
        info:{},
        recommendedVideo:[],
        shareVideo:[]
      }
    },
    created() {
      this.getParams()
    },
    mounted() {
      this.tableList()
      this.showList()
      this.table()
    },
    methods: {
      async table(){
        const {
          data
        } = await this.$get('/api/user/getUserInfoDetail')
        this.info = data
        // console.log("===========id",data.user_id)
      },
      async giveClick(){
        if(this.give == 1){
          this.give = 0;
        }else{
          this.give = 1
        }
        var par = {
          contentId: this.params.id,
          userId: this.info.user_id,
          isLike:this.give,
          type:this.type
        }
        const {
          data
        } = await this.$get('/api/xgSchool/updateLikeCount',par)
        this.guideNewbie.like_count = data
        if(data.is_like == null){
          this.give = 0
          this.guideNewbie.like_count -= 1
        }else{
          this.give = 1
          this.guideNewbie.like_count += 1
        }
      },
      // async Click(){
      //   var par = {
      //     contentId: this.params.id,
      //     userId: this.info.user_id,
      //     type:this.type
      //   }
      //   const {
      //     data
      //   } = await this.$get('/api/xgSchool/updateLikeCount',par)
      //   this.giveNumber = data.isLike
      //   if(this.giveNumber == 1){
      //     this.give = '1'
      //   }
      // },
      async showClick(id){  //跳转详情页

        //增加观看人数
        var param = {
          id:id,
          userId:this.info.user_id
        }
        const {
          data
        } = await this.$get('/api/xgSchool/online/updateViewCount', param)
          this.guideNewbie.view_count = data.data
          // console.log(data)

          this.$router.push({path:'/starview/online_detail',query:{id:id,type:'3'}});
          this.$router.go(0)
      },
      getParams(){
      // 取到路由带过来的参数
      this.params.id = this.$route.query.id
      this.type = this.$route.query.type
      // this.guideNewbie.view_count += 1
      },
      async showList() {
        const {
          data
        } = await this.$get('/api/xgSchool/online/byIdCourse',this.params)
        // console.log("===========shareVideo",data)
        this.guideNewbie = data
        this.guideNewbie.type = data.type==1?"大咖分享":(data.type == 2?"精品公开课":'大咖分享');
        // this.guideNewbie.forEach((item) => {
        //   item.release_time = tools.time_cycle(3, item.release_time)
        // })
        // console.log('234', this.params)
      },
      async tableList() {  //大咖分享
        const {
          data
        } = await this.$get('/api/xgSchool/online/courseList',this.params)
        console.log("===========shareVideo",data.list)
        this.shareVideo = data.list
          this.shareVideo.forEach((item)=>{
              item.create_time = (tools.time_cycle(3,(item.create_time/1000))).replace(/-/g,'.')
        })
        //this.total = data.page_info && data.page_info.total
      }

    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>
<style lang="scss" scoped>
    @import "../../assets/styles/listNew.scss";
.recommend{width: 325px;height: 660px;box-shadow: 0 0 12px 0 #d5d5d5;padding: 15px;margin-left: 10px;}
</style>
