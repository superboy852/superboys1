<template>
  <div class="w-100 position-re">
    <div class="flex justify-between w-100">
      <div class="flex flex-direction rdx-flex-1">
        <div class="flex align-center">
          <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('1')">
            <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 1"></i>
          </span>
          <span class="rdx-p-l-8 rdx-p-r-32 button-a" @click="clickOnline('1')">流量</span>
          <el-checkbox-group v-model="val.lineCheck"
            :disabled='show.onLineIndex == 1 ? show.checkDisabled : !show.checkDisabled' @change="changeLine">
            <el-checkbox label="1">在线人数
            </el-checkbox>
            <el-checkbox label="2">进场人数
            </el-checkbox>
            <el-checkbox label="3">离场人数
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex align-center rdx-p-t-20">
          <span class="round-pie button-a flex align-center justify-center position-re" @click="clickOnline('2')">
            <i class="round-pie-2 position-ab" v-show="show.onLineIndex == 2"></i>
          </span>
          <span class="rdx-p-l-8 rdx-p-r-32 button-a" @click="clickOnline('2')">关注</span>
          <el-checkbox-group v-model="val.lineCheck"
            :disabled='show.onLineIndex == 2 ? show.checkDisabled : !show.checkDisabled' @change="changeLine">
            <el-checkbox label="4">预估销量
            </el-checkbox>
            <el-checkbox label="5">预估GMV
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="flex flex-direction rdx-flex-1">
        <div class="flex">
          <div class="flex">
            <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">累计观看人数</span>
            <span class="rdx-font-22">{{roomInfo.total_user}}</span>
          </div>
          <div class="flex rdx-p-l-60 rdx-m-l-60">
            <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">人气峰值</span>
            <span class="rdx-font-22">{{roomInfo.user_peak}}</span>
          </div>
          <div class="flex rdx-p-l-60 rdx-m-l-60">
            <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">峰值时间</span>
            <span class="rdx-font-22">{{getData.onLineInfo.rct_incr_peak_time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="position-re rdx-m-t-30" ref="lineUxNew" style="width: 100%; height: 450px; z-index: 10;"></div>
<!--    <div class="position-ab w-100 flex align-center" style="top: 90px; left: 15px;">
      <div class="flex w-100 rdx-p-r-30">
        <span class="rdx-primary rdx-p-l-5 rdx-p-r-10">上架</span>
        <div class="putaway-line rdx-flex-1 rdx-m-t-12"></div>
      </div>
    </div> -->
    <!--上架弹窗-->
      <el-dialog :title="val.putawayTitle" :visible.sync="show.putawayShow" width="400px" :before-close="closeDialog">
        <div class="flex flex-direction rdx-font-14 putaway-box" style="border-top: 1px solid #E5E5E5;">
          <div class="flex font-strong rdx-p-t-16 rdx-p-b-16">上架产品（{{getData.productPutaway.count}}）</div>
          <div class="flex w-100 justify-between rdx-p-b-20" v-for="(putawayS,index) in getData.productPutaway.products">
            <img :src="putawayS.image" style="width: 60px; height: 60px;">
            <div class="flex flex-direction rdx-p-l-10 rdx-flex-1 position-re">
              <span class="rdx-line-2">{{putawayS.title}}</span>
              <div class="flex position-ab justify-between" style="bottom: 0px; width: 280px;">
                <span class="font-strong">￥{{putawayS.price}}</span>
                <span class="putaway-link" @click="linkPutawayOne(putawayS.product_id)">查看单品分析</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--单品分析-->
        <el-dialog title="商品直播数据" :visible.sync="show.putawayOne" width="800px" style="height: 800px;" :before-close="closeDialog">
          <div class="flex flex-direction rdx-font-14">
            <div class="flex w-100 line-bottom rdx-p-b-16">
              <img src="../../../assets/imgs/1.png" class="rdx-radius-4" style="width: 80px; height: 80px;" >
              <div class="flex flex-direction rdx-p-l-10 position-re" style="height: 80px;">
                <span class="rdx-line-2">1016-F21 花西子手工雕刻精致口红</span>
                <span class="rdx-font-12 rdx-tips-color">董先生口红</span>
                <div class="flex rdx-tips-color position-ab" style="bottom: 0px;">
                  最低价 <span class="rdx-content-color">¥ 88.00</span> 最高价 <span class="rdx-content-color">¥ 88.00</span>
                </div>
              </div>
            </div>
            <div class="flex justify-around rdx-line-height-26 rdx-p-t-8 rdx-p-b-10 line-bottom">
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">1.9w</span>
                <span class="rdx-tips-color">销量</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">163.4w</span>
                <span class="rdx-tips-color">销售额</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">3</span>
                <span class="rdx-tips-color">讲解次数</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">41秒</span>
                <span class="rdx-tips-color">讲解时长</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">4.99%</span>
                <span class="rdx-tips-color">商品点击率</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-16 font-strong">23.92%</span>
                <span class="rdx-tips-color">购买转化率</span>
              </div>
            </div>
            <div class="flex align-center rdx-p-t-14 rdx-p-b-14">
              <span class="rdx-p-r-4">讲解列表</span>
              <el-tooltip class="item" :visible-arrow="show.checkDisabled" effect="dark" placement="bottom">
                <div slot="content" class="putaway-tips">全网销量：商品在抖音全平台的销量 <br>价格：商品在本直播间的售卖价格<br>列表条数：因数据量限制，列表中仅展示单场直播前500次讲解</div>
                <i class="iconfont icon-e679 button-a rdx-tips-color"></i>
              </el-tooltip>
            </div>
           <el-table :data="tableData">
             <template slot="empty">
               <no-data marginTop="0" class="rdx-p-t-30"></no-data>
             </template>
              <el-table-column align="center" label="讲解时间"></el-table-column>
              <el-table-column align="center" label="价格(元)"></el-table-column>
              <el-table-column align="center" prop="begin_time"label="全网销量(件)"></el-table-column>
            </el-table>
          </div>
        </el-dialog>

  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components: {
      noData
    },
    props: {
      roomInfo:{
        type:Object,
        default(){
          return{}
        }
      },
      livingParams: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableData:[],
        getData: {
          onLineList: [], //获取流量3条x轴数据
          focusList: [], //获取关注2条x轴数据
          productPoint: [], //上架
          productPutaway:[],//上架弹窗数据
          onLineInfo:'',//在线流量分析数据
        },
        lineX: {
          onLineA: [], //在线人数
          onLineB: [], //进场人数
          onLineC: [], //离场人数
          onLineE:[],//预估销量
          onLineF:[],//预估GMV
          onLineAA: [], //serve 在线人数
          onLineBB: [], //serve 进场人数
          onLineCC: [], //serve 离场人数
          onLineDD:[],//serve 上架
          onLineEE:[],//serve 预估销量
          onLineFf:[],//serve 预估GMV
          onlineDateOne:[],//在线人数 进场人数 离场人数 x轴
          onlineDateTwo:[],//预估销量 预估GMV x轴
          onlineDate: [], //最终赋值 x轴时间段
          putawayDate: [], //上架时间段
          putawayArr: [], //上架数值 统一用1
        },
        inforParams: "",
        option: "",
        optionNew:[],
        val: {
          lineCheck: ['1', '2', '3'] ,//流量默认值
          colorNew:['#FFBD76', '#51d1cb', '#DD001B', '#FFAE66'],//调色盘颜色
          putawayIndex:"",//上架商品下标
          putawayTitle:'',//上架商品时间
        },
        show: {
          onLineIndex: "1", //流量与关注切换
          checkDisabled: false, //是否禁用
          isEchears:true,//点击切换换走不同的线路
          putawayShow:false,//上架弹窗显示
          putawayOne:false
        },
        loading:false
      }
    },
    mounted() {
      this.inforParams = this.livingParams
      // this.findObjOperate()
      setTimeout(() => {
        this.getInit()
      }, 1000)
    },
    methods: {
      //比较
      // findObjOperate() {
      //   var arrA = ['1','2','3']
      //   var arrB = ['2']
      //   const arrNew = arrA.filter(v=>arrB.indexOf(v) != -1)
      //   console.log("112",arrNew)
      // },
      //点击流量切换
      changeLine(e) {
        this.optionNew = []
        if (this.show.onLineIndex == 1) {
          var arrA = ['1', '2', '3']
          const arrNew = arrA.filter(v => e.indexOf(v) != -1)
          arrNew.forEach((item) => {
            console.log("item",item)
            if (item == 1) {
              this.optionNew.unshift(this.lineX.onLineAA)
            }
            if (item == 2) {
              this.optionNew.unshift(this.lineX.onLineBB)
            }
            if (item == 3) {
              this.optionNew.unshift(this.lineX.onLineCC)
            }
          })
        }else{
          var arrA = ['4', '5']
          const arrNew = arrA.filter(v => e.indexOf(v) != -1)
          arrNew.forEach((item) => {
            if (item == 4) {
              this.optionNew.unshift(this.lineX.onLineEE)
            }
            if (item == 5) {
              this.optionNew.unshift(this.lineX.onLineFF)
            }
          })
        }
        this.show.isEchears = false
        this.optionNew.push(this.lineX.onLineDD)
        this.getEcharts()

      },
      //点击tab切换
      clickOnline(index) {
        this.show.onLineIndex = index
        this.optionNew = []
        this.lineX.onlineDate = []
        this.show.isEchears = false
        if (index == 1) {
          this.lineX.onlineDate = this.lineX.onlineDateOne
          this.val.lineCheck = ['1', '2', '3']
          this.optionNew.unshift(this.lineX.onLineAA,this.lineX.onLineBB,this.lineX.onLineCC,this.lineX.onLineDD)
          this.getEcharts()
        } else {
          this.lineX.onlineDate = this.lineX.onlineDateTwo
          this.val.lineCheck = ['4', '5']
          this.optionNew.unshift(this.lineX.onLineEE,this.lineX.onLineFF,this.lineX.onLineDD)
          this.getEcharts()
        }
      },
      //初始数据
      async getInit() {
        var params = {
          roomId: this.inforParams
        }
        var onLine = await this.$get('/api/live/detail/onlineTraffic', params) //获取流量3条x轴数据
        var focus = await this.$get('/api/live/detail/querySale', params) //获取关注2条x轴数据

        var putaway = await this.$get('/api/live/detail/queryProductPoint', params) //上架
        this.getData.onLineInfo = onLine.data
        this.getData.onLineList = onLine.data.chartsFlow
        this.getData.focusList = focus.data.charts
        //在线人数
        this.getData.onLineList.forEach((item) => {
          this.lineX.onLineA.push(item.user_count)
        })
        //进场人数
        this.getData.onLineList.forEach((item) => {
          this.lineX.onLineB.push(item.real_time_user)
        })
        //离场人数
        this.getData.onLineList.forEach((item) => {
          this.lineX.onLineC.push(item.leave_user)
        })
        //预估销量
        this.getData.focusList.forEach((item) => {
          this.lineX.onLineE.push(item.incr_volume)
        })
        //预估gmv
        this.getData.focusList.forEach((item) => {
          this.lineX.onLineF.push(item.incr_amount)
        })

        //在线人数 进场人数 离场人数 时间轴
        this.getData.onLineList.forEach((item) => {
          this.lineX.onlineDateOne.push(tools.time_cycle('4', item.crawl_time))
        })
        //预估销量 预估gmv 时间轴
        this.getData.focusList.forEach((item) => {
          this.lineX.onlineDateTwo.push(tools.time_cycle('4', item.crawl_time))
        })
        this.lineX.onlineDate = this.lineX.onlineDateOne
        //上架 把上架添加到时间轴中
        if(this.getData.productPoint != ''){
          this.getData.productPoint = putaway.data
          for (var i = 0; i < this.getData.onLineList.length; i++) {
            for (var j = 0; j < this.getData.productPoint.length; j++) {
              // this.getData.onLineList[i]['pay'] = this.getData.productPoint
              if (this.getData.onLineList[i].crawl_time > this.getData.productPoint[j].time_node && this.getData
                .onLineList[i - 1].crawl_time < this.getData.productPoint[j].time_node) {
                this.getData.onLineList[i]['pay'] = this.getData.productPoint[j]
              }
            }
          }
          for (var i = 0; i < this.getData.onLineList.length; i++) {
            this.lineX.putawayArr.push('')
            if (this.getData.onLineList[i].pay) {
              this.lineX.putawayArr[i] = 1
            }
          }
        }

        this.getEcharts()
      },
      //添加图表
      getEcharts(){
        var echarts = require('echarts');
        var myChart = echarts.init(this.$refs.lineUxNew)
        var my = this
        this.option;
        this.lineX.onLineAA = {
          name: '在线人数',
          type: 'line',
          symbol: "none",
          data: this.lineX.onLineA,
          itemStyle: {
            color: "#ffaa00",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 170, 0, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(255, 170, 0, 0)'
            }])
          }
        }
        this.lineX.onLineBB = {
          name: '进场人数',
          type: 'line',
          symbol: "none",
          data: this.lineX.onLineB,
          itemStyle: {
            color: "#FF7810",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 120, 16, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(255, 120, 16, 0)'
            }])
          }
        }
        this.lineX.onLineCC = {
          name: '离场人数',
          type: 'line',
          symbol: "none",
          data: this.lineX.onLineC,
          itemStyle: {
            color: "#FF3333",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 51, 51, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(255, 51, 51, 0)'
            }])
          }
        }
        this.lineX.onLineDD = {
          name: '上架',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 6,
          // data: ['1','1','1'],
          data: this.lineX.putawayArr,
          itemStyle: {
            color: "#18b566",
          }
        }
        this.lineX.onLineEE = {
          name: '预估销量',
          type: 'line',
          symbol: "none",
          data: this.lineX.onLineE,
          itemStyle: {
            color: "#7AB8FF",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(122, 184, 255, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(122, 184, 255, 0)'
            }])
          }
        }
        this.lineX.onLineFF = {
          name: '预估GMV',
          type: 'line',
          symbol: "none",
          data: this.lineX.onLineF,
          itemStyle: {
            color: "#C99AFF",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(201, 154, 255, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(201, 154, 255, 0)'
            }])
          }
        }

        this.option = {
          // color: ['#FFBD76', '#51d1cb', '#DD001B', '#18b566'],
          // color: this.val.colorNew,
          tooltip: {
            trigger: 'axis',
            backgroundColor:'rgba(0,0,0,0.7)',
            textStyle:{
              color:'#ffffff'
            }
          },
          legend: {
            show: true,
            right: 10,
            top: 0,
            icon: 'roundRect',
            itemWidth: 20,
            itemHeight: 4,
            textStyle: {
              fontSize: 12,
              color: '#999999',
            }
          },
          axisPointer: {
            link: [{
              xAxisIndex: 'all'
            }]
          },
          // dataZoom: [{
          //     show: true,
          //     realtime: true,
          //     start: 0,
          //     end: 100,
          //     xAxisIndex: [0, 1],
          //     bottom:60
          //   },
          //   {
          //     type: 'inside',
          //     realtime: true,
          //     start: 0,
          //     end: 100,
          //     xAxisIndex: [0, 1],
          //   }
          // ],
          dataZoom: [
          	{
          		type: 'slider',
          		show: true,
          		height: 10,
          		bottom: 60,

          		borderColor: 'transparent',
          		backgroundColor: '#E9E9E9',
          		// 拖拽手柄样式 svg 路径
          		handleIcon: 'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
          		handleColor: '#DD001B',
          		handleSize: 20,
          		handleStyle: {
          			borderColor: '#DD001B'
          		},
              selectedDataBackground:{ //选中部分数据阴影的样式
                lineStyle:{
                  color:'#DD001B',
                  opacity:0
                }
              },
              fillerColor:"#DD001B",//选中范围的填充颜色。
              showDetail:false,
              showDetail:true, //显示详细数值信息
              brushSelect:false,//按住鼠标左键后框选出选中部分
              xAxisIndex: [0, 1],
          		start: 0,
          		end: 100
          	}
          ],
          grid: [{
              left:0,
              right: 20,
              top: 50,
              bottom:0,
              height: '310',
              containLabel: true,
            },
            { //上架
              left:0,
              right: 20,
              bottom: 10,
              height: '30',
              containLabel: true,
            }
          ],
          xAxis: [{
              type: 'category',
              axisLine: {
                onZero: true
              },
              data: this.lineX.onlineDate
            },
            {
              show: false,
              gridIndex: 1,
              type: 'category',
              triggerEvent: true, //添加点击事件
              // axisLine: { onZero: true },
              data: this.lineX.onlineDate,
              position: 'top',
              connectNulls: true
            }
          ],
          yAxis: [{
              type: 'value',
            },
            {
              show: false,
              // name: 'Evaporation(m^3/s)',
              gridIndex: 1,
              name: '上架',
              type: 'value',
              // inverse: true
            }
          ],
          series: []
        };

        //点击x轴数据点
        myChart.on('click', (e) => {
          console.log('e', e) //获取下标进行弹窗展示
          if(e.seriesName == '上架'){

            this.show.putawayShow = true
            this.val.putawayIndex = e.dataIndex
            this.val.putawayTitle = e.name
            this.getData.productPutaway = this.getData.onLineList[e.dataIndex].pay
            console.log("112",this.getData.productPutaway)
          }

          // if (e.componentIndex == 1) {
          //   my.val.putawayIndex = e.value
          //   if (e.componentType == 'xAxis') {
          //     my.show.putawayShow = true
          //   }
          // } else {
          //   this.val.explainIndex = e.value
          //   if (e.componentType == 'xAxis') {
          //     this.show.explainShow = true
          //   }
          // }

        })
        if(this.show.isEchears){
          this.option.series.unshift(this.lineX.onLineAA, this.lineX.onLineBB, this.lineX.onLineCC,this.lineX.onLineDD)
        }else{
          this.option.series = this.optionNew
        }
        this.$nextTick(() => {
          myChart.clear()
          myChart.setOption(this.option)
        })
        console.log("this.option",this.option)

      },
      //关闭弹窗
      closeDialog() {
        this.show.putawayShow = false
        this.show.putawayOne = false
      },
      //打开单品弹窗
      linkPutawayOne(id){
        this.show.putawayShow = false
        this.show.putawayOne = true
      }

    }
  }
</script>

<style lang="scss" scoped>
  .putaway {
    width: 25px;
    height: 25px;
    background-color: $rdx-primary;
    border-radius: 10px;
  }

  .putaway-line {
    width: 100px;
    height: 1px;
    background-color: #E6E7EB;
  }
  .putaway-link{color: $rdx-primary; cursor: pointer;}
  .putaway-link:hover{color: $rdx-error;}
  .putaway-box{width: 100%; height:300px; overflow-y: auto;}
  .putaway-tips{width: 350px;}
  /deep/.el-tooltip__popper.is-dark{background: rgba(0,0,0,0.7)!important;}
  // /deep/.el-tooltip__popper,.el-tooltip__popper.is-dark{background:rgba(0,0,0,0.1) !important;}
  /deep/.el-dialog__body{padding: 0px 20px 30px 20px;}
  /deep/.el-table--small th, .el-table--small td{padding: 0px!important;line-height: 25px;height: 25px;}
  /deep/.el-table th{line-height: 25px;height: 25px;}
  /deep/.el-table--small td{padding: 0px!important;line-height: 25px;height: 25px; font-weight: bold; font-size: 14px; color: $rdx-content-color; }
</style>
