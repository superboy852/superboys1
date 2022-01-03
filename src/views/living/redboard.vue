<template>
  <div class="box rdx-p-20">
    <div class="flex justify-between">
      <div class="rdx-font-16 rdx-main-color font-strong flex align-center flex">
        <span class="tips rdx-m-r-12"></span>
        <span>红人直播实时数据大屏</span>
        <span class="flex aligin-end rdx-p-l-10">
          <img src="../../assets/imgs/LIVE.png" />
        </span>
      </div>
      <div class="tab rdx-light-color" @click="clicmLiveMonitorit">添加直播监控</div>
    </div>
    <div class="flex flex-wrap">
      <div class="flex justify-between rdx-m-r-20 rdx-m-t-20 data-item-bg rdx-radius-4 rdx-p-20" v-for="(item,index) in tableData" :key="index">
        <div class="flex w-70 flex-direction position-re">
          <div class="flex">
            <div class="flex position-re" v-if="item.status == 2">
              <img :src="item.avatar" style="width: 50px; height: 50px;" class="round round-line" />
              <div class="tag-living rdx-light-color rdx-text-center" style="font-size: 6px;">直播中</div>
            </div>
            <div class="flex position-re" v-if="item.status == 4">
              <img :src="item.avatar" style="width: 50px; height: 50px;" class="round" />
              <div class="tag-living1 rdx-light-color rdx-text-center" style="font-size: 6px;">已结束</div>
            </div>
            <div class="flex flex-direction rdx-p-l-10">
              <span class="font-strong rdx-line-1 rdx-p-t-4 link-primary" style="width: 200px; padding-bottom: 2px;" @click="linkLarge(item.room_id,item.status)">{{item.nickname}}</span>
              <span class="rdx-tips-color rdx-font-14">粉丝数：{{item.follower_count}}</span>
            </div>
          </div>
          <div class="position-ab flex w-100 flex-direction rdx-font-14 rdx-p-l-60" style="bottom: 0px;">
            <span>开始时间 {{item.begin_time}}</span>
            <span class="rdx-p-t-6 redboard-color" @click="clickHisBoad(item)">查看历史直播<i class="color-content">319</i>场</span>
          </div>
        </div>
        <div class="flex w-30 flex-direction">
          <div class="flex align-center justify-end rdx-p-r-8">
            <img src="../../assets/imgs/living_ico_3.gif" style="width: 15px; height: 15px;">
            <span class="color-content3 rdx-font-14 rdx-p-l-6">正在直播</span>
          </div>
          <div class="data-button rdx-light-color rdx-m-t-18 button-all-all" @click="linkLarge(item.room_id,item.status)">数据大屏</div>
          <div class="data-button2 rdx-light-color rdx-m-t-18 button-all-all" @click="clickLiveData(item.room_id)">数据详情</div>
        </div>
      </div>





    </div>
    <!-- 历史记录弹窗 -->
    <div>
      <el-dialog :visible.sync="historyReboad" width="640px">
        <template slot="title">
          <div class="flex">
            <div class="font-strong rdx-font-18 rdx-main-color">历史直播</div>
            <div class="rdx-m-l-10 rdx-font-12 rdx-main-color flex align-end">
              共计<span class="rdx-primary">{{author_info.total_live_count}}</span>场
            </div>
          </div>
        </template>
        <div>
          <div class="flex rdx-p-b-10" style="border-bottom: 1px solid #dbdbdb;margin-top: -20px;">
            <div>
              <img :src="author_info.avatar" style="width: 60px;height: 60px;" class="round-line round" />
            </div>
            <div class="rdx-p-l-22 flex flex-direction justify-center">
              <div class="font-strong rdx-font-16 rdx-main-color">
                {{author_info.nickname}}
              </div>
              <div class="rdx-font-14 rdx-tips-color rdx-m-t-10">
                粉丝{{author_info.follower_count}}
              </div>
            </div>
          </div>
          <div style="height: 300px; overflow:auto" v-infinite-scroll="getScroll" :infinite-scroll-disabled="show.scrollShow">
            <div class="flex rdx-p-t-16 rdx-p-b-16 flex align-center" v-for="(items,index) in authorData" :key="index">
              <div class="font-strong rdx-font-16 rdx-main-color" style="width: 115px;">{{items.hisDate}}</div>
              <div class="rdx-font-12 rdx-tips-color rdx-m-l-10 rdx-line-1" style="width: 180px;">{{items.room_title}}</div>

              <div v-if="items.status == 2" class="rdx-font-12 rdx-tips-color flex align-center rdx-m-l-6" style="width: 100px;">
                <div class="rdx-primary-bg rdx-light-color" style="padding: 2px 6px;">
                  直播中
                </div>
                <div class="rdx-m-l-6 flex align-end"><img src="../../assets/imgs/living_ico_3.gif" style="width: 12px;height: 12px;"/></div>
              </div>

              <div v-if="items.status == 4" class="rdx-font-12 rdx-tips-color rdx-m-l-6" style="width: 100px;">{{items.hisStarEnd}}</div>

              <div class="flex align-center" style="width: 134px;">
                <div class="rdx-font-12 rdx-tips-color">销售额</div>
                <div class="font-strong rdx-font-16 rdx-main-color rdx-m-l-6">{{items.amount}}</div>
              </div>
              <div class="rdx-primary rdx-font-14 button-a" @click="linkLarge(items.room_id)">查看</div>
            </div>
            <div class="flex w-100 justify-center rdx-p-t-10 rdx-tips-color" style="border-top: 1px solid #ececec;" v-if="show.footShow">--到底了--</div>
          </div>

        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { redboardUrl } from '@/api'
