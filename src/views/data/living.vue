<template>
  <div class="data-show flex flex-direction">
    <strong class="font-strong rdx-p-b-20">直播大屏</strong>
    <div class="flex justify-between line-top align-start">
      <div class="flex flex-wrap w-70 line-right">
        <div class="flex align-center w-100 rdx-p-t-16 rdx-p-b-10">
          <span class="tag"></span>
          <strong class="rdx-m-l-8 font-strong">热门直播</strong>
        </div>
        <div class="flex justify-between rdx-m-r-8 rdx-m-t-10 data-item-bg rdx-radius-4 rdx-p-20" v-for="(item,index) in hotLiveData" :key="index">
          <div class="flex w-70 flex-direction position-re">
            <div class="flex">
              <img :src="item.avatar" class="data-head round">
              <div class="flex flex-direction rdx-p-l-10 rdx-line-height-30">
                <span class="font-strong">{{item.nickname}}</span>
                <span class="rdx-tips-color rdx-font-14">粉丝数：{{item.follower_count}}</span>
              </div>
            </div>
            <div class="position-ab flex w-100" style="bottom: 0px;">
              <div class="flex flex-direction align-center rdx-content-color rdx-p-l-20">
                <div class="flex rdx-font-22 font-strong">{{item.user_count==null?'0':item.user_count}}</div>
                <div class="flex rdx-p-t-14 rdx-font-14">观看人次</div>
              </div>
              <div class="flex flex-direction align-center rdx-p-l-50">
                <div class="flex rdx-font-22 font-strong">{{item.sales_amount}}</div>
                <div class="flex rdx-p-t-14 rdx-font-14 rdx-content-color">销售额</div>
              </div>
            </div>
          </div>
          <div class="flex w-30 flex-direction">
            <div class="flex align-center justify-end rdx-p-r-8">
              <img src="../../assets/imgs/living_ico_3.gif" style="width: 15px; height: 15px;">
              <span class="color-content3 rdx-font-14 rdx-p-l-6">正在直播</span>
            </div>
            <div class="data-button rdx-light-color rdx-m-t-18 button-all-all" @click="linkData(item.room_id)">数据大屏</div>
            <div class="data-button2 rdx-light-color rdx-m-t-18 button-all-all" @click="clickLiveData(item.room_id)">数据详情</div>
          </div>
        </div>
        <no-data marginTop="0" class="rdx-p-t-30 flex justify-center w-100" v-if="hotLiveData == ''"></no-data>
      </div>
      <div class="flex w-30 flex-wrap rdx-p-l-20">
        <div class="flex w-100 justify-between align-center">
          <div class="flex align-center w-100 rdx-p-t-16 rdx-p-b-10">
            <span class="tag"></span>
            <strong class="rdx-m-l-8 font-strong">关注的直播</strong>
          </div>
          <div>
            <div class="flex rdx-radius-8 rdx-light-color rdx-line-height-30 rdx-p-lr-10 rdx-font-14 button-all justify-center" style="width: 120px;"
              @click="addLiving">添加播主</div>
          </div>
        </div>
        <div class="flex justify-between rdx-m-r-8 rdx-m-t-10 rdx-radius-4 rdx-p-20" style="background-color: #F0F0F0; width: 100%;" v-for="(item,index) in liveDecData" :key="index">
          <div class="flex w-70 flex-direction position-re">
            <div class="flex">
              <img :src="item.avatar" class="data-head round">
              <div class="flex flex-direction rdx-p-l-10 rdx-line-height-30">
                <span class="font-strong">{{item.nickname}}</span>
                <span class="rdx-tips-color rdx-font-14">粉丝数：{{item.follower_count}}</span>
              </div>
            </div>
            <div class="position-ab flex w-100" style="bottom: 0px;">
              <div class="flex flex-direction align-center rdx-content-color rdx-p-l-20">
                <div class="flex rdx-font-22 font-strong">{{item.user_count}}</div>
                <div class="flex rdx-p-t-14 rdx-font-14">观看人次</div>
              </div>
              <div class="flex flex-direction align-center rdx-p-l-50">
                <div class="flex rdx-font-22 font-strong">{{item.sales}}</div>
                <div class="flex rdx-p-t-14 rdx-font-14 rdx-content-color">销售额</div>
              </div>
            </div>
          </div>
          <div class="flex w-30 flex-direction">
            <div class="flex align-center justify-end rdx-p-r-8">
              <img src="../../assets/imgs/living_ico_3.gif" style="width: 15px; height: 15px;">
              <span class="color-content3 rdx-font-14 rdx-p-l-6">正在直播</span>
            </div>
            <div class="data-button rdx-light-color rdx-m-t-18" style="width: 100px;" @click="linkData(item.dy_room_id)">数据大屏</div>
            <div class="data-button2 rdx-light-color rdx-m-t-18" style="width: 100px;" @click="clickLiveData(item.live_id)">数据详情</div>
          </div>
        </div>
        <div class="flex justify-center flex-direction align-center rdx-p-t-60 w-100" v-if="liveDecData==''">
          <div class="flex flex-direction">
            <img src="../../assets/imgs/data_not.png" style="width: 106px; height: 86px;">
            <span class="rdx-font-16 rdx-tips-color rdx-m-t-20">没有关注的主播</span>
          </div>
          <div class="data-button rdx-light-color rdx-m-t-20 flex justify-center"
            @click="addLiving">
            <i class="iconfont icon-e600"></i>
            <span class="rdx-p-l-6">添加播主</span>
          </div>
        </div>
      </div>
    </div>
    <!--添加播主弹窗-->
    <el-dialog title="添加监控" :visible.sync="show.livingShow" width="450px" :before-close="closeDialog">
      <div class="flex flex-direction rdx-p-b-10 align-center">
        <div class="rdx-tips-color rdx-p-b-30">可对达人的直播进行监测，提供秒级的音浪收入、在线人数、弹幕数、上架商品监测，掌握达人直播热度数据</div>
        <div class="w-90 flex flex-direction aligin-center">
          <!-- <div class="flex seo-input align-center justify-between">
            <el-input class="seo-input-mian rdx-font-18 rdx-flex-1" v-model="username"></el-input>
            <div class="seo-but flex justify-center align-center button-search" @click="searchUser">
              <i class="iconfont icon-e636 rdx-light-color rdx-font-28"></i>
            </div>
          </div> -->
          <search-item @clickKey='searchUser' searchType="5" searchWidth='350'></search-item>

          <div class="flex w-100 flex-direction rdx-p-r-10" style="overflow-y: auto; max-height: 300px;" v-if="show.searchShow">
            <div class="box-item rdx-radius-8 flex rdx-m-t-20 align-center button-a" :class="val.activeIndex == index ? 'rdx-success-light-bg' : ''" @click="onActive(index,item.author.author_id,item.author.nickname)" v-for="(item,index) in tableData" :key="index">
              <img :src="item.author.avatar" style="width: 60px; height: 60px;" class="round" >
              <div class="flex flex-direction rdx-p-l-16">
                <span>{{item.author.nickname}}</span>
                <span class="rdx-tips-color rdx-line-height-36">ID {{item.author.unique_id}}</span>
              </div>
            </div>

          </div>

          <div class="flex w-100 flex-direction rdx-p-r-10" style="overflow-y: auto; max-height: 300px;" v-if="show.searchShows">
            <div class="box-item rdx-radius-8 flex rdx-m-t-20 align-center button-a" :class="val.activeIndex == index ? 'rdx-success-light-bg' : ''" @click="onActive(index,item.monitor_id,item.author_nickname)" v-for="(item,index) in tableDatas" :key="index">
              <img :src="item.author_headImg" style="width: 60px; height: 60px;" class="round" >
              <div class="flex flex-direction rdx-p-l-16">
                <span>{{item.author_nickname}}</span>
                <span class="rdx-tips-color rdx-line-height-36">ID {{item.monitor_id}}</span>
              </div>
            </div>

          </div>

          <div class="rdx-line-height-20 rdx-p-t-20 rdx-tips-color rdx-p-b-20">选择监控时长</div>
          <el-radio-group v-model="val.time" style="margin-bottom: 30px;" @change="timeOk">
            <el-radio-button label="1">近1天</el-radio-button>
            <el-radio-button label="2">近3天</el-radio-button>
            <el-radio-button label="3">近7天</el-radio-button>
            <el-radio-button label="4">近30天</el-radio-button>
            <el-radio-button label="5">自定义</el-radio-button>
          </el-radio-group>
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="val.timeBegin" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" v-if="show.timeShow" @change="timeGo">
          </el-date-picker>
          <div class="flex rdx-p-t-20 ">
            <span class="rdx-p-r-8">开播提醒</span>
            <el-switch v-model="show.remind" active-color="#ff4949" inactive-color="#dddddd" @change="remindGo"></el-switch>

          </div>
          <div v-if="show.remind" class="rdx-m-t-10 rdx-tips-color">
               <a>您已开启直播开播提醒，请绑定微信号并关注观星树公众号我们将通过观星树公众号给您发送通知，若已绑定请忽略</a>
             </div>
          <div class="flex justify-between rdx-m-t-20 rdx-m-b-20" >本次监测需消耗
            <span class="rdx-primary rdx-p-lr-4">{{getNumbr.need_num}}</span> 次监控次数 本月剩余
            <span class="rdx-primary rdx-p-lr-4">{{getNumbr.surplus_num}}</span> 次
            <span class="rdx-primary rdx-m-l-10 button-a buttomts" @click="buyNumber" :class="getNumbr.surplus_num == 0?'rdx-tips-color':''">购买次数</span></div>
          <div class="flex justify-center">
            <el-button type="primary" class="button-all" size="medium" :disabled="disa == 0" @click="clickDetectionLive">开始监测</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  export default {
    components:{
      searchItem,noData
    },
    data() {
      return {
        disa:'0',
        show: {
          livingShow: false,
          timeShow: false, //自定义时长
          remind:false, //开播提醒
          searchShow:false,//搜索展示内容
          searchShows:false,//搜索展示内容

        },
        val: {
          time: 1, //选择监控时长
          timeBegin: "",
          activeIndex:'-1',//点击id背景变

        },
        params: {
          monitorType: '1',
          //  monitorId:'7005422718245964555',
        },
        tableData: [],
        tableDatas: [],
        liveDecData:[],
        getNumbr:{},
        username: '',
        hour: '',
        custom: '1',
        dates: [],
        hotLiveData: [],   //热门直播

      }
    },
    computed:{
      ...mapGetters(['tokenOk','token'])
    },
    mounted() {
      this.tableList()
      this.liveList()
      this.hotLiveList()
      this.obtaining()
    },
    methods: {
      //热门直播数据
      async hotLiveList(){
        const {
          data
        } = await this.$get('/api/live/widget')
        this.hotLiveData = data.hot
        this.hotLiveData.forEach((item)=>{
          item.follower_count = tools.numberVerify(item.follower_count)
          item.sales_amount = tools.numberVerify(Math.abs(item.sales_amount))
          item.total_user = tools.numberVerify(item.total_user)
        })
      },

      //点击跳转直播详情
      clickLiveData(id){
        this.$router.push({path:"/living/living_detail",query:{id:id}})
        //console.log('1',id)
      },
      //跳转到实时大屏
      linkData(id){
		var url = this.$router.resolve({path: '/data_large',query: {id: id}})
		window.open(url.href, '_blank')
      },
      //点击获取id
      onActive(index,id,name){
        this.val.activeIndex = index
        this.params.monitorId = id
        this.username = name
        this.disa = 1
      },
      async obtaining(){ //获取消耗和剩余监控次数
        var params = {
          startTime: this.GetDateStr(0),
          endTime: this.GetDateStr(this.hour),
          moreDataMonitor:(0,0,0)
        }
        // console.log("=========",this.GetDateStr(0),this.GetDateStr(this.hour))
        const {
          data
        } = await this.$post('/api/user/user_monitor/get_monitor_num',params)
        // console.log(data)
        this.getNumbr = data.data
        if(this.getNumbr.surplus_num == '' || this.getNumbr.surplus_num == null){
          this.getNumbr.surplus_num =='0'
        }
      },
      //搜索展示内容弹窗
      async searchUser(val){
        this.show.searchShows = true  //初始值
        var par = {
          keyword:val
        }
        const {
          data
        } = await this.$get('/api/author/searchAuthorByMonitor',par)
        this.tableDatas = data.list
      },
      //获取热门直播搜索数据
      async tableList(){
        const {
          data
        } = await this.$get('/api/live/search')
        this.tableData = data.list
      },
      //点击监测主播
      async clickDetectionLive(){
        if(this.custom == 1){
          this.params.startTime= this.GetDateStr(0);
          this.params.endTime=this.GetDateStr(this.hour);
        }else{
          this.params.startTime= this.dates[0]
          this.params.endTime=this.dates[1];
        }
        var {data} = await this.$post('/api/user/user_monitor/add_monitor',this.params)
        console.log('11',data)
        if (data.errCode == 0) {
          this.$message.success("添加成功")
        }else{
          this.$message.error("添加失败")
        }
        this.show.livingShow = false
        this.tableList()
        this.$forceUpdate()
        //console.log('9',this.params)
      },

      //开播提醒
      remindGo(e){
        //console.log("开播提醒",e)
      },
      //选择时间
      timeGo(e) {
        this.dates=e
        //console.log("time", e)
      },
      //选择时间近几天
      timeOk(e) {
        console.log("timeok", e)
        if (e == 1) {
          this.hour = 1
          this.custom=1
          this.show.timeShow = false
        } else if (e == 2) {
          this.hour = 3
          this.custom=1
          this.show.timeShow = false
        } else if (e == 3) {
          this.hour = 7
          this.custom=1
          this.show.timeShow = false
        } else if(e == 4){
          this.hour = 30
          this.custom=1
          this.show.timeShow = false
        }else if (e == 5) {
          this.custom=2
          this.show.timeShow = true
        }

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

      buyNumber(){    //购买次数
      this.show.livingShow = false
        if(this.token == ''){
          this.saveTokenOk("51000") //需要登录
          return;
        }
         this.saveTokenOk("52000")
        },
  ...mapActions(['saveTokenOk']),
      //获取检测到的主播数据
      async liveList() {
        var {data} = await this.$get("/api/user/user_monitor/get_live_monitor")
        if(data.list != ''){
          this.liveDecData = data.list

        }
      },
      //添加主播
      addLiving() {
        this.show.livingShow = true
        this.disa = 0
        this.show.searchShow = false //初始值
        this.val.activeIndex = '-1' //初始值
      },
      //关闭弹窗
      closeDialog() {
        this.show.livingShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./data.scss";
  .buttomts:hover{color:$rdx-success}
  .color-time:hover{color: $rdx-primary;}
  //input搜索



</style>
