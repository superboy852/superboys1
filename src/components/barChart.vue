<template>
  <div class="w-100 position-re">
    <div ref="chartId" :style="'width: ' + chartWidth.width + '; height:' + chartWidth.height"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      chartId: {
        type: String,
        default: '0'
      },
      labelShow: { //显示标注
        type: Boolean,
        default: false
      },
      legendShow: { //图示显示
        type: Boolean,
        default: false
      },
      chartData: {
        type: Object
      },
      chartWidth: {
        type: Object,
        default () {
          return {
            width: "100%",
            height: "300px"
          }
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
      setTimeout(()=>{
        this.getInit()
      },2000)
    },
    methods: {
      getInit() {
        var my = this
        var myChart = this.$echarts.init(this.$refs.chartId)
        myChart.setOption({
          color: ['#FFBD76'],
          tooltip: {
            trigger: 'axis',
			backgroundColor:'rgba(0,0,0,0.7)',
			textStyle:{
			  color:'#ffffff'
			},
			borderColor:'rgba(0,0,0,0.7)'
          },
          grid: {
            top:40,
            right: 20,
            left: 0,
            bottom:0,
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: this.chartData.dataX
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.chartData.dataY,
            type: 'bar',
            // barWidth: 20,
            sampling:'lttb'
          }]
        })


      }
    }
  }
</script>

<style>
</style>
