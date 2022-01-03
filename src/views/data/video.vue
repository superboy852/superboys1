<template>
  <div class="data-show flex flex-direction">
    <div class="flex align-center">
      <div class="flex position-re justify-center rdx-p-lr-50" @click="clickTab('1')">
        <strong class="rdx-p-b-12 button-a" :class="val.tabIndex == 1 ? 'active' : 'rdx-tips-color'">视频监测</strong>
        <span class="line-data position-ab" v-if="val.tabIndex == 1"></span>
      </div>
      <div class="flex position-re justify-center rdx-p-lr-50" @click="clickTab('2')">
        <strong class="rdx-p-b-12 button-a" :class="val.tabIndex == 2 ? 'active' : 'rdx-tips-color'">监测历史</strong>
        <span class="line-data position-ab" v-if="val.tabIndex == 2"></span>
      </div>
    </div>
    <div class="flex justify-center flex-direction align-center" v-if="val.tabIndex == 1">
      <div class="flex w-70 flex-direction align-center" style="max-width: 900px;">
        <img src="../../assets/imgs/data_video.png" style="width: 123px; height: 117px;">
        <div class="rdx-font-24 rdx-line-height-60">视频监测</div>
        <div class="select_title">可对抖音视频进行监测，提供分钟级的视频点赞数、评论数、转发数监测，掌握抖音号是视频热度走向。</div>
        <div class="flex rdx-p-t-20">
          <div class="round-data rdx-m-r-10" style="margin-top: 3px;"></div>
          <div class="flex flex-direction">
            <span>即时监测</span>
            <span class="select_title rdx-line-height-40">已发布，输入推广链接地址开始监测</span>
          </div>
        </div>
      </div>
      <div class="line-bottom w-100 rdx-p-t-40 rdx-m-b-24"></div>
      <div class="flex w-70 flex-direction vido-monitor" style="max-width: 900px;">
        <strong>视频链接</strong>
          <search-item @clickKey='clickVideoURL' searchPlaceholder="请输入抖音视频地址" searchType="6" class="rdx-m-t-16" searchWidth='800'></search-item>

        <div class="flex w-100 flex-direction rdx-p-r-10" style="overflow-y: auto; max-height: 300px;"
          v-if="show.searchShow">
          <div class="box-item rdx-radius-8 flex rdx-m-t-20 align-center"
            :class="val.activeIndex == index ? 'rdx-success-light-bg' : ''"
            @click="onActive(index,item.aweme_info.aweme_url,item.aweme_info.aweme_id)" v-for="(item,index) in videoList" :key="index">
            <!-- <img src="../../assets/imgs/1.png" style="width: 60px; height: 60px;" class="round" > -->
            <img :src="item.aweme_info.aweme_cover" style="width: 60px; height: 60px;" class="round">
            <div class="flex flex-direction rdx-p-l-16">
              <span>{{item.aweme_info.aweme_title}}</span>
              <span class="rdx-tips-color rdx-line-height-36">点赞数: {{item.aweme_info.digg_count}}</span>
            </div>
          </div>
          <!-- <div class="box-item rdx-radius-8 flex rdx-m-t-20 align-center" :class="val.activeIndex == 3 ? 'rdx-success-light-bg' : ''" @click="onActive('3','iddd')">
            <img src="../../assets/imgs/1.png" style="width: 60px; height: 60px;" class="round" >
            <div class="flex flex-direction rdx-p-l-16">
              <span>我是名称</span>
              <span class="rdx-tips-color rdx-line-height-36">我是id</span>
            </div>
          </div> -->
        </div>
        <strong>监测时长</strong>
        <el-radio-group v-model="val.time" @change="changeTime"  class="rdx-m-t-16">
          <el-radio class="rdx-content-color" :label="1">24小时</el-radio>
          <el-radio class="rdx-content-color" :label="2">48小时</el-radio>
          <el-radio class="rdx-content-color" :label="3">72小时</el-radio>
          <el-radio class="rdx-content-color" :label="4">7天</el-radio>
        </el-radio-group>
        <div class="flex rdx-p-t-24 rdx-p-b-24">
          <span class="rdx-p-r-24">点赞数提醒</span>
          <el-switch
            v-model="show.likeShow" active-color="#ff4949" inactive-color="#dddddd" @change="likeGo" class="rdx-m-t-2">
          </el-switch>
        </div>
        <strong class="rdx-p-b-20">更多数据监测 <span
            class="rdx-tips-color rdx-p-l-6">（选择同步监测粉丝数，关联商品浏览量，将消耗更多的监测次数）</span></strong>
        <el-checkbox-group v-model="val.videoCheck" class="choc">
          <el-checkbox label="点赞量监测" @change="monitorLike"></el-checkbox>
          <el-checkbox label="粉丝数监测"  @change="monitorFans"></el-checkbox>
          <el-checkbox label="关联商品监测" @change="monitorGoods"></el-checkbox>
        </el-checkbox-group>
        <div class="flex justify-center rdx-p-t-20" :disabled="show.searchShow == true">
          <el-button type="danger" :disabled="!show.btnShow?true:false" class="button-all" size="medium" @click="clickDetection" >开始监测</el-button>
        </div>

        <!-- <el-button type="danger" class="button-all" :style="params.monitorId !=  ''?'':' opacity:0.5'" size="medium" @click="clickDetection" >开始监测</el-button>
        </div> -->
        <div class="flex justify-center rdx-p-t-20">本次监测共需消耗<span class="rdx-primary">{{getNumbr.need_num}}</span>次视频监测次数，本月剩余<span
            class="rdx-primary">{{getNumbr.surplus_num}}</span>次视频<span :class="getNumbr.surplus_num == 0?'rdx-tips-color':''">监测次数</span></div>
      </div>
    </div>
    <div class="flex flex-wrap rdx-p-t-60" v-else>
      <div class="item-box flex flex-direction w-30 rdx-m-r-10 rdx-m-b-10" v-for="(item,index) in tableData"
        :key="index">
        <div class="flex justify-between line-bottom rdx-p-b-16">
          <div class="flex align-center">
            <!-- <img src="../../assets/imgs/1.png" class="round" style="width: 40px; height: 40px;"> -->
           <img :src="item.monitor_piture" class="round" style="width: 40px; height: 40px;">
            <div class="flex flex-direction rdx-p-l-10">
              <!-- <span>天津交警</span> -->
              <span>{{item.monitor_name}}</span>
              <!-- <span class="rdx-line-height-30 rdx-tips-color rdx-font-14">抖音号 tjjiaojing</span> -->
              <span class="rdx-line-height-30 rdx-tips-color rdx-font-14">抖音号 {{item.unique_id}}</span>
            </div>
          </div>
          <div class="rdx-success-dark">监控中</div>
        </div>
        <div class="flex flex-direction rdx-p-t-12 rdx-font-14">
          <span>监测时间段</span>
          <div class="flex justify-between rdx-tips-color rdx-p-t-6">
            <!-- <span>2021-09-06 00:00</span>
            <span>2021-09-06 00:00</span> -->
            <span>{{item.start_time}}</span>
            <span>{{item.end_time}}</span>
          </div>
        </div>
      </div>
    </div>


    <div v-if="val.tabIndex == 2" class="box" style="margin-top: -56px;">
      <div class="rdx-m-l-50 flex w-100 justify-between">
        <div class="flex">
          <span class="rdx-font-14" style="margin-top: 3px;">共{{history}}个监测历史</span>
          <span class="rdx-m-l-30">
            <span class="rdx-font-14">购物车状态：</span>
            <el-select v-model="shoppingValue" placeholder="请选择" size="mini" style="width: 100px;">
                <el-option
                  v-for="item in shoppingCartStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </span>
          <span class="rdx-m-l-30">
            <span class="rdx-font-14">监测状态：</span>
            <el-select v-model="monitoringValue" placeholder="请选择" size="mini" style="width: 100px;">
                <el-option
                  v-for="item in monitoringStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </span>
        </div>
        <div class="flex" style="margin: -16px 60px 0px 0px">
          <search-item @clickKey='clickVideoURL2' searchPlaceholder="请输入短视频标题关键词" v-model="videoURLs" searchType="2" class="rdx-m-t-16" searchWidth='380'></search-item>
        </div>
      </div>
      <div class="rdx-m-t-20">
        <el-empty description="暂无数据" ></el-empty>

      </div>
    </div>

  </div>