import * as tools from '@/common/tools.js';

export default {
  data() {
    return {
      loading:false,
      params:{
        page:1,
        size:10
      },
      list: [],
      tableData:[],
      date:'',
      historyReboad: false,  //历史直播记录弹窗开关
      author_info:{},  //红人基本信息
      authorId:'',     //达人Id
      authorData: [],   //红人历史直播数据
      redBord: {},        //分组后的红人数据
      show: {
        footShow: false,  //到底
        scrollShow:false,//滚动条禁用
      },
    }
  },
  created() {
    this.loadData()
    this.clearTime = setInterval(() => {
      this.loadData()
    }, 1000000)
  },
  beforeDestroy() {
    clearInterval(this.clearTime)
  },
  methods: {
    //滚动事件触发下拉加载
    async getScroll() {
      console.log("123AAAA",this.params.page,this.authorData)
      const { data } = await this.$get('/api/live/rooms',this.params)
      if(data!=undefined){
        data.list.forEach((item)=>{
          item.begin_time=tools.time_cycle(1,item.begin_time)
          item.room_finish_time=tools.time_cycle(1,item.room_finish_time)
          item.hisDate=item.begin_time.split(" ").[0];
          var starDate=item.begin_time.split(" ").[1];
          var endDate=item.room_finish_time.split(" ").[1];
          item.hisStarEnd = starDate+'-'+endDate
        })
        if(data.list != ''){
          this.authorData = this.authorData.concat(data.list)
          this.params.page++; //每触底一次
        }else{
          this.show.footShow = true
        }
        }
    },


    //历史直播记录
    async getHisRoom() {
      const { data } = await this.$get('/api/live/rooms',this.params)
      if(data!=undefined){
        data.list.forEach((item)=>{
          item.begin_time=tools.time_cycle(1,item.begin_time)
          item.room_finish_time=tools.time_cycle(1,item.room_finish_time)
          item.hisDate=item.begin_time.split(" ").[0];
          var starDate=item.begin_time.split(" ").[1];
          var endDate=item.room_finish_time.split(" ").[1];
          item.hisStarEnd = starDate+'-'+endDate
        })
        this.authorData = data.list
        this.show.scrollShow = false
        this.params.page++
      }
    },
    //历史记录弹窗点击
    clickHisBoad(data){
      this.author_info = data
      this.params.authorId = data.author_id
      this.historyReboad=true
      this.authorData = []
      this.params.page = 1
      this.show.footShow = false
      this.show.scrollShow = true
      this.getHisRoom()
    },
    async loadData() {
      this.loading = true
      const { data } = await this.$get(redboardUrl)
      if(data.hot!=undefined){
        this.loading = false
        this.tableData = data.hot
        // this.tableData.forEach((item)=>{
        //   item.begin_time = tools.time_cycle(3,item.begin_time)
        // })
        // this.redBord = this.timeDate(this.tableData);
        this.tableData.forEach((item)=>{
          // item.xq=this.getWeek(item.key);
          item.begin_time = tools.time_cycle(1,item.begin_time)
          item.sales_amount = tools.numberVerify(item.sales_amount)
          item.watch_cnt = tools.numberVerify(item.watch_cnt)
          item.follower_count = tools.numberVerify(item.follower_count)
        })
        console.log("red",this.tableData)
        // this.redBord[0].list=this.Mp(this.redBord[0].list)

        this.total = data.page_info && data.page_info.totalCount
      }
    },

    //冒泡排序（在直播中的显示在前面）
    Mp(arr){
      var temp;
      for(var i=0; i<arr.length-1; i++){//冒泡趟数
        for(var j=0; j<arr.length-i-1; j++){
          if(arr[j+1].status < arr[j].status){
            temp = arr[j+1];
            arr[j+1] = arr[j];
            arr[j] = temp;
            }
          }
        }
      return arr;
    },

    //将数据按时间进行分类分组
    timeDate(arr){
      var newArr = [];
      var value = [];
      arr.forEach((items,i)=>{
        value.push(items.begin_time);
        var arr1=[];
        for (var a = 0; a < value.length; a++) {
          if(value[a] == value[a+1]){
            value.splice(a,1)
          }
        };
      });

      var listAAA = [];
      var listBBB = [];
      for (var j = 0; j < value.length; j++) {
        listAAA.push({
          key:value[j],
          list: listBBB
        });
        for (var k = 0; k < arr.length; k++) {

          if(value[j] == arr[k].begin_time ){
            listBBB.push(arr[k])
          }
        }
        listBBB = [];
      };
      return listAAA;
    },

    //根据日期获取星期几
    getWeek(dateString) {
        var dateArray = dateString.split("-");
        var xq = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
        return "周" + "日一二三四五六".charAt(xq.getDay());
    },
    //跳转到实时大屏
    linkLarge(id,status){
      var url = this.$router.resolve({path: '/data_large',query: {id: id}})
      window.open(url.href, '_blank')
    },
    //点击跳转直播详情
    clickLiveData(id){
      var url = this.$router.resolve({path: '/living/living_detail',query: {id: id}})
      window.open(url.href, '_blank')
    },
    clicmLiveMonitorit(){
      this.$router.push({path:"/data/data_living"})
    },
    handleCate(cate) {
      this.params.category = cate
      // to search
    },
    handleTag(tag) {
      this.params.tag = tag
    },
    setRowStyle(row) {
      if (row.prop === 'goods') {
        return 'color:red;'
      }
    }
  },

}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
 .redboard-box{background: url(../../assets/imgs/redboard_bg.png) no-repeat left top; width: 380px; height:209px; background-size: 100% 100%;}
.search {
  padding: 20px;
  background: $rdx-bg-color;
  border-radius: 10px;
}

.ztw{
  width: 26px; height: 26px;
}
.zt_bg{
  background: #dd0000;border-radius: 2px;
}
.color-time{color: #F9CC3F;}
.tab{width: 136px;
height: 39px; line-height: 39px; color:#DC4E00;
cursor: pointer;
text-align: center;
border: 1px solid #FF965C;
border-radius: 6px;}
.tab:hover{background-color: $rdx-pink; color:#FFFFFF}
.tag-living{position: absolute; bottom:0px; width: 48px; height: 18px; line-height: 18px; background: linear-gradient(rgba(248,83,83,1.00) 0%, #c91313 100%); border-radius: 9px;}
.tag-living1{position: absolute; bottom:0px; width: 48px; height: 18px; line-height: 18px; background: $rdx-content-color; border-radius: 9px;}
.round-line{border: 2px solid #dd001b;}
  /deep/.el-table .el-table__body-wrapper tr:hover{cursor: pointer;}

</style>
