<template>
  <div class="flex flex-direction w-100">
    <div class="flex flex-direction">
      <div class="flex align-center">
        <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('1')">
          <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 1"></i>
        </span>
        <span class="rdx-p-l-8 rdx-p-r-32" @click="clickOnline('1')">关注</span>
        <el-checkbox-group v-model="val.lineCheck" @change="changeLine">
          <el-checkbox label="1" :disabled="show.onLineIndex == 1 ? show.trueShow : !show.trueShow">累计关注数</el-checkbox>
          <!--          <el-checkbox label="2" :disabled="show.onLineIndex == 1 ? show.trueShow : !show.trueShow">粉丝团增量</el-checkbox> -->
        </el-checkbox-group>
      </div>
      <div class="flex align-center rdx-m-t-20">
        <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('2')">
          <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 2"></i>
        </span>
        <span class="rdx-p-l-8 rdx-p-r-32" @click="clickOnline('2')">互动</span>
        <el-checkbox-group v-model="val.lineCheck" @change="changeLineTwo">
          <el-checkbox label="3" :disabled="show.onLineIndex == 2 ? show.trueShow : !show.trueShow">累计点赞数</el-checkbox>
          <el-checkbox label="4" :disabled="show.onLineIndex == 2 ? show.trueShow : !show.trueShow">评论数增量</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div ref="interact" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['explainParams', 'startDate', 'endDate'],
    data() {
      return {
        getData: {
          interactList: []
        },
        val: {
          lineCheck: ['1', '2'],
        },
        lineX: {
          onlineDate: [],
          interactA: [], //累计关注数
          interactA_A: [],
          interactB: [], //粉丝团增量
          interactB_B: [],
          interactC: [], //累计点赞数
          interactC_C: [],
          interactD: [], //评论数增量
          interactD_D: [],
        },
        show: {
          onLineIndex: '1', //在线分析tab
          dataShow: false
        },
      }
    },
    mounted() {
      setTimeout(() => {
        this.getInit()
      }, 1000)


    },
    methods: {
      //获取数据
      async getInit() {
        var params = {
          "brandId": this.explainParams,
          "startTime": this.startDate,
          "endTime": this.endTime,
        }
        var onLine = await this.$get('/api/brand/detail/interaction', params) //获取流量3条x轴数据
        if (onLine != undefined) {
          this.getData.interactList = onLine.data.list
          //累计点赞数
          this.getData.interactList.forEach((item) => {
            this.lineX.interactA.push(item.increment_follow_count)
            this.lineX.interactB.push(item.today_new_fans_count)
            this.lineX.interactC.push(item.like_count)
            this.lineX.interactD.push(item.incr_comment_count)
            this.lineX.onlineDate.push(tools.time_cycle('4', item.time_node))
          })

          this.lineX.interactA_A = this.lineX.interactA
          this.lineX.interactB_B = this.lineX.interactB

          //console.log("this.getData.interactList", this.lineX.onlineDate)
          this.getChart()
        } else {
          this.show.dataShow = true
        }
      },
      //点击在线流量分析具体按钮  流量
      changeLine(e) {
        if (e.length == 0) {
          this.$message.error("查询条件不能少于1个")
          this.val.lineCheck = ['1']
          this.lineX.interactA_A = this.lineX.interactA
          return false
        }
        this.lineX.interactA_A = []
        this.lineX.interactB_B = []
        e.forEach((item) => {
          if (item == 1) {
            this.lineX.interactA_A = this.lineX.interactA
          }
          if (item == 2) {
            this.lineX.interactB_B = this.lineX.interactB
          }
        })
        this.getChart()
      },
      changeLineTwo(e) {
        if (e.length == 0) {
          this.$message.error("查询条件不能少于1个")
          this.val.lineCheck = ['3']
          this.lineX.interactC_C = this.lineX.interactC
          return false
        }
        this.lineX.interactC_C = []
        this.lineX.interactD_D = []
        e.forEach((item) => {
          if (item == 3) {
            this.lineX.interactC_C = this.lineX.interactC
          }
          if (item == 4) {
            this.lineX.interactD_D = this.lineX.interactD
          }
        })
        this.getChart()
      },
      //点击切换在线流量分析
      clickOnline(index) {
        if (index == 1) {
          this.val.lineCheck = ['1', '2']
          this.lineX.interactA_A = this.lineX.interactA
          // this.lineX.interactB_B = this.lineX.interactB
          this.lineX.interactC_C = []
          this.lineX.interactD_D = []
        } else {
          this.val.lineCheck = ['3', '4']
          this.lineX.interactA_A = []
          this.lineX.interactB_B = []
          this.lineX.interactC_C = this.lineX.interactC
          this.lineX.interactD_D = this.lineX.interactD
        }
        this.show.onLineIndex = index
        this.getChart()
      },
      getChart() {
        //console.log("this.lineX.interactB_B",this.lineX.interactB_B)
        var my = this
        let myChart = this.$echarts.init(this.$refs.interact)
        myChart.setOption({
          color: ['#FFBD76', '#51d1cb'],
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          grid: {
            top: 40,
            bottom: 0,
            left: 0,
            right: 20,
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.lineX.onlineDate,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
              data: this.lineX.interactA_A,
              type: 'line',
              smooth: true,
              symbol: "none",
              name: '累计关注数',
              // symbolOffset: [100,100]
            },
            //        {
            //          data: this.lineX.interactB_B,
            //          type: 'line',
            //          smooth: true,
            // symbol:"none",
            //        },
            {
              data: this.lineX.interactC_C,
              type: 'line',
              smooth: true,
              symbol: "none",
              name: '累计点赞数',
            },
            {
              data: this.lineX.interactD_D,
              type: 'line',
              smooth: true,
              symbol: "none",
              name: '评论数增量',
            }
          ]
        })
      }
    }
  }
</script>

<style>
</style>