</template>

<script>
  import {
    videoMonitorUrl,addMonitorUrl
  } from '@/api'
  import * as tools from '@/common/tools.js';
   import searchItem from '@/components/searchItem.vue'
  export default {
    components:{
      searchItem
    },
    data() {
      return {
        shoppingValue: '0',
        monitoringValue: '0',
        history:"0",     //监测历史记录
        shoppingCartStatus:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '不带购物车'
        }, {
          value: '2',
          label: '关联购物车'
        }],
        monitoringStatus:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '监测中'
        }, {
          value: '2',
          label: '监测完成'
        }],
        show: {
          likeShow: false, //点赞数提醒
          searchShow: false, //搜索展示内容，
          btnShow: false,
        },
        val: {
          time: 1, //监测时长
          tabIndex: "1",
          videoCheck: [],
          activeIndex: '-1', //点击id背景变
        },
        tableData: [],
        params: {
          monitorType: 2,
          likesReminder: 0,
          monitorId:'',
          moreDataMonitor:[]
          //monitorId:'100000053250'
        }, //参数
        keyword: '',
        videoURLs: '',
        videoList: [],
        getNumbr:{},
        historya:{},
        hour: '1',
        diggsJc:0,
        followerJc:0,
        goodsJc:0
      }
    },
    mounted() {
      //this.tableList()
      this.getVideoSearch()
      this.obtaining()
      this.videoHistory()
    },
    methods: {
      //监测历史的搜索
      clickVideoURL2(){

      },
      async videoHistory(){ //查询用户监控的视频
        var param = {
          keyName:''
        }
        const {
          data
        } = await this.$get('/api/user/user_monitor/get_video_monitor',param)
        console.log(data)
          this.historya = data.list
      },
      async obtaining(){ //获取消耗和剩余监控次数
        var param = {
          startTime: this.GetDateStr(0),
          endTime: this.GetDateStr(this.hour),
          moreDataMonitor:(0,0,0)
        }
        // console.log("=========",this.GetDateStr(0),this.GetDateStr(this.hour))
        const {
          data
        } = await this.$post('/api/user/user_monitor/get_monitor_num',param)
        // console.log(data)
        this.getNumbr = data.data
        if(this.getNumbr.surplus_num == '' || this.getNumbr.surplus_num == null){
          this.getNumbr.surplus_num =='0'
        }
      },
      //点击获取id
      onActive(index,url,id) {
        this.val.activeIndex = index
        this.params.monitorId = id
        this.keyword = url
        console.log('1112',this.keyword)
      },
      //搜索展示内容弹窗
      searchUser() {
        this.show.searchShow = true
      },
      // //更多数据监测-商品
      monitorGoods(e) {
        if(e==true){
          this.goodsJc = 1
        }else{
          this.goodsJc = 0
        }
      },
      //更多数据监测-粉丝
      monitorFans(e) {
        if(e==true){
          this.followerJc = 1
        }else{
          this.followerJc = 0
        }
      },
      //更多数据监测-点赞
      monitorLike(e) {
        if(e==true){
          this.diggsJc = 1
        }else{
          this.diggsJc = 0
        }
      },
      //点赞提醒
      likeGo(e) {
        if(e==true){
          this.params.likesReminder=1
        }else{
          this.params.likesReminder=0
        }
        //console.log("开播提醒", e)
      },
      //监测时长
      changeTime(e) {
        if (e == 1) {
          this.hour = 1
        } else if (e == 2) {
          this.hour = 2
        } else if (e == 3) {
          this.hour = 3
        } else {
          this.hour = 7
        }
      },
      //tab选择
      clickTab(index) {
        this.val.tabIndex = index
      },
      //视频链接点击
      async clickVideoURL(val) {
        this.show.btnShow =true
        this.show.searchShow = true //初始值,显示推荐
        this.val.activeIndex = '-1' //初始值
        var params = {
          "keyword":decodeURI(val)
        }
        const {
          data
        } = await this.$get('/api/video/awemeSearch',params)
        this.videoList = data.list
        console.log('==========',this.videoList)
        // if(data.errCode == 1){
        //  this.$message.success(data.errMsg)
        // }else{
        //   this.$message.error(data.errMsg)
        // }
        //console.log("12",this.show.searchShow)
      },
      //点击检测事件
       async clickDetection() {
        this.params.startTime= this.GetDateStr(0);
        this.params.endTime=this.GetDateStr(this.hour);
        var param = {
          "monitorId":this.params.monitorId,
          "monitorType":this.params.monitorType,
          "startTime":this.GetDateStr(0),
          "endTime":this.GetDateStr(this.hour),
          "likesReminder":this.params.likesReminder,
          "moreDataMonitor":this.diggsJc+','+this.followerJc+','+this.goodsJc
        }
        var data = await this.$post('/api/user/user_monitor/add_monitor',param)
        console.log('aaaa',data)

        //    this.val.tabIndex == 2 //跳转视频监测历史
      },
      //视频搜索查询
      async getVideoSearch() {
        const {
          data
        } = await this.$get('/api/video/awemeSearch')
        this.videoList = data.list
      },

      //获取日期
      GetDateStr(AddDayCount) {
         var dd = new Date();
         dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
         var y = dd.getFullYear();
         var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
         var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
         var h = dd.getHours()<10?"0"+dd.getHours():dd.getHours();
         var mm = dd.getMinutes()<10?"0"+dd.getMinutes():dd.getMinutes();
         var s=dd.getSeconds()<10?"0"+dd.getSeconds():dd.getSeconds();
         //console.log(y+"-"+m+"-"+d+' '+h+':'+mm+':'+s)
         return y+"-"+m+"-"+d + ' ' + h+':'+mm+':'+s
      },

      //获取历史检测数据
      // async tableList() {
      //   var data = await this.$get(videoMonitorUrl);
      //   this.tableData = data.data;
      //   console.log("=========================",this.tableData)
      //   if(this.tableData.list != ''){
      //     this.tableData.forEach((item)=>{
      //     item.start_time=item.start_time/1000
      //     item.end_time=item.end_time/1000
      //     item.start_time=tools.time_cycle(1,item.start_time)
      //     item.end_time=tools.time_cycle(1,item.end_time)
      //   })
      //   }

      //   //console.log('111', this.data)

      // },

    }
  }
</script>

<style lang="scss" scoped>
  @import "./data.scss";
  @import "../../assets/styles/listNew.scss";
.vido-monitor {


.data-show{
    .el-checkbox.is-checked{
      /deep/.el-checkbox__label{color: #DD001B!important;}
    }
}}
</style>
