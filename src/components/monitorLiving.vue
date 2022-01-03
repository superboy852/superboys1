<template>
  <div class="flex flex-direction rdx-p-b-10 align-center">
    <el-dialog :title="title" :visible.sync="show.livingShow" width="450px" :before-close="closeDialog">
      <div class="w-100 flex flex-direction aligin-center" style="margin-top: -20px;">
        <search-item @clickKey='searchUser' :searchType="monitorType" searchWidth='410' searchPlaceholder="请输入昵称、抖音号或者主页链接">
        </search-item>
        <div class="flex w-100 flex-direction rdx-p-r-10 rdx-m-b-20"
          style="overflow-y: auto; max-height: 200px; padding-bottom: 10px;" v-if="show.searchShow && monitorType == 4">
          <div class="box-item rdx-radius-8 flex align-center button-a rdx-m-b-10"
            :class="val.activeIndex == index ? 'rdx-success-light-bg' : ''" @click="onActive(index,item.author_id)"
            v-for="(item,index) in tableData" :key="index">
            <img :src="item.avatar" style="width: 60px; height: 60px;" class="round">
            <div class="flex flex-direction rdx-p-l-16">
              <span>{{item.nickname}}</span>
              <span class="rdx-tips-color rdx-line-height-36" v-if="">ID {{item.unique_id}}</span>
            </div>
          </div>
        </div>
        <div class="flex w-100 flex-direction rdx-p-r-10 rdx-m-b-20"
          style="overflow-y: auto; max-height: 200px; padding-bottom: 10px;" v-if="show.searchShow && monitorType == 1">
          <div class="box-item rdx-radius-8 flex align-center button-a rdx-m-b-10"
            :class="val.activeIndex == index ? 'rdx-success-light-bg' : ''" @click="onActive(index,item.author_id)"
            v-for="(item,index) in tableData" :key="index">
            <img :src="item.avatar" style="width: 60px; height: 60px;" class="round">
            <div class="flex flex-direction rdx-p-l-16">
              <span>{{item.nickname}}</span>
              <span class="rdx-tips-color rdx-line-height-36" v-if="">{{item.unique_id}}</span>
            </div>
          </div>
        </div>
        <div class="rdx-line-height-20 rdx-tips-color rdx-p-b-20">选择监控时长</div>
        <el-radio-group v-model="val.time" style="margin-bottom: 10px;" @change="timeOk">
          <el-radio-button label="1">近1天</el-radio-button>
          <el-radio-button label="2">近3天</el-radio-button>
          <el-radio-button label="3">近7天</el-radio-button>
          <el-radio-button label="4">近30天</el-radio-button>
          <el-radio-button label="5">自定义</el-radio-button>
        </el-radio-group>
        <el-date-picker value-format="yyyyMMdd" v-model="val.timeBegin" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" v-if="show.timeShow" @change="timeGo">
        </el-date-picker>
        <div class="flex rdx-p-t-15">
          <span class="rdx-p-r-8">开播提醒</span>
          <el-switch v-model="show.remind" active-color="#ff4949" inactive-color="#dddddd" @change="remindGo">
          </el-switch>

        </div>
        <div v-if="show.remind" class="rdx-m-t-10 rdx-tips-color">
          <a>您已开启直播开播提醒，请绑定微信号并关注观星树公众号我们将通过观星树公众号给您发送通知，若已绑定请忽略</a>
        </div>
       <div class="flex justify-between rdx-m-t-20 rdx-m-b-20" v-if="show.monitorNubShow">本次监测需消耗
          <span class="rdx-primary rdx-p-lr-4">{{val.need_num}}</span> 次监控次数 本月剩余
          <span class="rdx-primary rdx-p-lr-4">{{val.surplus_num}}</span> 次
          <span class="rdx-primary rdx-m-l-10 button-a buttomts" @click="buyNumber">购买次数</span>
        </div>
        <div class="flex justify-center">
          <el-button type="info" plain size="medium" v-if="val.need_num > val.surplus_num">开始监测</el-button>
          <el-button type="danger" size="medium" v-else @click="clickDetectionLive">开始监测</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import searchItem from '@/components/searchItem.vue'
  import noData from '@/components/noData.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      searchItem,
      noData
    },
    props: {
      monitorType: { //监控类型(直播1,视频2,评论3,达人4)
        type: String,
        default: "1"
      },
      title: { //标题
        type: String,
        default: "添加抖音号监测"
      }
    },
    data() {
      return {
        tableData: [], //搜索达人数据
        custom: '1',
        show: {
          timeShow: false, //自定义时长
          remind: false, //开播提醒
          searchShow: false, //搜索展示内容
          livingShow:true,
          monitorNubShow:false,//监控次数显示
        },
        val: {
          time: 1, //选择监控时长
          timeBegin: "",
          activeIndex: '-1', //点击id背景变
          need_num:0,//本次需要消耗监控次数
          surplus_num:-1,//监控还剩次数
        },
        params: {
          page: 1,
          size: 10,
          keyword: "",
          sort: 'follower_count' ,
          order: 'desc',
        },
        paramsForm:{  //提交监控参数
          monitorId:'',
          likesReminder:'0'
        },
        hour:1,//监控初始时间
      }
    },
    // watch: {
    //   searchShow() {
    //     console.log("1232")
    //     this.searchShow = false
    //   }
    // },
    computed: {
      ...mapGetters(['tokenOk', 'token'])
    },
    mounted() {
      this.paramsForm.startTime = this.GetDateStr(0); //时间初始值
      this.paramsForm.endTime = this.GetDateStr(1);//时间初始值
    },
    methods: {
      //获取次数
      async getMonitorNum(){
        const {data} = await this.$post('/api/user/user_monitor/get_monitor_num', this.paramsForm)
        if(data != undefined){
          this.show.monitorNubShow = true
          this.val.need_num = data.data.need_num
          this.val.surplus_num = data.data.surplus_num
        }else{
          this.$message.error("本次需要消耗监控次数有问题，请联系管理员")
        }

        console.log("data",data,this.paramsForm)
      },
      //关闭弹窗
      closeDialog(){
        this.$emit("closeMonitor", false)
        this.show.monitorNubShow = false
        this.show.searchShow = false
      },
      buyNumber() { //购买次数
        if (this.token == '') {
          this.saveTokenOk("51000") //需要登录
          return;
        }
        this.saveTokenOk("52000")
        this.$emit("closeMonitor", false)
      },
      //点击监测主播
      async clickDetectionLive() {
        if(this.paramsForm.monitorId == ''){
          this.$message.error("请搜索抖音号,选择达人")
          return false
        }
        this.paramsForm.monitorType = this.monitorType
        const {
          data
        } = await this.$post('/api/user/user_monitor/add_monitor', this.paramsForm)
        if (data.data == 0) {
          this.$message.error('请勿重复添加')
        } else if(data.data > 0){
          this.$message.success("添加成功")
        } else {
          this.$message.error(data.errMsg)
        }
        this.$emit("submitOk",false)
      },
      //开播提醒
      remindGo(e) {
        if(e == true){
          this.paramsForm.likesReminder = 1
        }else{
          this.paramsForm.likesReminder = 0
        }
        this.getMonitorNum()//计算次数
      },
      //选择时间
      timeGo(e) {
        this.dates = e
        this.paramsForm.startTime = this.dates[0]
        this.paramsForm.endTime = this.dates[1];
        this.getMonitorNum()//计算次数
        //console.log("time", e)
      },
      //获取时间
      timeOk(e) {
        if (e == 1) {
          this.hour = 1
          this.custom = 1
          this.show.timeShow = false
        } else if (e == 2) {
          this.hour = 3
          this.custom = 1
          this.show.timeShow = false
        } else if (e == 3) {
          this.hour = 7
          this.custom = 1
          this.show.timeShow = false
        } else if (e == 4) {
          this.hour = 30
          this.custom = 1
          this.show.timeShow = false
        } else if (e == 5) {
          this.custom = 2
          this.show.timeShow = true
        }
        if (this.custom == 1) {
          this.paramsForm.startTime = this.GetDateStr(0);
          this.paramsForm.endTime = this.GetDateStr(this.hour);
          this.getMonitorNum()//计算次数
        }
      },
      //计算日期
      GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        var h = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
        var mm = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
        var s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
        //console.log(y+"-"+m+"-"+d+' '+h+':'+mm+':'+s)
        return y + "" + m + "" + d
        // return y + m + d
      },
      //点击获取id
      onActive(index, id) {
        this.val.activeIndex = index
        this.paramsForm.monitorId = id
        console.log('qqsxxx',id)
        this.getMonitorNum()//计算次数
      },
      //获取搜索值
      searchUser(val) {
        this.show.searchShow = true //初始值
        this.params.keyword = val
        this.tableList()
      },
      //搜索达人数据
      async tableList() {
        if(this.monitorType == 1){
          const {data} = await this.$get('/api/author/search', this.params)
          if (data != undefined) {
            this.tableData = data.list
          }
        }else{
        //const {data} = await this.$get('/api/live/search', this.params)
        const {data} = await this.$get('/api/author/search', this.params)
        if (data != undefined) {
          this.tableData = data.list
        }
        }
      },
      ...mapActions(['saveTokenOk']),
    }
  }
</script>
<style lang="scss" scoped>
  .box-item {
    border: 1px solid #dcdfe6;
    padding: 10px;
  }
</style>
