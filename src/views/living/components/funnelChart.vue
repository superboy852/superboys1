<template>
  <div class="w-100 position-re flex justify-center">
    <div class="funne-line flex justify-between position-ab w-90 rdx-line-height-24" style="top: 88px;">
      <div class="flex flex-direction" style="margin-left: -10px;">
        <span class="rdx-font-22">{{val.percentAll}}</span>
        <span class="rdx-tips-color rdx-font-14">累计观看人次</span>
      </div>
      <div class="flex flex-direction justify-end" style="margin-right: -10px;">
        <span class="rdx-font-22 rdx-warning">{{val.percentOnP}}%</span>
        <span class="rdx-tips-color rdx-font-14">观看->点击转化率</span>
      </div>
    </div>
    <div class="funne-line flex justify-between position-ab w-90 rdx-line-height-24" style="top: 194px;">
      <div class="flex flex-direction" style="margin-left: -10px;">
        <span class="rdx-font-22">{{val.percentOn}}</span>
        <span class="rdx-tips-color rdx-font-14">商品点击次数</span>
      </div>
      <div class="flex flex-direction justify-end" style="margin-right: -10px;">
        <span class="rdx-font-22 rdx-warning">{{val.percentSalesP}}%</span>
        <span class="rdx-tips-color rdx-font-14">点击->购买转换率</span>
      </div>
    </div>
    <div class="flex justify-between position-ab w-90 rdx-line-height-24" style="top: 300px;">
      <div class="flex flex-direction" style="margin-left: -10px;">
        <span class="rdx-font-22">{{val.percentSales}}</span>
        <span class="rdx-tips-color rdx-font-14">商品销量</span>
      </div>
      <div class="flex flex-direction justify-end" style="margin-right: -10px;">
        <span class="rdx-font-22 rdx-warning">{{val.percentAllP}}%</span>
        <span class="rdx-tips-color rdx-font-14">点击->整体转化率</span>
      </div>
    </div>
    <div ref="funnelChart" style="width: 100%; height: 350px; position: relative; z-index: 10;"></div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['roomId'],
    data() {
      return {
        room_id:'',
        val:{
          percentAll: 0, //累计观看人次
          percentOn: 0, //商品点击次数
          percentSales: 0, //商品销量
          percentOnP: 0, //观看-点击转化率
          percentSalesP: 0, //点击-购买转化率
          percentAllP: 0, //整体转化率
        },
        option: ''
      }
    },
    mounted() {
      this.room_id = this.roomId
      var echarts = require('echarts');
      this.myChart = echarts.init(this.$refs.funnelChart)
      this.option;
      this.percent()
    },
    methods: {
      //计算转化漏斗
      async percent() {
        console.log("112",this.room_id)
        var param = {
          "roomId": this.room_id
        }
        const {
          data
        } = await this.$get('/api/live/detail/funnel', param, true)
        // this.val.percentAll = tools.numberVerify(data.total_user) //累计观看人次
        // this.val.percentOn = tools.numberVerify(data.total_pv) //商品点击次数
        // this.val.percentSales = tools.numberVerify(data.total_volume) //商品销量
        this.val.percentAll = data.total_user //累计观看人次
        this.val.percentOn = data.total_pv //商品点击次数
        this.val.percentSales = data.total_volume //商品销量
        if (data.total_pv != 0 || data.total_volume != 0) {
          this.val.percentOnP = (data.total_pv / data.total_user * 100).toFixed(2) //观看-点击转化率
          this.val.percentSalesP = (data.total_volume / data.total_pv * 100).toFixed(2) //点击-购买转化率
          this.val.percentAllP = (data.total_volume / data.total_user * 100).toFixed(2) //整体转化率
          // if (this.val.percentOnP > 100) {
          //   this.$nextTick(() => {
          //     this.val.percentOnP = 100
          //   })
          // }
          // if (this.val.percentSalesP > 100) {
          //   this.$nextTick(() => {
          //     this.val.percentSalesP = 100
          //   })
          // }
        } else {
          this.val.percentOnP = 0
          this.val.percentSalesP = 0
          this.val.percentAllP = 0
        }
        this.getFunnel()
      },
      getFunnel() {
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          series: [{
            name: '转化漏斗',
            type: 'funnel',
            minSize: '0%',
            maxSize: '100%',
            top:30,
            bottom:0,
            label: {
              show: false,
              position: 'inside'
            },
            data: [{
                value: this.val.percentOnP,
                name: '点击转化率',
                itemStyle: {
                  color: "#FF7612",
                  borderWidth: 0
                }
              },
              {
                value: this.val.percentSalesP,
                name: '购买转化率',
                itemStyle: {
                  color: "#FFAE66",
                  borderWidth: 0
                }
              },
              {
                value: this.val.percentAllP,
                name: '整体转化率',
                itemStyle: {
                  color: "#FEE3CC",
                  borderWidth: 0
                }
              }
            ]
          }]
        }
        this.$nextTick(() => {
          this.myChart.clear()
          this.myChart.setOption(this.option)
        })

      },
    }
  }
</script>

<style lang="scss" scoped>
  .funne-line{border-bottom: 1px solid #DBDBDB;}
</style>
