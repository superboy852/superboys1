<template>
  <div class="flex flex-direction w-100">
    <div class="flex align-center">
      <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('1')">
        <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 1"></i>
      </span>
      <span class="rdx-p-l-8 rdx-p-r-32" @click="clickOnline('1')">关注</span>
      <el-checkbox-group v-model="val.lineCheck" @change="changeLine">
        <el-checkbox label="1" :disabled="show.onLineIndex == 1 ? show.trueShow : !show.trueShow">累计关注数</el-checkbox>
        <el-checkbox label="2" :disabled="show.onLineIndex == 1 ? show.trueShow : !show.trueShow">粉丝团增量</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="flex align-center rdx-p-t-20 rdx-p-b-20">
      <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('2')">
        <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 2"></i>
      </span>
      <span class="rdx-p-l-8 rdx-p-r-32" @click="clickOnline('2')">互动</span>
      <el-checkbox-group v-model="val.lineCheck" @change="changeLineTwo">
        <el-checkbox label="3" :disabled="show.onLineIndex == 2 ? show.trueShow : !show.trueShow">累计点赞数</el-checkbox>
        <el-checkbox label="4" :disabled="show.onLineIndex == 2 ? show.trueShow : !show.trueShow">评论数增量</el-checkbox>
      </el-checkbox-group>
    </div>
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 370px;"
      v-if="show.dataShow"></no-data>
    <div ref="interact" style="width: 100%; height: 370px;"></div>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['explainParams'],
    data() {
      return {
        option: "",
        optionNew:[],//点击选项后传入新的图表数据
        getData: {
          interactList: []
        },
        val: {
          lineCheck: ['1', '2'],
        },
        lineX: {
          onlineDate: [],
          onLineA: [], //累计关注数
          onLineAA: [],
          onLineB: [], //粉丝团增量
          onLineBB: [],
          onLineC: [], //累计点赞数
          onLineCC: [],
          onLineD: [], //评论数增量
          onLineDD: [],
        },
        show: {
          onLineIndex: '1', //在线分析tab
          dataShow: false,
          isEchears:false,//初始值读取
        },
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.interact)
      this.getInit()
    },
    methods: {
      //获取数据
      async getInit() {
        var params = {
          roomId: this.explainParams
        }
        var onLine = await this.$get('/api/live/detail/onlineTraffic', params) //获取流量3条x轴数据
        // if (onLine != undefined) {
        //   this.getData.interactList = onLine.data.charts
        //   //累计点赞数
        //   this.getData.interactList.forEach((item) => {
        //     this.lineX.onLineA.push(item.increment_follow_count)
        //     this.lineX.onLineB.push(item.today_new_fans_count)
        //     this.lineX.onLineC.push(item.like_count)
        //     this.lineX.onLineD.push(item.incr_comment_count)
        //     this.lineX.onlineDate.push(tools.time_cycle('4', item.crawl_time))
        //   })
        //   this.getChart()
        // } else {
        //   this.show.dataShow = true
        // }
        this.lineX.onLineA = [120, 200, 150, 80, 70, 110, 130]
        this.lineX.onLineB = [220, 260, 150, 80, 70, 110, 130]
        this.lineX.onLineC = [120, 300, 150, 80, 70, 110, 130]
        this.lineX.onLineD = [120, 400, 150, 80, 70, 110, 130]
        this.lineX.onlineDate = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
        this.lineX.onLineAA = {
          name: '累计关注数',
          type: 'bar',
          barGap:0,
          data: this.lineX.onLineA,
          itemStyle: {
            color: "#FF7612",
          }
        }
        this.lineX.onLineBB = {
          name: '粉丝团增量',
          type: 'bar',
          data: this.lineX.onLineB,
          itemStyle: {
            color: "#FFAE66",
          }
        }
        this.lineX.onLineCC = {
          name: '累计点赞数',
          type: 'bar',
          barGap:0,
          data: this.lineX.onLineC,
          itemStyle: {
            color: "#FF7612",
          }
        }
        this.lineX.onLineDD = {
          name: '评论数增量',
          type: 'bar',
          data: this.lineX.onLineD,
          itemStyle: {
            color: "#FFAE66",
          }
        }
        this.getChart()
      },
      //点击在线流量分析具体按钮  流量
      changeLine(e) {
        this.show.isEchears = true
        this.optionNew = []
        if (e.length == 0) {
          this.$message.error("查询条件不能少于1个")
          this.val.lineCheck = ['1']
          this.optionNew.unshift(this.lineX.onLineAA)
          this.getChart()
          return false
        }
        var arrA = ['1', '2']
        const arrNew = arrA.filter(v => e.indexOf(v) != -1)
        arrNew.forEach((item) => {
          if (item == 1) {
            this.optionNew.unshift(this.lineX.onLineAA)
          }
          if (item == 2) {
            this.optionNew.unshift(this.lineX.onLineBB)
          }
        })
        this.getChart()
      },
      changeLineTwo(e) {
        this.show.isEchears = true
        this.optionNew = []
        if (e.length == 0) {
          this.$message.error("查询条件不能少于1个")
          this.val.lineCheck = ['3']
          this.optionNew.unshift(this.lineX.onLineCC)
          this.getChart()
          return false
        }
        var arrA = ['3', '4']
        const arrNew = arrA.filter(v => e.indexOf(v) != -1)
        arrNew.forEach((item) => {
          if (item == 3) {
            this.optionNew.unshift(this.lineX.onLineCC)
          }
          if (item == 4) {
            this.optionNew.unshift(this.lineX.onLineDD)
          }
        })
        this.getChart()
      },
      //点击切换在线流量分析
      clickOnline(index) {
        this.show.onLineIndex = index
        this.show.isEchears = true
        this.optionNew = []
        if(index == 1){
          this.val.lineCheck = ['1','2']
          this.optionNew.unshift(this.lineX.onLineAA,this.lineX.onLineBB)
        }else{
          this.val.lineCheck = ['3','4']
          this.optionNew.unshift(this.lineX.onLineCC,this.lineX.onLineDD)
        }
        this.getChart()
      },
      getChart() {
        this.option;
        this.option = {
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            }
          },
          legend: {
            show: true,
            left: 0,
            top: 16,
            icon: 'roundRect',
            itemWidth: 20,
            itemHeight: 4,
            textStyle: {
              fontSize: 12,
              color: '#999999',
            }
          },
          grid: {
            top: 60,
            bottom: 0,
            left: 0,
            right: 20,
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: this.lineX.onlineDate,
          },
          yAxis: {
            type: 'value',
          },
          series: []
        }

        if(!this.show.isEchears){
          this.option.series.unshift(this.lineX.onLineAA, this.lineX.onLineBB)
        }else{
          this.option.series = this.optionNew
        }
        console.log("1223",this.option.series,this.optionNew)
        this.$nextTick(() => {
          this.myChart.clear()
          this.myChart.setOption(this.option)
        })

      }
    }
  }
</script>
